from pathlib import Path
from html import escape
import json,re,datetime

profile='https://www.doctoralia.com.br/denise-villani-de-carvalho/cardiologista-medico-clinico-geral/belo-horizonte'
reviews=json.loads(Path('testimonials.json').read_text(encoding='utf-8'))
cards=[]
for review in reviews:
    date=datetime.date.fromisoformat(review['date'])
    months=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']
    label=f'{date.day} de {months[date.month-1]} de {date.year}'
    cards.append(f'''<article class="patient-review">
      <header class="review-header">
        <span class="review-avatar" aria-hidden="true">{escape(review['name'][0])}</span>
        <strong class="review-name">{escape(review['name'])}</strong>
        <span class="review-verified">Consulta verificada <span aria-hidden="true">●<span class="review-check">✓</span></span></span>
        <span class="review-stars" role="img" aria-label="5 de 5 estrelas">★★★★★</span>
      </header>
      <p class="review-text">{escape(review['text'])}</p>
      <footer class="review-meta"><time datetime="{date.isoformat()}">{label}</time> · Consultório particular · Primeira consulta Cardiologia · <a href="{profile}#profile-reviews" target="_blank" rel="noopener noreferrer">Ver na Doctoralia</a></footer>
    </article>''')
markup='<div id="depoimentos" class="patient-reviews" aria-label="Depoimentos de pacientes">'+''.join(cards)+'</div>'
p=Path('dist/index.html'); html=p.read_text(encoding='utf-8')
start=html.find('<div class="elementor-element elementor-element-63c6946 ')
if start<0: start=html.index('<div id="depoimentos"')
end=html.index('<div class="elementor-element elementor-element-6746725 ',start)
html=html[:start]+markup+'\n'+html[end:]
html=html.replace('Áreas de <span style="color: #FFFCF5;background: #1F282E">atenção</span> no atendimento','Depoimentos de <span style="color: #FFFCF5;background: #1F282E">pacientes</span> da Dra. Denise')
p.write_text(html,encoding='utf-8')
print(f'{len(reviews)} depoimentos renderizados.')
