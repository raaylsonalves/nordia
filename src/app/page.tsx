import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";
import { NordiaMark, NORDIA_PATH_LIGHT, NORDIA_PATH_DARK } from "@/components/brand/nordia-mark";
import { Navigation } from "@/components/nordia/navigation";
import { Choreography } from "@/components/nordia/choreography";

const WHATSAPP = "https://wa.me/5585991331364";
const services = [
  { title: "Sistemas sob medida", text: "Software que acompanha a sua operação, não o contrário. Da ideia à ferramenta que sua equipe realmente precisa.", tags: "Plataformas web · Sistemas internos · Portais" },
  { title: "Integrações", text: "Conectamos as ferramentas que você já usa para a informação chegar onde precisa. Sem copiar, colar e conferir tudo de novo.", tags: "APIs · ERPs · Fluxos de dados" },
  { title: "Automações", text: "Tarefas repetitivas podem trabalhar sozinhas. Desenhamos fluxos que devolvem tempo para sua equipe cuidar do que importa.", tags: "Processos · Rotinas · Operações" },
  { title: "Experiências digitais", text: "Sites e ferramentas com clareza, personalidade e uma função bem definida: aproximar o seu negócio das pessoas.", tags: "Sites · Interfaces · Ferramentas digitais" },
];

export default function Home() {
  return (
    <>
      <Choreography />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navigation />
      <main id="conteudo">
        <section className="n-hero" aria-labelledby="hero-title" id="inicio">
          <div className="n-hero-heading">
            <h1 id="hero-title" className="n-hero-title">
              <span className="n-title-window"><span className="n-title-line n-title-first">TECNOLOGIA</span></span>
              <span className="n-title-window"><span className="n-title-line n-title-middle">
                <svg className="n-hero-mark" viewBox="-50 -30 420 474" aria-hidden="true">
                  <path data-mark-left d={NORDIA_PATH_LIGHT} fill="currentColor" />
                  <path data-mark-right d={NORDIA_PATH_DARK} fill="currentColor" />
                </svg>
                QUE MOVE
              </span></span>
              <span className="n-title-window"><span className="n-title-line n-title-last">NEGÓCIOS<span className="n-period">.</span></span></span>
            </h1>
            <p className="n-hero-aside">Conectamos ideias,<br />sistemas e pessoas.<br />Para o seu negócio<br />seguir em frente.</p>
          </div>
          <div className="n-hero-stage">
            <div className="n-hero-rail n-hero-rail-left"><span className="n-caption">Tecnologia com propósito.</span><span>Sistemas sob medida<br />Integrações & automações<br />Experiências digitais</span></div>
            <div className="n-hero-rail n-hero-rail-right"><a className="n-pill" href="#solucoes">Explore o que fazemos <ArrowDown size={16} /></a></div>
            <figure className="n-hero-visual">
              <Image src="/images/nordia-connections.webp" alt="Peças de alumínio interligadas por uma fita laranja, uma representação da conexão entre sistemas." fill sizes="(max-width: 700px) 100vw, 96vw" preload quality={90} />
              <div className="n-image-tag" aria-hidden="true"><span>Conexões que fazem avançar.</span><ArrowDownRight size={26} /></div>
            </figure>
          </div>
          <div className="n-hero-caption n-gutter"><span>Da complexidade à conexão.</span><span>NORDIA — Tecnologia com propósito</span></div>
        </section>
        <section className="n-about n-gutter" id="problema" aria-labelledby="about-title">
          <div className="n-section-kicker"><span>01 / Nossa essência</span><span>Clareza antes do código.</span></div>
          <h2 id="about-title" className="n-display n-about-title" data-enter>MENOS ATRITO.<br /><span className="n-indented">MAIS</span><br />POSSIBILIDADES<span className="n-period">.</span></h2>
          <div className="n-about-bottom">
            <NordiaMark className="n-about-mark" light="var(--n-ink)" dark="var(--n-accent)" />
            <div className="n-about-copy"><p className="n-lead">Seu negócio não precisa de mais tecnologia. Precisa da tecnologia certa.</p><div className="n-body-columns"><p>Planilhas que não terminam. Sistemas que não conversam. Tempo gasto com o que poderia ser simples. A gente começa entendendo tudo isso.</p><p>Depois, transforma essa complexidade em soluções digitais sob medida. Com menos etapas no caminho e mais espaço para o seu negócio crescer.</p></div><a className="n-text-link" href="#conversar">Vamos conversar <ArrowUpRight size={19} /></a></div>
          </div>
        </section>
        <section className="n-capabilities n-gutter" id="solucoes" aria-labelledby="services-title">
          <div className="n-section-kicker"><span>02 / O que fazemos</span><span>Feito para a sua realidade.</span></div>
          <div className="n-section-heading"><h2 id="services-title" className="n-display" data-enter>BOAS IDEIAS.<br />SOLUÇÕES REAIS.</h2><p>Do primeiro desenho à operação.<br />Construímos as conexões que<br />o seu negócio precisa.</p></div>
          <div className="n-work-pair">
            <figure className="n-work n-work-primary"><div className="n-work-image"><Image src="/images/nordia-systems.webp" alt="Módulos de metal conectados por uma estrutura laranja contínua." fill sizes="(max-width: 700px) 100vw, 60vw" quality={85} /><span className="n-work-stamp">Tudo conectado.<ArrowUpRight size={22} /></span></div><figcaption><span>Do isolado ao integrado.</span><span>Integrações & automações</span></figcaption></figure>
            <figure className="n-work n-work-secondary"><div className="n-brand-study" aria-hidden="true"><span className="n-study-label">Pensado para encaixar.</span><svg viewBox="0 0 320 414" className="n-study-mark"><path data-study-left d={NORDIA_PATH_LIGHT} fill="#f0f0f0" /><path data-study-right d={NORDIA_PATH_DARK} fill="#111111" /></svg><span className="n-study-bottom">Seu negócio.<br />Suas possibilidades.<span>↗</span></span></div><figcaption><span>Nada de fórmula pronta.</span><span>Sistemas sob medida</span></figcaption></figure>
          </div>
          <div className="n-services"><p className="n-service-intro">Cada desafio pede<br />uma solução própria.<ArrowDownRight size={36} strokeWidth={1.2} /></p><div className="n-service-list">{services.map((service, i) => <details key={service.title} className="n-service" name="services" open={i === 0}><summary><span className="n-index">0{i + 1}</span><h3>{service.title}</h3><Plus className="n-plus" size={25} strokeWidth={1.4} /></summary><div className="n-service-description"><p>{service.text}</p><span>{service.tags}</span></div></details>)}</div></div>
        </section>
        <section className="n-process n-gutter" id="processo" aria-labelledby="process-title">
          <div className="n-section-kicker"><span>03 / Como acontece</span><span>Próximos em cada etapa.</span></div>
          <div className="n-process-heading"><h2 id="process-title" className="n-display" data-enter>PRIMEIRO,<br />A GENTE ESCUTA.</h2><ArrowDownRight className="n-process-arrow" strokeWidth={1} aria-hidden="true" /></div>
          <div className="n-steps"><article><span className="n-step-number">01</span><h3>Entender.</h3><p>Uma conversa sobre o seu negócio, seus processos e o que está travando o caminho. O problema vem antes da solução.</p></article><article><span className="n-step-number">02</span><h3>Construir.</h3><p>Definimos prioridades e desenvolvemos juntos. Você acompanha as entregas, testa e participa das decisões.</p></article><article><span className="n-step-number">03</span><h3>Evoluir.</h3><p>Colocamos a solução em prática e acompanhamos o uso real. Ajustamos o que for preciso para a tecnologia fazer sentido.</p></article></div>
        </section>
        <section className="n-contact n-gutter" id="conversar" aria-labelledby="contact-title">
          <div className="n-section-kicker"><span>04 / O próximo passo</span><span>Uma boa conversa muda tudo.</span></div>
          <h2 id="contact-title" className="n-contact-title">VAMOS<br /><a href={WHATSAPP} target="_blank" rel="noopener noreferrer">CONVERSAR<ArrowUpRight aria-hidden="true" /></a></h2>
          <div className="n-contact-bottom"><p>Conte o que pode funcionar melhor.<br />A gente pensa no próximo passo com você.</p><a className="n-pill n-pill-dark" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRight size={18} /><span className="sr-only"> pelo WhatsApp, abre em nova aba</span></a></div>
        </section>
      </main>
      <footer className="n-footer n-gutter">
        <div className="n-footer-top"><a className="n-footer-mail" href="mailto:nordia@nordiatech.com.br">nordia@nordiatech.com.br<ArrowUpRight size={20} /></a><a className="n-text-link" href="https://www.instagram.com/nordia.solucoes/" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={16} /></a><a className="n-back-top" href="#inicio">Voltar ao topo <ArrowUpRight size={16} /></a></div>
        <div className="n-footer-wordmark" aria-label="NORDIA"><NordiaMark className="n-footer-mark" light="var(--n-ink)" dark="var(--n-accent)" /><span aria-hidden="true">NORDIA</span></div>
        <div className="n-footer-bottom"><span>Fortaleza, Brasil. Conectada a novas possibilidades.</span><span>© {new Date().getFullYear()} NORDIA</span></div>
      </footer>
    </>
  );
}
