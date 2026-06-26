import { company } from '../data/site'

export default function Accessibility() {
  return (
    <>
      <section className="relative flex min-h-[36vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">Legal</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">
            Accessibility Statement
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
                This site is built to WCAG 2.1 AA, the standard referenced by the ADA for web
                accessibility. We review and update our accessibility practices on an ongoing basis.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">What we have done</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                We have taken the following steps to make this site accessible to as many people as
                possible:
              </p>
              <ul className="mt-5 space-y-3 list-disc list-outside pl-5">
                <li>
                  Skip links are provided so keyboard and screen reader users can bypass navigation
                  and get straight to the main content.
                </li>
                <li>
                  A visible outline appears on every interactive element when navigated by keyboard,
                  so focus is always clear.
                </li>
                <li>
                  Text colors meet the 4.5:1 minimum contrast ratio for readability by people with
                  low vision.
                </li>
                <li>
                  All form fields, buttons, and interactive elements have descriptive labels for
                  screen readers.
                </li>
                <li>
                  Animations automatically reduce for users who have the Reduce Motion preference
                  enabled on their device.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Report an issue</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                If you encounter any accessibility barrier on this site, please contact us and we
                will address it promptly. You can reach us by phone at{' '}
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
