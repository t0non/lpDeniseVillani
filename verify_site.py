from pathlib import Path
from html.parser import HTMLParser
import re

root=Path('dist')
class Check(HTMLParser):
    def __init__(self): super().__init__(); self.text=[]; self.resources=[]; self.links=[]; self.skip=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('script','style'): self.skip+=1
        if tag=='a': self.links.append(a.get('href',''))
        if tag in ('img','script','link'):
            value=a.get('src',a.get('href',''))
            if value.startswith('/'): self.resources.append(value)
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.skip=max(0,self.skip-1)
    def handle_data(self,value):
        if not self.skip: self.text.append(value)
c=Check(); c.feed((root/'index.html').read_text(encoding='utf-8'))
text=' '.join(c.text)
for value in ['João','Brioschi','56867','38668','Coração Blindado','domiciliar','Ecocardiograma','Holter','Polissonografia']:
    assert value not in text, value
assert not any('whatsapp' in link or 'drjoao' in link for link in c.links)
assert not [p for p in c.resources if not (root/p.lstrip('/')).exists()]
for value in ['DENISE VILLANI','18203','47487','47671','Eduardo Porto','2441-0631','Teleconsulta']:
    assert value in text,value
print('OK: identidade, credenciais, serviços, contatos, links e recursos locais.')
