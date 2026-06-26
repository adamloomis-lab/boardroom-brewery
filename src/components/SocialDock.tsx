import { useRef } from 'react'
import type { ComponentType } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { Instagram, Facebook, MapPin, Phone } from 'lucide-react'
import { company } from '../data/site'

type Item = { icon: ComponentType<{ size?: number }>; label: string; href: string }
const items: Item[] = [
  { icon: Instagram, label: 'Instagram', href: company.social.instagram },
  { icon: Facebook, label: 'Facebook', href: company.social.facebook },
  { icon: MapPin, label: 'Directions', href: company.mapsDir },
  { icon: Phone, label: 'Call', href: company.phoneHref },
]

function DockIcon({ mouseX, icon: Icon, label, href }: { mouseX: MotionValue<number> } & Item) {
  const ref = useRef<HTMLAnchorElement>(null)
  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - b.x - b.width / 2
  })
  const sizeT = useTransform(distance, [-110, 0, 110], [44, 64, 44])
  const size = useSpring(sizeT, { mass: 0.1, stiffness: 160, damping: 12 })
  const external = href.startsWith('http')
  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      style={{ width: size, height: size }}
      className="grid aspect-square place-items-center rounded-full border border-outline bg-surface-card text-gold transition-colors hover:border-gold hover:text-gold-light"
    >
      <Icon size={22} />
    </motion.a>
  )
}

export default function SocialDock({ className = '' }: { readonly className?: string }) {
  const mouseX = useMotionValue(Infinity)
  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex items-end gap-3 ${className}`}
    >
      {items.map((it) => (
        <DockIcon key={it.label} mouseX={mouseX} {...it} />
      ))}
    </div>
  )
}
