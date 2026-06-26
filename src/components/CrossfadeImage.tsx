import { useEffect, useState } from 'react'

// Container must define its own height (pass an aspect-* class). Images stack
// absolutely and crossfade. Single image renders static.
export default function CrossfadeImage({
  images,
  alt = '',
  className = '',
  interval = 4500,
}: {
  readonly images: readonly string[]
  readonly alt?: string
  readonly className?: string
  readonly interval?: number
}) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval])
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          aria-hidden={i !== idx}
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  )
}
