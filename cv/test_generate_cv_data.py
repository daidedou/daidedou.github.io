"""Tests for the Jekyll-to-LaTeX CV generator."""

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from generate_cv_data import GenerationError, escape_latex, generate


PUBLICATION = """\
---
title: "{title}"
date: {date}
author:
  - name: "Test & Author"
{extra}---
Publication body.
"""

COURSE = """\
---
title: "Course"
date: 2024-01-01
venue: "University"
type: "Master course"
period: "January 2024 - March 2024"
---
See [course page](https://example.org/course?a=1&b=2).
"""

TALK = """\
---
title: "Talk & Title"
date: 2025-09-09
venue: "INPT, Rabat"
event: "Summer School"
type: "Lecture"
location: "Rabat, Morocco"
---
This abstract should stay out of the CV.
"""


class GeneratorTests(unittest.TestCase):
    def make_repository(self, temporary_directory: str) -> Path:
        root = Path(temporary_directory)
        (root / "_publications").mkdir()
        (root / "_talks").mkdir()
        (root / "_teaching").mkdir()
        (root / "_talks" / "talk.md").write_text(TALK, encoding="utf-8")
        (root / "_teaching" / "course.md").write_text(COURSE, encoding="utf-8")
        (root / "_config.yml").write_text(
            'url: "https://example.org"\nbaseurl: ""\n', encoding="utf-8"
        )
        return root

    def test_generates_sorted_selected_entries_and_escaped_text(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            root = self.make_repository(temporary_directory)
            (root / "_publications" / "older.md").write_text(
                PUBLICATION.format(
                    title="Older #1", date="2023-01-01", extra="venue: \"R&D\"\n"
                ),
                encoding="utf-8",
            )
            (root / "_publications" / "newer.md").write_text(
                PUBLICATION.format(
                    title="Newer_100%",
                    date="2025-01-01",
                    extra=(
                        "venue: 'Conference - <strong>Spotlight</strong> - Oral'\n"
                        "paperurl: local/paper.pdf\n"
                    ),
                ),
                encoding="utf-8",
            )
            (root / "_publications" / "excluded.md").write_text(
                PUBLICATION.format(
                    title="Excluded",
                    date="2026-01-01",
                    extra="selected: false\nvenue: Hidden\n",
                ),
                encoding="utf-8",
            )
            output = root / "output.tex"

            generate(root, output)
            generated = output.read_text(encoding="utf-8")

            self.assertLess(generated.index(r"Newer\_100\%"), generated.index(r"Older \#1"))
            self.assertNotIn("Excluded", generated)
            self.assertIn(r"{Test \& Author}", generated)
            self.assertIn(r"{R\&D}", generated)
            self.assertIn(r"\textit{Conference} · Spotlight · Oral", generated)
            self.assertIn(
                r"\paper{\detokenize{https://example.org/files/local/paper.pdf}}",
                generated,
            )
            self.assertIn(
                r"\href{\detokenize{https://example.org/course?a=1&b=2}}{course page}",
                generated,
            )
            self.assertIn(r"\CVPublication{Newer\_100\%}", generated)
            self.assertIn(
                r"\CVTalk{Summer School}{INPT, Rabat}{Sep 2025}{Talk \& Title}",
                generated,
            )
            self.assertNotIn("This abstract should stay out", generated)
            self.assertIn(
                r"\CVEntry{University}{}{Course}{January 2024 - March 2024}",
                generated,
            )
            self.assertIn(
                "\\Needspace{6\\baselineskip}\n"
                "\\CVSection{Invited Talks \\& Lectures}",
                generated,
            )
            self.assertIn(
                "\\Needspace{6\\baselineskip}\n"
                "\\CVSection{Teaching \\& Supervision}",
                generated,
            )
            self.assertNotIn(r"\cvpublication", generated)
            self.assertNotIn(r"\cvcourse", generated)

    def test_rejects_invalid_yaml(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            root = self.make_repository(temporary_directory)
            (root / "_publications" / "invalid.md").write_text(
                "---\ntitle: [broken\n---\n", encoding="utf-8"
            )
            with self.assertRaisesRegex(GenerationError, "Invalid YAML"):
                generate(root, root / "output.tex")

    def test_rejects_missing_required_data(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            root = self.make_repository(temporary_directory)
            (root / "_publications" / "missing.md").write_text(
                "---\ntitle: Missing authors\ndate: 2025-01-01\n---\n",
                encoding="utf-8",
            )
            with self.assertRaisesRegex(GenerationError, "author"):
                generate(root, root / "output.tex")

    def test_escapes_all_required_latex_characters_in_one_pass(self) -> None:
        source = "\\&%$#_{}~^"
        expected = (
            r"\textbackslash{}\&\%\$\#\_\{\}"
            r"\textasciitilde{}\textasciicircum{}"
        )
        self.assertEqual(escape_latex(source), expected)


if __name__ == "__main__":
    unittest.main()
