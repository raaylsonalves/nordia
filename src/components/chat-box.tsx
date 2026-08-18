"use client";

import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { activeTransport } from "@/lib/chat-transport";
import { NordiaMark } from "@/components/brand/nordia-mark";
import { cn } from "@/lib/utils";

const ATALHOS = [
  "Quero automatizar um processo manual",
  "Meus sistemas não conversam entre si",
  "Preciso de um sistema sob medida",
];

export function ChatBox() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Reset lives in the handler, not an effect: the state change is caused by
  // the interaction, so there is nothing to synchronise after render.
  const toggle = () => {
    setOpen((v) => {
      if (!v) setSent(false);
      return !v;
    });
  };

  // Escape closes the panel — expected of any dialog-like overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = async (text: string) => {
    const body = text.trim();
    if (!body) return;
    const result = await activeTransport.send(body);
    if (result.ok) {
      setSent(true);
      setMessage("");
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Fale com a NORDIA"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed z-[60] flex flex-col overflow-hidden rounded-2xl",
              "border border-[var(--border)] bg-[var(--surface)] shadow-2xl",
              // full width on phones, a panel on desktop
              "inset-x-4 bottom-24 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[380px]",
            )}
          >
            <div className="flex items-center gap-3 bg-ink-900 px-5 py-4 text-paper">
              <NordiaMark
                className="h-6 w-auto shrink-0"
                light="var(--color-paper)"
                dark="var(--color-flame-500)"
              />
              <span className="flex-1">
                <span className="block font-display text-sm font-semibold">
                  Fale com a NORDIA
                </span>
                <span className="block text-xs text-ink-300">
                  Respondemos em horário comercial
                </span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar conversa"
                className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 p-5">
              {sent ? (
                <p className="rounded-xl bg-flame-50 px-4 py-3 text-sm text-ink-800">
                  Abrimos o WhatsApp com a sua mensagem. Se não abriu, verifique
                  o bloqueador de pop-ups do navegador.
                </p>
              ) : (
                <>
                  <p className="text-sm text-[var(--muted)]">
                    Conte o que poderia funcionar melhor na sua operação.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {ATALHOS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => submit(a)}
                        className="rounded-full border border-[var(--border)] px-3 py-1.5 text-left text-xs transition-colors hover:border-flame-500/60 hover:text-flame-600"
                      >
                        {a}
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit(message);
                    }}
                    className="flex items-end gap-2"
                  >
                    <textarea
                      ref={inputRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          submit(message);
                        }
                      }}
                      rows={2}
                      placeholder="Escreva sua mensagem…"
                      aria-label="Sua mensagem"
                      className="min-h-[44px] flex-1 resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-flame-500"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      aria-label="Enviar mensagem"
                      className="rounded-xl bg-flame-500 p-3 text-white transition-opacity hover:bg-flame-600 disabled:opacity-40"
                    >
                      <Send className="size-4" />
                    </button>
                  </form>

                  <p className="text-xs text-[var(--muted)]">
                    {activeTransport.notice}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Fechar conversa" : "Abrir conversa"}
        className={cn(
          "fixed right-6 bottom-6 z-[60] flex items-center gap-2.5 rounded-full",
          "bg-flame-500 px-5 py-4 text-white shadow-xl",
          "transition-transform hover:-translate-y-0.5 hover:bg-flame-600",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-500 focus-visible:ring-offset-2",
        )}
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <>
            <MessageCircle className="size-5" />
            <span className="hidden text-sm font-medium sm:inline">
              Vamos conversar
            </span>
          </>
        )}
      </button>
    </>
  );
}
