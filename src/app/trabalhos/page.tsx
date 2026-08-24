import type { Metadata } from "next";
import { WorkCards } from "@/components/sections/work-cards";

export const metadata: Metadata = {
  title: "Trabalhos",
  description:
    "Projetos da NORDIA no ar: ClickObserve, proteção de tráfego pago, e Selecting Motors, concessionária premium em Fortaleza.",
};

export default function Trabalhos() {
  return (
    <section className="relative h-full">
      <WorkCards />
    </section>
  );
}
