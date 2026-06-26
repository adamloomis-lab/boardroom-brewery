import SectionHeading from './SectionHeading'
import { faqs } from '../data/faq'

export default function Faq() {
  return (
    <section className="container-x py-section-gap">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently Asked Questions"
          className="mb-12 max-w-2xl"
        />
        <div className="border-t border-outline-variant">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-outline-variant py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <span className="font-display text-headline-sm text-cream">{f.q}</span>
                <span className="font-display text-2xl leading-none text-gold transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 font-body text-body-lg text-on-surface-variant">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
