# NORDIA

Site institucional e material de marca da NORDIA.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** — tokens em `src/app/globals.css`
- **Motion** (Framer Motion v12) para animação
- **shadcn/ui** configurado (`components.json`), com o registry do **Kokonut UI** habilitado
- **HyperFrames** (Apache 2.0) para vídeo — projeto em `brand-video/`

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Marca

A logo é o "N" bipartido: uma metade clara, uma escura, sobre laranja. Essa
divisão é a linguagem visual do site — use-a para contrastar "antes/depois",
"manual/automatizado". Não decore em volta dela.

| Token   | Valor     | Onde                        |
| ------- | --------- | --------------------------- |
| flame   | `#f74b01` | primária, amostrada da logo |
| ink     | `#121110` | metade escura do "N"        |
| paper   | `#f5f4f3` | metade clara do "N"         |

> O laranja antigo era `#ff6600`. O novo é visivelmente mais vermelho — não
> misture os dois.

Assets em `public/brand/`. A geometria do SVG foi extraída de
`references/logo_new_nordia.jpeg` por ajuste de retas por mínimos quadrados e
verificada rasterizando de volta contra a fonte (0,19% de divergência de pixel,
toda em antialiasing de borda). **Não ajuste as coordenadas no olho** — se
precisar mexer, refaça a extração.

As duas metades são paths separados de propósito: são elas que animam
(`src/components/brand/nordia-mark.tsx`).

### Contraste

Em superfície laranja, a metade escura do "N" é que carrega o contraste — passar
`flame` nas duas metades some com uma delas. Ver `NordiaLockup`.

## Kokonut UI

```bash
npx shadcn@latest add https://kokonutui.com/r/<nome>.json
```

Vão para `src/components/kokonutui/`. Licença MIT, modelo copy-paste-and-own —
**os arquivos são nossos depois de instalados**. Rodar `add` de novo sobrescreve
as adaptações; cada arquivo tem no topo a lista do que foi mudado.

Em uso:

O registry usa **namespace** (`@kokonutui/...`), gravado em `components.json`.
A forma por URL (`https://kokonutui.com/r/<nome>.json`) só enxerga parte do
catálogo — `morphic-navbar` e `flow-field`, por exemplo, não aparecem lá.

| Componente | Onde | Adaptações |
| --- | --- | --- |
| `card-flip` | Soluções | paleta da marca; face clara com a marca em marca-d'água (o bloom do upstream só lê em fundo escuro); removido o `max-w-[280px]` que quebrava o grid; flip também por toque e teclado; CTA virou prop |
| `attract-button` | CTA do hero | partículas flame no lugar de violeta; ícone de seta no lugar do ímã; rótulo via `children`; removida a prop morta `attractRadius` |
| `type-writer` | Hero | tornado composável — vinha com layout próprio (`py-24`, `max-w-4xl`, centralizado, `font-mono`) |
| `morphic-navbar` | Header | itens vindos das âncoras da página |
| `flow-field` | Fundo das Soluções | tema `ember`; correção do matiz (ver abaixo); movimento reduzido em vez de congelamento |
| `card-stack` | Contato | reescrito: dados por prop, ícone no lugar de `image`, wrapper `div` (um `<a>` dentro de `<button>` é HTML inválido), fan com folga em vez de sobreposição, empilhamento vertical abaixo de 900px |

### Armadilhas encontradas

- **`particle-button` não compila.** Importa `ButtonProps` do `@/components/ui/button`,
  que o shadcn atual (new-york, React 19) não exporta mais. Foi removido.
- **`@keyframes` tem que ficar no nível raiz do `globals.css`.** Dentro de
  `@layer utilities` o Tailwind v4 simplesmente não emite a regra, e
  `animate-[nome_...]` resolve para `animation-name: none` sem nenhum erro.
- **O brilho do `card-flip` só existe em fundo escuro.** É `box-shadow` laranja;
  sobre card claro fica invisível e o card parece vazio. Daí a frente ser ink.
- **`setParticles` dentro de `useEffect` é intencional** no `attract-button` —
  as posições vêm de `Math.random()` e calcular no render quebraria a hidratação.
  A regra do lint está desativada naquela linha, com o motivo.
- **O `flow-field` sai da faixa do tema.** O upstream faz
  `(p.hue + angle/(2π) * 70) % 360`, mas `angle` é soma de senos e chega a ~3π —
  desloca o matiz em mais de 100° e o tema `ember` renderiza **verde**. O drift
  agora é envelopado dentro de `[hueStart, hueStart + hueRange]`.
- **`absolute` sem `inset` ancora na borda esquerda, não no centro.** Era por
  isso que o fan do `card-stack` colapsava sobre si mesmo e cortava os textos.
  Os cards agora usam `left: 50%` + `margin-left: -width/2`.
- **Função não atravessa a fronteira server/client.** Passar o componente de
  ícone de um Server Component para o `card-stack` quebra o build com
  *"Functions cannot be passed directly to Client Components"*. Por isso
  `contato.tsx` é `"use client"`.
- **Nenhum componente do Kokonut trata `prefers-reduced-motion`.** O `flow-field`
  roda um loop de canvas infinito sobre centenas de partículas. Aqui ele avança
  1 frame em 6 sob essa preferência — desacelera sem congelar.

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

Não use `useReducedMotion()` para trocar o `initial` de um componente animado:
o hook resolve para `null` no servidor e para a preferência real no cliente, o
que faz servidor e cliente renderizarem estilos inline diferentes e quebra a
hidratação. Reduced motion está resolvido por CSS em `globals.css`, via o
atributo `data-motion`.

## `legacy/`

O site anterior (single-file, 4.4k linhas, posicionamento anti-fraude +
ClickObserve). Guardado por referência de conteúdo; não está em build.
