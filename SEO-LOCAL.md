# SEO local — Denise Villani

Implementado em 19/10/2026: título e descrição locais, canonical para a URL de produção, Open Graph, H1 único, schema Physician/Person/MedicalWebPage, endereço visível, mapa, perguntas frequentes, robots.txt e sitemap.xml.

Os dados profissionais foram conferidos no perfil da Doctoralia. O telefone público é intermediado pela plataforma: não foi declarado como telefone direto no schema. Não foram inventados horários, coordenadas, preços, prêmios ou avaliações estruturadas. As descrições dos serviços são editoriais; revisão pela médica é recomendada antes de expandir conteúdo clínico.

## Próximas ações que dependem das contas da médica

- Confirmar/gerenciar o Perfil da Empresa no Google, com nome real, categoria pertinente, endereço e telefone direto consistentes; incluir o site e horários reais.
- Verificar o domínio no Google Search Console e enviar `/sitemap.xml`. A solicitação de indexação depende dessa conta.
- Solicitar avaliações autênticas de pacientes e manter fotos e informações do consultório atualizadas.
- Preferir um domínio próprio estável. Ao mudar, atualizar canonical, sitemap, robots.txt, Open Graph e IDs do JSON-LD, e redirecionar a URL antiga.
- Medir consultas, impressões e cliques de buscas locais no Search Console e contatos recebidos. Não há dados de ranking ou desempenho anteriores neste projeto.

O Google informa que os resultados locais consideram relevância, distância e destaque; ajustes no site não garantem posições.

Referências: https://support.google.com/business/answer/7091?hl=pt-BR e https://developers.google.com/search/docs/appearance/structured-data/local-business

## Verificar

`python verify_site.py` e `python verify_seo.py`. JSON-LD foi conferido localmente; ainda deve ser avaliado no teste de resultados avançados do Google e no Search Console após indexação.
