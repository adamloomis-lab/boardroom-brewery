// Customer FAQs — rendered as a visible accordion (components/Faq.tsx) AND emitted
// as FAQPage JSON-LD (lib/seo.ts) so AI assistants and search engines can quote
// them directly. Answers are grounded in the real taproom facts.
export interface Faq {
  readonly q: string
  readonly a: string
}

export const faqs: readonly Faq[] = [
  {
    q: 'What are Boardroom Brewery’s hours?',
    a: 'We are open Tuesday 4PM to 8PM, Wednesday and Thursday 4PM to 9PM, Friday 3PM to 10PM, Saturday 12PM to 10PM, and Sunday 12PM to 8PM. We are closed Mondays.',
  },
  {
    q: 'Do you brew your own beer?',
    a: 'Yes. Our beer is 100% brewed on-site at 211 Arena Street, alongside our hard seltzers and natural-style wines.',
  },
  {
    q: 'Is Boardroom Brewery 21 and over?',
    a: 'Yes. You must be 21 or older to visit the taproom.',
  },
  {
    q: 'Is there food at the taproom?',
    a: 'We host rotating food trucks, so there is always something fresh to pair with your pour.',
  },
  {
    q: 'Can I host a private event at Boardroom?',
    a: 'Yes. Boardroom is a modern brewery and event space near LAX, great for corporate events and team offsites, birthdays, and celebrations. Reach out through our Private Events page to plan yours.',
  },
  {
    q: 'What is the Boardroom Run Club?',
    a: 'Our Run Club meets Wednesdays at 6PM for a roughly 5-kilometer run from Boardroom down to the jetty on The Strand and back. Runners and walkers of all paces are welcome.',
  },
  {
    q: 'Where is Boardroom Brewery located?',
    a: '211 Arena Street, El Segundo, CA 90245, just minutes from LAX in the South Bay.',
  },
]
