"""Check local resources, section navigation and media configuration before deploy."""
from html.parser import HTMLParser
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.refs = []
        self.sections = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'section' and 'id' in attrs:
            self.sections.append(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.refs.append(attrs[key])

page = Page()
page.feed((ROOT / 'index.html').read_text(encoding='utf-8'))
assert len(page.ids) == len(set(page.ids)), 'Duplicate IDs'
assert page.sections == ['arquitectura','metodologia','modelos','gobiernos','audiencias','evidencia','impacto','contacto']
for ref in page.refs:
    if ref.startswith('#'):
        assert ref[1:] in page.ids, f'Broken anchor: {ref}'
    elif not ref.startswith(('https:', 'mailto:', 'http:', 'data:')):
        assert (ROOT / ref).is_file(), f'Missing resource: {ref}'
media = json.loads((ROOT / 'media.json').read_text(encoding='utf-8'))
assert isinstance(media['testimonials'], list) and len(media['testimonials']) <= 4
assert not any(term in (ROOT / 'styles.css').read_text(encoding='utf-8').lower() for term in ('bebas', 'condensed'))
print(f'OK: {len(page.sections)} ordered sections, {len(page.ids)} unique IDs, local assets and anchors valid; media configuration valid.')
