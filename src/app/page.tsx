import { Header, Footer } from "@/components/site-chrome";
import { Hero } from "@/components/sections/hero";
import { Problema } from "@/components/sections/problema";
import { Solucoes } from "@/components/sections/solucoes";
import { Proposito } from "@/components/sections/proposito";
import { Contato } from "@/components/sections/contato";
import { ChatBox } from "@/components/chat-box";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problema />
        <Solucoes />
        <Proposito />
        <Contato />
      </main>
      <Footer />
      <ChatBox />
    </>
  );
}
