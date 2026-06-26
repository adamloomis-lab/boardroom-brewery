import { Link } from 'wouter'
import type { ReactNode } from 'react'

type Variant = 'gold' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 font-body font-medium uppercase tracking-[0.16em] text-[13px] px-8 py-4 rounded transition-all active:scale-[0.98]'

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-on-gold hover:bg-gold-light shadow-[0_8px_30px_-10px_rgba(198,160,73,0.6)]',
  outline: 'border border-gold/60 text-gold hover:border-gold hover:bg-gold/10',
  ghost: 'border border-cream/25 text-cream hover:border-cream/60 hover:bg-cream/5',
}

interface Props {
  readonly href: string
  readonly variant?: Variant
  readonly children: ReactNode
  readonly className?: string
}

export default function Button({ href, variant = 'gold', children, className = '' }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  )
}
