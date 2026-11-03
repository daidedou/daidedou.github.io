# Presentations

Add each new deck in its own folder here, with a `.qmd` source and its assets.
The shared `_quarto.yml` discovers all `.qmd` files automatically. Customize a
deck with YAML front matter or a folder-level `_metadata.yml` (see
`Foundation_Masks/`). Keep assets inside the deck folder. Foundation Masks embeds its images, fonts,
styles and presentation runtime in a single HTML file. For other decks that
use external assets in raw HTML/CSS, declare those in `project.resources` when
Quarto cannot discover them automatically.

Render locally from the repository root:

```sh
quarto render _presentations
python -m http.server 8000 --directory _presentations/_output
```

Open <http://localhost:8000/Foundation_Masks/presentation.html>.
Use Quarto 1.4.549 to match the version pinned in the Pages workflow.

On deployment, GitHub Actions caches rendered output using a hash of all
presentation sources/assets and the workflow. An exact cache hit skips both
Quarto installation and rendering. A miss renders all decks again. GitHub may
evict unused caches; the next build then renders normally.

The workflow copies the rendered output into
`_site/files/presentations/` after Jekyll builds. The example deck is served at
`/files/presentations/Foundation_Masks/presentation.html`. Generated output and
Quarto caches are ignored by Git. Existing decks in `files/presentations/`
remain separate from this build.

The Foundation Masks deck was copied from
`~/Documents/pro/talks/Foundation_Masks/quarto/`; edit the copy here for website
updates. The original talk directory is not modified or synced automatically.

## Foundation Masks size budget

Both the source deck and rendered HTML must stay under 5 MiB. A post-render
script enforces this limit. The source uses only the displayed images, encoded
as WebP at quality 82 with a maximum dimension of 1400 pixels (320 for author
portraits). Transparency is preserved; QR codes remain lossless PNGs. Fonts
remain the original Inter files. Attribution and clustering provenance files
are retained.

The post-render script removes the unused Source Sans Pro font faces that
Quarto bundles despite the Inter theme, and removes duplicate external output
files because all presentation resources are embedded in the HTML. MathJax,
if required, and outgoing links can still use the network.

Optimization affects the website copy only. The full-resolution originals
remain in the original talk directory. Deleting assets here does not remove
previously committed versions from Git history.
