import { company } from '../data/site'

export default function Terms() {
  return (
    <>
      <section className="relative flex min-h-[36vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">Legal</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">
            Terms of Use
          </h1>
          <p className="rise rise-3 mx-auto mt-4 text-body-md text-muted">Updated June 2026</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x mx-auto max-w-2xl">
          <div className="space-y-10 text-body-md text-on-surface">

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Agreement to terms</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                By using this website, you agree to the following terms. Please read them carefully.
                If you do not agree, please discontinue use of this site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Use of site</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                This website is provided for informational purposes about {company.name} and its
                offerings. You may not use this site for any unlawful purpose or in any way that
                infringes on the rights of others, including but not limited to copyright,
                trademark, privacy, or other personal rights.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Intellectual property</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                All content on this site, including text, images, graphics, logos, and design,
                is owned by {company.legalName} or its licensors and is protected by applicable
                intellectual property laws. You may not reproduce, distribute, or create
                derivative works from any content without express written permission.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Accuracy of information</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                We strive to keep the information on this site accurate and up to date, but we
                make no guarantees about the completeness, accuracy, or currency of any content.
                Menu items, hours, pricing, and availability are subject to change without notice.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Limitation of liability</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                {company.legalName} is not liable for any direct, indirect, incidental, or
                consequential damages arising from your use of, or inability to use, this website
                or any content found on it.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Changes to these terms</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                We may update these terms at any time without prior notice. Your continued use of
                this site following any changes constitutes your acceptance of the updated terms.
                We encourage you to review this page periodically.
              </p>
            </div>

            <div>
              <h2 className="font-display text-headline-sm font-bold text-cream">Contact us</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5">
                If you have questions about these terms, please contact us by phone at{' '}
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
