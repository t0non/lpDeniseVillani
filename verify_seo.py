from pathlib import Path
from html.parser import HTMLParser
import json, re, xml.etree.ElementTree as ET
html=Path('dist/index.html').read_text(encoding='utf-8')
assert len(re.findall(r'<h1\b',html))==1
assert 'Cardiologista em <span' in html
assert len(re.findall(r'rel="canonical"',html))==1
assert 'content="index,follow,max-image-preview:large"' in html
data=json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',html,re.S).group(1))
assert data['@context']=='https://schema.org'
physician=next(e for e in data['@graph'] if e['@type']=='Physician')
assert physician['address']['addressLocality']=='Belo Horizonte'
assert 'aggregateRating' not in physician
assert all('drjoao' not in json.dumps(e) for e in data['@graph'])
ET.parse('dist/sitemap.xml')
assert 'https://lpdenisevillani.vercel.app/sitemap.xml' in Path('dist/robots.txt').read_text()
print('OK: H1 único, canonical, indexação, dados estruturados e sitemap.')
