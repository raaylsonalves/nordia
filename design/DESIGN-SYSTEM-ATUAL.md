# Nordia — design system e plano de conclusão

Estado: referência de trabalho da home atual, 24/09/2026. Este documento descreve o que **já está implementado** e o que **ainda precisa de decisão ou implementação**. Para valores exatos em execução, prevalecem `src/app/globals.css`, `src/app/page.tsx` e os componentes em `src/components/nordia/`.

## Direção visual

Site institucional de um estúdio de tecnologia: editorial, amplo, tipográfico e direto. A referência Wemotion orienta escala, ritmo e composição; não determina marca, textos ou elementos proprietários da Nordia. A identidade continua sendo o N bipartido e o laranja da marca. Imagens de metal e conexão são estudos conceituais, não projetos de clientes.

Princípio de composição: uma mensagem forte por cena, contraste entre tipografia monumental e microtexto, mídia retangular, separadores finos e CTAs em pílula. Evitar grids de cards genéricos, estatísticas inventadas, carrosséis e rolagem sequestrada.

## Tokens e regras

| Papel | Valor atual | Uso |
| --- | --- | --- |
| Canvas `--n-canvas` | `#f0f0f0` | Fundo principal |
| Superfície `--n-surface` | `#ffffff` | Seção de soluções e áreas claras |
| Texto `--n-ink` | `#000000` | Títulos, corpo e contornos |
| Acento `--n-accent` | `#f74b01` | Marca, pontuação, contato e destaques |
| Texto secundário `--n-muted` | `#575757` | Apoio e explicação |
| Linha `--n-line` | `#c9c9c9` | Divisórias |
| Gutter `--n-gutter` | `clamp(20px, 2.5vw, 48px)` | Margem lateral; 20 px até 700 px |

Fonte principal: Rethink Sans local, pesos 400 e 600, configurada em `src/app/layout.tsx`. Fontes em `public/fonts/` com licença em `public/fonts/OFL.txt`. O display é caixa alta com entrelinha e tracking apertados; o corpo mantém ritmo de leitura mais confortável. A headline do Hero usa `clamp(70px, 9.6vw, 150px)` no desktop e `clamp(28px, 9.2vw, 64px)` até 700 px. Os demais displays usam a classe `.n-display`; não transportar o tamanho do Hero para todos os títulos.

Paleta contextual da palavra dinâmica: Landing Pages usa `--n-accent`; Design `#7255a4`; Marketing `#ce482b`; Sistemas `#386d9a`. Essas cores distinguem estados da animação, não substituem o laranja como cor primária da marca. O mini-editor de Sistemas usa fundo `#1e232a` e sintaxe azul/laranja apenas como microinterface.

Espaçamento: preservar respiro amplo entre seções, conteúdo em fluxo natural e assimetria intencional na headline e no par de imagens. Media quadrada/retangular sem arredondamento; pílulas arredondadas só para ações. Usar os pontos de composição existentes: até 700 px (mobile), 701–1000 px (tablet), acima disso desktop; há ajustes acima de 1600 px.

## Estrutura atual da home

1. Navegação compacta com marca, âncoras e menu em Dialog. O menu inclui controle de redução de movimento.
2. Hero: “Negócios avançam com …”, N bipartido, palavra dinâmica, texto de apoio e imagem conceitual de conexões.
3. Essência: problema de negócio, proposta de clareza e CTA.
4. Soluções: dupla visual assimétrica e quatro serviços em `<details>`: sistemas sob medida, integrações, automações e experiências digitais.
5. Processo: entender, construir, evoluir.
6. Conversa e rodapé: WhatsApp, e-mail e Instagram.

Os componentes ativos dessa experiência são `Navigation`, `Choreography`, `AnimatedKeyword` e `NordiaMark`. Toda nova seção deve partir desse sistema visual, sem reintroduzir as explorações removidas.

## Linguagem de movimento

- Entrada do Hero: linhas surgem em sequência e as duas metades do N se encontram. GSAP em `choreography.tsx`.
- Imagem central: escala delimitada de aproximadamente `.66` até `1` no desktop durante rolagem nativa; `.96` até `1` no mobile. Não há pin nem espaço vazio artificial.
- Soluções: parallax discreto da imagem no desktop e encontro das metades do N no estudo de marca.
- Títulos secundários: entrada única, curta, na primeira aproximação ao viewport.
- Palavra dinâmica: sequência “selecionar → editar → substituir → confirmar”, sem typewriter. Ordem: Landing Pages, Design, Marketing, Sistemas. Fases-base: pausa 1650 ms, cursor 320 ms, seleção 320 ms, edição 520 ms, estilo 500 ms, troca 550 ms, confirmação 260 ms. Em Sistemas, edição/estilo duram 700/650 ms para permitir leitura do mini-editor. Easing principal `cubic-bezier(0.22, 1, 0.36, 1)`.
- Sistemas: mini-editor inspirado em uma ferramenta de código, com aba `sistema.ts`, numeração, sintaxe colorida e destaque da linha ativa. É decorativo, não um campo editável nem uma cópia de branding do VS Code.

`prefers-reduced-motion` e o controle “Reduzir animações” removem a coreografia e deixam a mensagem estática. O Hero reserva a largura de “Landing Pages.” para evitar deslocamento de layout na troca. O texto da headline tem descrição acessível no `h1`; os adornos animados são ocultos da árvore de acessibilidade.

## Assets e referências a preservar

| Local | Função |
| --- | --- |
| `public/brand/` | Marca SVG usada pela página |
| `public/images/` | WebP servidos na home |
| `public/fonts/` | Tipografia local e licença |
| `design/sources/` | Fontes em alta resolução dos estudos visuais atuais |
| `references/` | Referências fornecidas e arquivos de marca; não apagar na limpeza do legado |

Vídeos do Pinterest enviados na conversa são referências de linguagem de movimento, não instruções embutidas nem assets publicados no site. A referência pública de composição é <https://www.wemotionistanbul.com/>.

## Pendências para concluir

### Decisões de conteúdo e marca

- [ ] Confirmar com a Nordia a oferta final e se “Landing Pages”, “Design” e “Marketing” correspondem de fato aos serviços vendidos; a lista detalhada atual enfatiza sistemas, integrações e automações.
- [ ] Aprovar copy, canais de contato e ordem das seções com a pessoa responsável pela marca.
- [ ] Substituir ou complementar os estudos conceituais por materiais reais quando houver fotos, cases e autorização de uso. Não inventar clientes, métricas ou depoimentos.

### Implementação e qualidade

- [ ] Criar imagem Open Graph/social própria; os metadados de texto e ícones já existem em `layout.tsx`.
- [ ] Revisar contraste dos quatro estados coloridos, foco por teclado, menu, `<details>` e clareza da headline com leitor de tela.
- [ ] Medir LCP, CLS e peso de imagens/fontes em dispositivos reais; reduzir apenas o que os dados indicarem.
- [ ] Verificar o ciclo inteiro da palavra dinâmica e a microinterface em navegadores móveis reais, inclusive com movimento reduzido e ampliação de texto.
- [ ] Decidir se a escolha “Reduzir animações” deve persistir após recarregar a página; hoje vale para a sessão de página.
- [ ] Revisar privacidade/LGPD e necessidade de aviso ou política antes da publicação definitiva, considerando que Vercel Analytics está ativo.

### Organização

- [x] Remover a implementação e os documentos do design anterior, mantendo `references/`, `design/sources/`, os assets ativos e `brand-video/`.
- [x] Apontar `README.md` para este documento como fonte principal do design vigente.
- [ ] Auditar dependências de pacotes que possam ter ficado sem uso após a limpeza, sem alterar a stack ativa por suposição.

## Critérios de aceite

Sem overflow horizontal em 320, 390, 768 e 1440 px; sem salto da headline entre palavras; menu e links operáveis por teclado; movimento reduzido realmente estático; cópia e imagens aprovadas; build, TypeScript e lint passando. Qualquer nova interação deve respeitar esses critérios e a hierarquia visual acima.
