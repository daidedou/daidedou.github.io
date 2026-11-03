# Presentations

Add each new deck in its own folder here, with a `.qmd` source and its assets.
The shared `_quarto.yml` discovers all `.qmd` files automatically. Customize a
deck with YAML front matter or a folder-level `_metadata.yml` (see
`Foundation_Masks/`). Keep assets inside the deck folder; `images/` and `fonts/`
are copied explicitly, including assets referenced in raw HTML and CSS. Add
other asset folders to `project.resources` when needed.

Render locally from the repository root:

```sh
quarto render _presentations
python -m http.server 8000 --directory _presentations/_output
```

Open <http://localhost:8000/Foundation_Masks/presentation.html>.
Use Quarto 1.4.549 to match the version pinned in the Pages workflow.

On deployment, GitHub Actions renders these sources and copies the output into
`_site/files/presentations/` after Jekyll builds. The example deck is served at
`/files/presentations/Foundation_Masks/presentation.html`. Generated output and
Quarto caches are ignored by Git. Existing decks in `files/presentations/`
remain separate from this build.

The Foundation Masks deck was copied from
`~/Documents/pro/talks/Foundation_Masks/quarto/`; edit the copy here for website
updates. The original talk directory is not modified or synced automatically.
