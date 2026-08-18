/**
 * Where a chat message goes when the visitor sends it.
 *
 * The UI never talks to WhatsApp directly — it calls `send()` on whatever
 * transport is configured here. Swapping in a real chat automation (a webhook,
 * an agent endpoint, a widget SDK) means adding a transport below and changing
 * `activeTransport`; the ChatBox component does not change.
 */

export const WHATSAPP_NUMBER = "5585991331364";

export interface ChatTransport {
  id: string;
  /** Shown under the composer so the visitor knows where the message goes. */
  notice: string;
  /**
   * Returns true when the message was handed off. `openedExternally` tells the
   * UI whether the conversation continues somewhere else (a new tab) or inside
   * the widget, which changes what it says afterwards.
   */
  send(message: string): Promise<{ ok: boolean; openedExternally: boolean }>;
}

/**
 * Current transport: hands the conversation to WhatsApp with the message
 * pre-filled. Nothing is stored and no request is made from the page.
 */
export const whatsappTransport: ChatTransport = {
  id: "whatsapp",
  notice: "Sua mensagem abre no WhatsApp — nada é enviado por aqui.",
  async send(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    // noopener: without it the opened tab gets a handle on window.opener.
    window.open(url, "_blank", "noopener,noreferrer");
    return { ok: true, openedExternally: true };
  },
};

export const activeTransport: ChatTransport = whatsappTransport;
