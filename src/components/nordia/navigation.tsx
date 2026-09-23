"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { ArrowUpRight, Minus, Plus, X } from "lucide-react";
import { NordiaMark } from "@/components/brand/nordia-mark";

const links = [["#problema", "A Nordia"], ["#solucoes", "O que fazemos"], ["#processo", "Como acontece"], ["#conversar", "Vamos conversar"]] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  function toggleMotion() {
    const next = !reduced;
    setReduced(next);
    document.documentElement.dataset.quiet = String(next);
    window.dispatchEvent(new Event("nordia:motion"));
  }

  return (
    <header className="n-header n-gutter">
      <a className="n-logo" href="#inicio" aria-label="NORDIA — início"><NordiaMark light="var(--n-ink)" dark="var(--n-accent)" /><span>NORDIA</span></a>
      <nav aria-label="Navegação principal" className="n-desktop-nav">{links.slice(0, 3).map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild><button className="n-menu-button" aria-label="Abrir menu"><span /><span /></button></Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="n-menu-backdrop" />
          <Dialog.Content className="n-menu-panel" aria-describedby="menu-description">
            <div className="n-menu-top"><Dialog.Title>NORDIA</Dialog.Title><Dialog.Close className="n-menu-close" aria-label="Fechar menu"><X size={25} /></Dialog.Close></div>
            <Dialog.Description id="menu-description" className="sr-only">Navegação e preferências de movimento.</Dialog.Description>
            <nav aria-label="Menu completo">{links.map(([href, label], i) => <a key={href} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight /></a>)}</nav>
            <div className="n-menu-bottom"><a href="mailto:nordia@nordiatech.com.br">nordia@nordiatech.com.br</a><button type="button" className="n-motion-toggle" onClick={toggleMotion} aria-pressed={reduced}>{reduced ? <Plus size={16} /> : <Minus size={16} />}{reduced ? "Movimento reduzido" : "Reduzir animações"}</button></div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
