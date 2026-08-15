import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Naam is verplicht"),
  email: z.string().trim().email("Vul een geldig e-mailadres in"),
  subject: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

// Gebruikersinvoer belandt in een HTML-mail, dus escapen we het.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const shell = (inner: string) => `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
    ${inner}
    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
    <p style="font-size: 12px; color: #999;">Highball Club — wachtlijst</p>
  </div>
`;

export const sendWaitlistEmail = createServerFn({ method: "POST" })
  .inputValidator(waitlistSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL;
    
    console.log("🖥️ SERVER: Environment variables check:");
    console.log("🖥️ API Key present?", !!apiKey, apiKey ? `(${apiKey.substring(0, 10)}...)` : "MISSING");
    console.log("🖥️ FROM Email:", fromEmail);
    console.log("🖥️ TO Email:", toEmail);
    
    if (!apiKey) {
      throw new Error("RESEND_API_KEY ontbreekt — zet deze in .env.local en herstart de dev server.");
    }

    // Dynamische import: houdt de Resend SDK volledig uit de client bundle.
    const { Resend } = await import("resend");
    console.log("🖥️ SERVER: Resend imported successfully");
    
    const resend = new Resend(apiKey);
    console.log("🖥️ SERVER: Resend client created");

    const from = fromEmail || "onboarding@resend.dev";
    const notifyTo = toEmail || "hello@highballclub.nl";

    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const subject = escapeHtml(data.subject || "Wachtlijst");
    const message = data.message ? escapeHtml(data.message) : "";

    // 1. Bevestiging naar de inschrijver.
    console.log("🖥️ SERVER: Sending confirmation email to:", data.email);
    console.log("🖥️ SERVER: From:", from);
    
    let confirmation;
    try {
      confirmation = await resend.emails.send({
        from,
        to: data.email,
        subject: "Je staat op de wachtlijst — Highball Club",
        html: shell(`
          <h2 style="margin: 0 0 12px;">Welkom bij de club, ${name}.</h2>
          <p>Je staat op de wachtlijst. Zodra de eerste batch klaar is, hoor je het als eerste van ons.</p>
          ${message ? `<p style="color: #666;">Je bericht aan ons:</p><p style="white-space: pre-wrap; color: #666;">${message}</p>` : ""}
        `),
      });
      console.log("🖥️ SERVER: Confirmation response:", confirmation);
    } catch (err) {
      console.error("❌ SERVER: Confirmation send error:", err);
      throw err;
    }

    if (confirmation.error) {
      console.error("❌ Resend (bevestiging):", confirmation.error);
      throw new Error(`Resend error: ${JSON.stringify(confirmation.error)}`);
    }

    // 2. Interne notificatie. Faalt dit, dan blijft de inschrijving geldig.
    console.log("🖥️ SERVER: Sending notification email to:", notifyTo);
    
    try {
      const notification = await resend.emails.send({
        from,
        to: notifyTo,
        replyTo: data.email,
        subject: `[Wachtlijst] ${data.subject || "Nieuwe inschrijving"} — ${data.name}`,
        html: shell(`
          <h2 style="margin: 0 0 12px;">Nieuwe wachtlijst inschrijving</h2>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Onderwerp:</strong> ${subject}</p>
          ${message ? `<p><strong>Bericht:</strong></p><p style="white-space: pre-wrap; color: #666;">${message}</p>` : ""}
        `),
      });

      if (notification.error) {
        console.error("❌ Resend (notificatie):", notification.error);
      } else {
        console.log("✅ SERVER: Notification sent successfully");
      }
    } catch (err) {
      console.error("❌ SERVER: Notification send error (non-blocking):", err);
      // Faalt, maar is niet kritisch
    }

    console.log("✅ SERVER: Email process completed successfully");
    return { success: true as const, id: confirmation.data?.id };
  });