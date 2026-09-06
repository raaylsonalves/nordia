import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display face, matched to the Instagram post in references/.
 * The reference is a raster image, so this is a visual match rather than a
 * confirmed identification — the giveaways were the double-storey "a" (which
 * rules out Poppins/Futura), the tall x-height and the heavy negative tracking.
 * Swapping families later is a one-line change here plus --font-display below.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/**
 * Utility face: the micro-labels, numbering and data readouts. A monospace is
 * what makes an index of small numbers read as an index rather than as small
 * body text.
 */
const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE = "https://nordiatech.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "NORDIA — Tecnologia com propósito",
    template: "%s · NORDIA",
  },
  description:
    "Seu negócio não precisa de mais tecnologia. Precisa da tecnologia certa. Desenvolvemos sistemas, integrações, automações e ferramentas digitais sob medida para as necessidades reais de cada negócio.",
  keywords: [
    "desenvolvimento de software sob medida",
    "automação de processos",
    "integração de sistemas",
    "ferramentas digitais",
    "NORDIA",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE,
    siteName: "NORDIA",
    title: "NORDIA — Tecnologia com propósito",
    description:
      "Processos manuais, informações espalhadas e sistemas que não conversam custam tempo e dinheiro. A gente resolve isso sob medida.",
  },
  icons: {
    icon: "/brand/nordia-avatar.svg",
    apple: "/brand/nordia-avatar.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f74b01",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // As variáveis das fontes ficam no <html>, não no <body>: --font-sans e
    // companhia são declaradas em :root e apontam para var(--font-inter). Se
    // --font-inter só existisse no <body>, a substituição aconteceria em :root,
    // onde ela não existe, e as três famílias cairiam caladas na sans do
    // sistema — o site inteiro.
    <html
      lang="pt-BR"
      className={`${inter.variable} ${montserrat.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
