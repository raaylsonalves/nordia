# NORDIA

Site institucional e material de marca da NORDIA.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** e CSS próprio — tokens em `src/app/globals.css`
- **GSAP** para a coreografia de entrada e rolagem; **Motion** para a palavra dinâmica do Hero
- **Radix Dialog** para o menu acessível
- **HyperFrames** (Apache 2.0) para vídeo — projeto em `brand-video/`

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Marca

A logo é o "N" bipartido. A página atual usa as duas metades na abertura e o
laranja como acento sobre um canvas cinza claro. A fonte principal do design
vigente, dos tokens, movimentos e pendências é
[`design/DESIGN-SYSTEM-ATUAL.md`](design/DESIGN-SYSTEM-ATUAL.md).

| Token   | Valor     | Onde                        |
| ------- | --------- | --------------------------- |
| flame   | `#f74b01` | primária, amostrada da logo |
| ink     | `#000000` | títulos e textos           |
| paper   | `#f0f0f0` | canvas principal           |

Não misture o acento atual com o antigo `#ff6600`.

Assets em `public/brand/`. A geometria do SVG foi extraída de
`references/logo_new_nordia.jpeg` por ajuste de retas por mínimos quadrados e
verificada rasterizando de volta contra a fonte (0,19% de divergência de pixel,
toda em antialiasing de borda). **Não ajuste as coordenadas no olho** — se
precisar mexer, refaça a extração.

As duas metades são paths separados de propósito: são elas que animam
(`src/components/brand/nordia-mark.tsx`).

Em superfície laranja, a metade escura do N mantém o contraste. Não altere a
geometria dos paths sem conferir a referência em `references/logo_new_nordia.jpeg`.

## Página atual

- `src/app/page.tsx`: composição e conteúdo da home.
- `src/app/globals.css`: tokens, tipografia, layout, responsividade e detalhes visuais.
- `src/components/nordia/`: navegação, coreografia e palavra animada.
- `src/components/brand/nordia-mark.tsx`: marca bipartida.
- `public/images/` e `design/sources/`: imagens publicadas e fontes dos estudos.
- `references/`: referências fornecidas; preservar ao limpar arquivos antigos.

## Vídeo de marca

```bash
cd brand-video
npm run check     # lint + runtime + layout + motion + contraste
npm run dev       # preview no Studio
npm run render    # MP4 — exige FFmpeg no PATH
```

`brand-video/index.html` é a abertura de 9s: as duas metades do "N" se encaixam,
seguidas do manifesto e da assinatura. Saída atual: `nordia-abertura.mp4`
(1920×1080, H.264, 270 frames a 30fps).

FFmpeg é requisito só do `render` — `check` e `snapshot` rodam sem ele.
Instalado via `winget install Gyan.FFmpeg`; o winget **não** cria atalho em
`WinGet\Links`, então o PATH aponta direto para a pasta versionada do pacote
(`...\Gyan.FFmpeg_...\ffmpeg-9.0-full_build\bin`). Ao atualizar o FFmpeg o
número da versão muda e essa entrada do PATH quebra — é preciso reapontá-la.

## Motion e hidratação

A coreografia atual respeita `prefers-reduced-motion` no GSAP e no CSS. O menu
também oferece “Reduzir animações”; o controle desfaz as timelines e mostra a
imagem final sem exigir rolagem animada. A página não depende de Lenis.
