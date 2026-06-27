import { Link } from 'wouter'

// Boardroom Brewery main logo (mark + BOARDROOM wordmark), white for the dark theme.
export default function Logo({
  variant = 'bar',
  className = '',
}: {
  readonly variant?: 'bar' | 'stacked'
  readonly className?: string
}) {
  const h = variant === 'stacked' ? 'h-10 sm:h-12' : 'h-7 sm:h-9'
  return (
    <Link href="/" aria-label="Boardroom Brewery, home" className={`inline-flex ${className}`}>
      <img src="/media/boardroom-logo-white.png" alt="Boardroom Brewery" className={`${h} w-auto`} />
    </Link>
  )
}
