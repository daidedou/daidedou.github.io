"""Keep the Foundation Masks download below 5 MiB, including its runtime."""
from pathlib import Path
import re
import shutil
from urllib.parse import unquote, quote

root = Path(__file__).resolve().parents[1]
deck = root / '_output' / 'Foundation_Masks'
html = deck / 'presentation.html'
text = html.read_text()

# Quarto bundles Source Sans Pro despite this deck using local Inter exclusively.
# Drop only those unused font faces from the embedded theme stylesheet.
def trim_theme(match):
    css = unquote(match.group(1))
    css = re.sub(r'@font-face\s*\{[^}]*font-family:\s*[\'"]?Source Sans Pro[\'"]?;[^}]*\}', '', css)
    return 'data:text/css,' + quote(css, safe='')

text = re.sub(r'data:text/css,([^"\s]+)', trim_theme, text)
html.write_text(text)
# embed-resources includes the deck's images, fonts, scripts and styles in HTML.
# Do not ship duplicate external resources or leftovers from older renders.
for path in deck.iterdir():
    if path != html:
        if path.is_dir():
            shutil.rmtree(path)
        else:
            path.unlink()

limit = 5 * 1024 * 1024
for label, size in [('rendered deck', html.stat().st_size),
                    ('source deck', sum(p.stat().st_size for p in (root / 'Foundation_Masks').rglob('*') if p.is_file()))]:
    print(f'{label}: {size / 1024**2:.2f} MiB')
    if size > limit:
        raise SystemExit(f'{label} exceeds the 5 MiB limit')
