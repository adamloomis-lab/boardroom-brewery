import type { ReactNode } from 'react'

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  className = '',
}: {
  readonly eyebrow?: string
  readonly title: ReactNode
  readonly intro?: ReactNode
  readonly align?: 'center' | 'left'
  readonly className?: string
}) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-4 font-display text-headline-lg text-cream md:text-[46px]">{title}</h2>
      <span className={`gold-rule mt-5 ${centered ? 'mx-auto block w-16' : ''}`} />
      {intro && <p className="mt-5 text-body-lg text-on-surface-variant">{intro}</p>}
    </div>
  )
}
