import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

const rethink = localFont({
  src: [
    { path: "../../public/fonts/rethink-sans-regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/rethink-sans-semibold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-rethink",
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
    <html lang="pt-BR" className={rethink.variable}>
      <body>
        <noscript><style>{`.n-hero-visual { transform: none; } .n-hero-rail { display: none; }`}</style></noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
