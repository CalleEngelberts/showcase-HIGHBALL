import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      {
        title: "Privacy Policy — HIGHBALL CLUB",
      },
      {
        name: "description",
        content: "Privacy policy and data handling information for HIGHBALL CLUB.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <article className="space-y-8 text-muted-foreground">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm">Last updated: 16 August 2026</p>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <p>
              HIGHBALL CLUB respects your privacy and is committed to protecting your personal
              data. This Privacy Policy explains what information we collect when you use our
              website, why we collect it, and how we handle it.
            </p>
            <p>
              HIGHBALL CLUB is operated by{" "}
              <span className="text-foreground font-medium">HIGHBALL CLUB</span>,
              based in <span className="text-foreground font-medium">ENSCHEDE, THE NETHERLANDS</span>.
            </p>
            <p>
              For questions about this Privacy Policy or your personal data, contact us at{" "}
              <a
                href="mailto:[EMAIL ADDRESS]"
                className="text-amber-500 hover:text-amber-400 underline"
              >
                highballclub@drink.com
              </a>
              .
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">1. Information we collect</h2>
            <p>Depending on how you use our website, we may collect the following information:</p>

            <div className="space-y-6 pl-4">
              {/* Waitlist */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Waitlist</h3>
                <p>If you sign up for the HIGHBALL CLUB waitlist, we may collect:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Your name, if requested</li>
                  <li>Your email address</li>
                  <li>The date and time of your registration</li>
                </ul>
                <p>
                  We use this information to manage the waitlist and keep you informed about
                  HIGHBALL CLUB, including product launches, availability and relevant updates.
                </p>
              </div>

              {/* Contact Form */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Contact form</h3>
                <p>When you contact us through the website, we may collect:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>The content of your message</li>
                </ul>
                <p>
                  We use this information only to respond to your enquiry and communicate with you
                  where necessary.
                </p>
              </div>

              {/* Analytics */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Website usage and analytics</h3>
                <p>If you give permission for analytics cookies, we may collect information about how you use our website, such as:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Pages you visit</li>
                  <li>Time spent on the website</li>
                  <li>Device and browser information</li>
                  <li>General geographic information</li>
                  <li>Referring website or source</li>
                  <li>Interaction with website elements</li>
                  <li>IP address and/or online identifiers where applicable</li>
                </ul>
                <p>
                  We may use Google Analytics to understand how visitors use our website and to help
                  us improve its performance and user experience.
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Analytics cookies will only be used where the required consent has been provided.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">2. Why we use your information</h2>
            <p>We process personal data for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>To manage the HIGHBALL CLUB waitlist</li>
              <li>To send updates you have requested</li>
              <li>To respond to questions or messages</li>
              <li>To understand and improve our website</li>
              <li>To keep our website secure and functioning correctly</li>
              <li>To comply with applicable legal obligations</li>
            </ul>
            <p>
              Depending on the processing activity, we rely on your consent, our legitimate
              interests, steps necessary to respond to a request from you, or a legal obligation.
            </p>
            <p className="font-semibold text-foreground">You can withdraw your consent at any time.</p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">3. Cookies</h2>
            <p>Our website may use cookies and similar technologies.</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Essential cookies</h3>
                <p>
                  These cookies are necessary for basic website functionality, security or remembering
                  preferences such as your cookie choice.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Analytics cookies</h3>
                <p>
                  With your permission, we may use analytics cookies to understand how visitors interact
                  with the website.
                </p>
                <p>
                  If we use Google Analytics or another analytics service, these cookies will only be
                  activated where consent is required and you have chosen to accept them.
                </p>
              </div>

              <p>
                You can change or withdraw your cookie preferences at any time through the cookie settings
                available on our website. For more information, please see our Cookie Policy or cookie
                settings.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">4. Sharing your information</h2>
            <p className="font-semibold text-foreground">We do not sell your personal data.</p>
            <p>
              We may share limited personal information with trusted service providers that help us operate
              our website, process waitlist registrations, analyse website usage or send communications.
            </p>
            <p>These providers may include services such as:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Website hosting providers</li>
              <li>Email or waitlist providers</li>
              <li>Analytics providers such as Google</li>
              <li>Technical service providers</li>
            </ul>
            <p>We only provide them with information that is necessary to perform their services.</p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">5. International data transfers</h2>
            <p>
              Some of our service providers may process data outside the European Economic Area (EEA).
            </p>
            <p>
              Where this happens, we take appropriate measures to protect your personal data in accordance
              with applicable data protection law, such as relying on recognised adequacy decisions or
              approved contractual safeguards.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">6. How long we keep your data</h2>
            <p>
              We only keep personal data for as long as reasonably necessary for the purpose for which it
              was collected.
            </p>
            <p>As a general guideline:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Waitlist data: until you unsubscribe or ask us to remove your information</li>
              <li>
                Contact enquiries: normally no longer than 12 months after the enquiry has been resolved,
                unless there is a reason to retain them longer
              </li>
              <li>Analytics data: according to the retention settings of the analytics service being used</li>
              <li>Cookie preferences: for as long as reasonably necessary to remember your choice</li>
            </ul>
            <p>We may retain certain information for longer where required by law.</p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">7. Your privacy rights</h2>
            <p>Under applicable data protection law, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Restrict how your personal data is processed</li>
              <li>Object to certain processing activities</li>
              <li>Withdraw your consent</li>
              <li>Request transfer of your personal data where applicable</li>
              <li>Submit a complaint to a data protection authority</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:[EMAIL ADDRESS]"
                className="text-amber-500 hover:text-amber-400 underline"
              >
                [EMAIL ADDRESS]
              </a>
              .
            </p>
            <p>
              If you are located in the Netherlands, you also have the right to submit a complaint to the
              <span className="font-semibold"> Autoriteit Persoonsgegevens</span>, the Dutch Data Protection
              Authority.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">8. Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your personal information
              against unauthorised access, loss, alteration or misuse.
            </p>
            <p>However, no method of transmitting or storing information online can guarantee absolute security.</p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">9. Age restriction</h2>
            <p>
              HIGHBALL CLUB relates to alcoholic beverages and our website is intended for visitors aged 18 or
              older.
            </p>
            <p>
              The age verification on our website is used to restrict access to age-appropriate content. We do not
              intentionally use it to collect unnecessary personal information.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">10. Third-party websites</h2>
            <p>Our website may contain links to third-party websites or services.</p>
            <p>
              We are not responsible for the privacy practices of those third parties. We recommend reviewing
              their privacy policies before providing personal information to them.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">11. Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy when our website, services or legal requirements change.
            </p>
            <p>
              The most recent version will always be available on this page, together with the date it was last
              updated.
            </p>
          </section>

          {/* Section 12 - Contact */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">12. Contact</h2>
            <p>If you have questions about this Privacy Policy or how your personal data is handled, you can contact us at:</p>
            <div className="bg-slate-900/40 border border-slate-700 rounded-lg p-6 space-y-2 text-foreground">
              <p className="font-semibold">HIGHBALL CLUB</p>
              <p>Operated by: HIGHBALL CLUB</p>
              <p>Location: ENSCHEDE, THE NETHERLANDS</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:highballclub@drink.com"
                  className="text-amber-500 hover:text-amber-400 underline"
                >
                  highballclub@drink.com
                </a>
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
