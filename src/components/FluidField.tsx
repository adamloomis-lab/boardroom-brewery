import type { ChangeEvent } from 'react'
import type { LucideIcon } from 'lucide-react'

// Shared "fluid" form controls for Boardroom Brewery, tuned for the dark
// industrial surfaces: floating-label fields (amber underline drawn center-out
// + focus glow), single-select icon cards, and the animated thank-you checkmark.
// Used by the Contact and Private Events lead forms.

interface FloatFieldProps {
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
  textarea?: boolean
  rows?: number
  min?: string
  idPrefix?: string
}

export function FloatField({
  name, label, value, onChange, type = 'text', required, textarea, rows = 5, min, idPrefix = 'f',
}: FloatFieldProps) {
  const id = `${idPrefix}-${name}`
  const input =
    'peer w-full bg-transparent px-4 pt-6 pb-2 font-body text-body-md text-cream placeholder-transparent outline-none'
  const labelCls =
    'pointer-events-none absolute left-4 top-4 origin-left font-body text-body-md text-muted transition-all duration-200 ' +
    'peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-gold ' +
    'peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:text-on-surface-variant'
  return (
    <div className="group relative rounded border border-outline bg-surface transition-all duration-300 focus-within:border-gold/70 focus-within:shadow-[0_10px_30px_-14px_rgba(246,174,45,0.5)]">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={`${input} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          min={min}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={input}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-2rem)] -translate-x-1/2 scale-x-0 bg-gold transition-transform duration-300 peer-focus:scale-x-100"
      />
    </div>
  )
}

export interface IconCardOption {
  value: string
  label: string
  icon: LucideIcon
}

interface IconCardSelectProps {
  options: IconCardOption[]
  value: string
  onChange: (value: string) => void
}

// Single-select icon cards. Active card gets the amber brand fill. Replaces a
// subject/event-type select while submitting an identical value.
export function IconCardSelect({ options, value, onChange }: IconCardSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {options.map((o) => {
        const active = value === o.value
        const Icon = o.icon
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? '' : o.value)}
            className={`flex flex-col items-start gap-2 rounded border px-3.5 py-3.5 text-left font-body text-body-md transition-all duration-200 active:scale-[0.98] ${
              active
                ? 'border-gold bg-gold text-on-gold shadow-[0_10px_24px_-12px_rgba(246,174,45,0.7)]'
                : 'border-outline bg-surface text-on-surface hover:border-gold hover:bg-surface-container'
            }`}
          >
            <Icon size={22} className={active ? 'text-on-gold' : 'text-gold'} strokeWidth={1.75} />
            <span className="font-semibold leading-tight">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// Animated drawn checkmark for the personalized thank-you state.
export function SuccessCheck() {
  return (
    <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
      <circle
        cx="26" cy="26" r="24" fill="none" stroke="#f6ae2d" strokeWidth="3"
        strokeDasharray="151" strokeDashoffset="151"
        style={{ animation: 'draw-check 0.6s ease forwards' }}
      />
      <path
        d="M15 27 l7 7 l15 -16" fill="none" stroke="#f6ae2d" strokeWidth="4"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="40" strokeDashoffset="40"
        style={{ animation: 'draw-check 0.4s 0.5s ease forwards' }}
      />
    </svg>
  )
}
