#!/usr/bin/env python3
"""Generate LaTeX CV sections from the Jekyll academic collections."""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:
    sys.exit(
        "Error: PyYAML is required. Install the dependencies from "
        "cv/requirements.txt."
    )


REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = Path(__file__).resolve().parent / "generated" / "academic.tex"
FRONT_MATTER_PATTERN = re.compile(
    r"\A---[ \t]*\r?\n(.*?)\r?\n---[ \t]*(?:\r?\n|\Z)(.*)\Z",
    re.DOTALL,
)
MARKDOWN_LINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^()\s]+)\)")
LATEX_ESCAPES = {
    "\\": r"\textbackslash{}",
    "&": r"\&",
    "%": r"\%",
    "$": r"\$",
    "#": r"\#",
    "_": r"\_",
    "{": r"\{",
    "}": r"\}",
    "~": r"\textasciitilde{}",
    "^": r"\textasciicircum{}",
}


class GenerationError(RuntimeError):
    """An error that should be reported without a Python traceback."""


@dataclass(frozen=True)
class JekyllDocument:
    path: Path
    data: dict[str, Any]
    body: str


def escape_latex(value: Any) -> str:
    """Escape LaTeX text in one pass to avoid escaping replacements again."""
    return "".join(LATEX_ESCAPES.get(character, character) for character in str(value))


def latex_url(value: Any) -> str:
    """Return a URL as a TeX token-safe value for use by CV macros."""
    url = str(value or "").strip()
    if not url:
        return ""
    if any(character in url for character in "{}\\\r\n"):
        raise GenerationError(f"URL contains an unsupported character: {url!r}")
    return rf"\detokenize{{{url}}}"


def markdown_to_latex(value: str) -> str:
    """Convert simple Markdown links and escape all remaining text."""
    parts: list[str] = []
    cursor = 0
    for match in MARKDOWN_LINK_PATTERN.finditer(value):
        parts.append(escape_latex(value[cursor : match.start()]))
        label, url = match.groups()
        parts.append(rf"\href{{{latex_url(url)}}}{{{escape_latex(label)}}}")
        cursor = match.end()
    parts.append(escape_latex(value[cursor:]))
    return "".join(parts).replace("\r\n", "\n").replace("\n", " ").strip()


def read_document(path: Path) -> JekyllDocument:
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as error:
        raise GenerationError(f"Cannot read {path}: {error}") from error

    match = FRONT_MATTER_PATTERN.match(text)
    if not match:
        raise GenerationError(f"Missing or invalid YAML front matter in {path}")

    try:
        data = yaml.safe_load(match.group(1))
    except yaml.YAMLError as error:
        raise GenerationError(f"Invalid YAML in {path}: {error}") from error

    if not isinstance(data, dict):
        raise GenerationError(f"YAML front matter in {path} must be a mapping")

    selected = data.get("selected", True)
    if not isinstance(selected, bool):
        raise GenerationError(f"'selected' must be true or false in {path}")

    return JekyllDocument(path=path, data=data, body=match.group(2).strip())


def required_text(document: JekyllDocument, field: str) -> str:
    value = document.data.get(field)
    if not isinstance(value, str) or not value.strip():
        raise GenerationError(f"Missing or invalid '{field}' in {document.path}")
    return value.strip()


def document_date(document: JekyllDocument) -> date:
    value = document.data.get("date")
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    if isinstance(value, str):
        try:
            return date.fromisoformat(value.strip())
        except ValueError as error:
            raise GenerationError(
                f"Invalid ISO date in {document.path}: {value!r}"
            ) from error
    raise GenerationError(f"Missing or invalid 'date' in {document.path}")


def publication_authors(document: JekyllDocument) -> str:
    authors = document.data.get("author")
    if not isinstance(authors, list) or not authors:
        raise GenerationError(f"Missing or invalid 'author' list in {document.path}")

    names: list[str] = []
    for author in authors:
        if not isinstance(author, dict):
            raise GenerationError(f"Invalid author entry in {document.path}")
        name = author.get("name")
        if not isinstance(name, str) or not name.strip():
            raise GenerationError(f"Author without a name in {document.path}")
        names.append(name.strip())
    return ", ".join(names)


def publication_latex(document: JekyllDocument) -> str:
    title = required_text(document, "title")
    publication_date = document_date(document)
    authors = publication_authors(document)
    venue = document.data.get("venue")
    if not isinstance(venue, str) or not venue.strip():
        category = document.data.get("category", "")
        venue = str(category).strip().title()

    details: list[str] = []
    if venue:
        details.append(rf"\textit{{{escape_latex(venue)}}}")
    details.append(str(publication_date.year))

    paper_url = latex_url(document.data.get("paperurl"))
    code_url = latex_url(document.data.get("code"))
    website_url = latex_url(document.data.get("website"))
    if paper_url:
        details.append(rf"\paper{{{paper_url}}}")
    if code_url:
        details.append(rf"\code{{{code_url}}}")
    if website_url:
        details.append(rf"\site{{project page}}{{{website_url}}}")

    return (
        "\\CVPublication"
        f"{{{escape_latex(title)}}}"
        f"{{{escape_latex(authors)}}}"
        f"{{{' · '.join(details)}}}"
    )


def course_latex(document: JekyllDocument) -> str:
    title = required_text(document, "title")
    institution = required_text(document, "venue")
    role = required_text(document, "type")
    course_date = document_date(document)
    location = document.data.get("location", "")
    if location is not None and not isinstance(location, str):
        raise GenerationError(f"Invalid 'location' in {document.path}")

    entry = (
        "\\CVEntry"
        f"{{{escape_latex(institution)}}}"
        f"{{{escape_latex(location or '')}}}"
        f"{{{escape_latex(title)}}}"
        f"{{{course_date.year}}}"
    )
    detail = (
        "\\CVDetail"
        f"{{{escape_latex(role)}}}"
        f"{{{markdown_to_latex(document.body)}}}"
    )
    return f"{entry}\n{detail}"


def selected_documents(directory: Path) -> list[JekyllDocument]:
    if not directory.is_dir():
        raise GenerationError(f"Required collection directory does not exist: {directory}")
    documents = [read_document(path) for path in sorted(directory.glob("*.md"))]
    return [document for document in documents if document.data.get("selected", True)]


def generate(repository_root: Path = REPOSITORY_ROOT, output_path: Path = OUTPUT_PATH) -> None:
    publications = selected_documents(repository_root / "_publications")
    courses = selected_documents(repository_root / "_teaching")

    publications.sort(
        key=lambda document: (document_date(document), document.path.name), reverse=True
    )
    courses.sort(
        key=lambda document: (document_date(document), document.path.name), reverse=True
    )

    sections = ["% Fichier généré automatiquement — ne pas modifier."]
    if publications:
        sections.append(
            r"\CVSection{Publications}"
            + "\n\n"
            + "\n\n".join(
                publication_latex(document) for document in publications
            )
        )
    if courses:
        sections.append(
            r"\Needspace{6\baselineskip}"
            + "\n"
            + r"\CVSection{Teaching \& Supervision}"
            + "\n\n"
            + "\n\n".join(course_latex(document) for document in courses)
        )

    content = "\n\n".join(sections).rstrip() + "\n"
    try:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(content, encoding="utf-8")
    except OSError as error:
        raise GenerationError(f"Cannot write {output_path}: {error}") from error


def main() -> int:
    try:
        generate()
    except GenerationError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1
    print(f"Generated {OUTPUT_PATH.relative_to(REPOSITORY_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
