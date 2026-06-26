import { company } from '../data/site'

export default function Privacy() {
  return (
    <>
      <section className="relative flex min-h-[36vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">Legal</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">
            Privacy Policy
          </h1>
          <p className="rise rise-3 mx-auto mt-4 text-body-md text-muted">Updated June 2026</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x mx-auto max-w-2xl">
          <div className="space-y-10 text-body-md text-on-surface">

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Our commitment</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                {company.name} takes your privacy seriously. This policy explains what information
                we collect when you use our website and how we use it.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Information we collect</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">We may collect the following types of information:</p>
              <ul className="mt-5 space-y-3 list-disc list-outside pl-5">
                <li>
                  Contact form submissions, including your name, email address, phone number, and
                  message.
                </li>
                <li>
                  No payment data is stored on this site. Any transactions are handled by
                  secure third-party payment processors.
                </li>
                <li>
                  Basic anonymous usage data via our hosting provider's analytics (page views,
                  traffic sources). This data cannot be used to identify you personally.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">How we use it</h2>
              <span className="gold-rule mt-4" />
              <ul className="mt-5 space-y-3 list-disc list-outside pl-5">
                <li>To respond to your inquiries submitted through our contact form.</li>
                <li>To improve the performance and content of this website.</li>
                <li>
                  We do not sell or share your personal information with third parties for
                  marketing purposes.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Cookies</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                This site may use essential cookies required for basic functionality (such as
                remembering your preferences during a session). We do not use advertising or
                tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Third-party links</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                This site may contain links to external websites we do not operate or control.
                We are not responsible for the privacy practices of those sites and encourage
                you to review their privacy policies directly.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Contact us</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                If you have questions about this privacy policy, please contact us by phone at{' '}
                <a href={company.phoneHref} className="text-gold hover:underline">
                  {company.phone}
                </a>{' '}
                or by visiting our{' '}
                <a href="/contact" className="text-gold hover:underline">
                  contact page
                </a>
                .
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
