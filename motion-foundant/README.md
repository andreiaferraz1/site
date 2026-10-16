# Foundant — três estudos de motion

Abra `index.html` para reproduzir, pausar, ajustar a velocidade e percorrer os três loops. Mantenha `assets.js` e `motion.js` junto ao HTML. Não depende de rede.

## Entregas

- `01-conexao.mp4`: fotografia do evento; expansão da barra e deslocamento dos três círculos.
- `02-orbita.mp4`: fotografia panorâmica; abertura circular, expansão horizontal e órbitas.
- `03-elasticidade.mp4`: retrato; máscaras em barras com entradas escalonadas.

MP4 H.264, 1440 × 900, aproximadamente 8 segundos, 30 fps alvo, sem áudio. Fonte editável em `motion.js`. Verde-lima, preto e creme; símbolo vetorial reconstruído a partir da imagem da logo fornecida. O nome da marca está composto em Arial, não é um wordmark oficial fornecido. As duas frases em inglês são propostas de texto para os estudos.

## Fotografias e cor

A panorâmica fornecida é a referência de luz quente. Ela e o retrato foram mantidos como fornecidos. A foto do evento recebeu uma versão generativa mais quente e luminosa com a ferramenta integrada ImageGen. Essa versão apresenta diferenças em detalhes, especialmente crachás, e não deve ser tratada como uma correção pixel a pixel. Os arquivos originais do usuário não foram sobrescritos.

Prompt usado (modo integrado):

> Edit target: image 1, the photograph of people networking at an event. Image 2 is COLOR AND LIGHTING REFERENCE ONLY, the panoramic office portrait. Return only image 1 with subtle photographic color and exposure correction to match image 2: warm creamy highlights, natural warm skin tones, gently olive greens, open shadows, balanced contrast, reduce blue/cyan cast. Keep every person, face, expression, clothing, badge, object, framing and background exactly as in image 1. Preserve realistic texture and original 640:428 composition. Do not add graphics, logos or text. This is strictly a color grade, not a new scene.

## Referências indicadas

- [Dogoto — Brand & Product Explainer Video](https://dribbble.com/shots/27795296-Dogoto-Brand-Product-Explainer-Video): a descrição consultada relaciona animação de identidade, tipografia cinética e produto.
- [AI Loader Exploration](https://dribbble.com/shots/4967879-AI-Loader-Exploration-GIF): a descrição consultada apresenta uma exploração de formas em movimento.
- [Shapes Motion](https://dribbble.com/shots/3201600-Shapes-Motion): o link não ficou acessível pela ferramenta de consulta. O terceiro estudo é uma exploração própria de barras e círculos.

## Verificação

Prévia revisada visualmente nos três estudos. Reprodução e pausa verificadas, sem erros de JavaScript. Layout a 390 px sem overflow. Os três MP4 foram carregados no navegador e tiveram formato, dimensões e duração verificados; resultados em `validation.json`.
