import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react'
import { company } from '../data/site'
import HoursList from '../components/HoursList'
import HolidayHours from '../components/HolidayHours'
import ConfigForm from '../components/ConfigForm'

export default function Contact() {
  return (
    <>
      <section className="relative flex min-h-[46vh] items-center overflow-hidden">
        <img src="/media/gallery/br-18.jpg" alt="Boardroom Brewery in El Segundo" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/68" />
        <div className="container-x relative z-10 pt-24 text-center">
          <h1 className="rise rise-2 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">Contact &amp; Directions</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">Find us in El Segundo, minutes from LAX. Stop in, or send a note and we'll get right back to you.</p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div className="reveal">
            <h3 className="font-display text-headline-sm font-bold text-cream">Our Location</h3>
            <h2 className="mt-4 font-display text-headline-lg font-bold text-cream">211 Arena Street</h2>
            <span className="gold-rule mt-5" />
            <ul className="mt-8 space-y-5 text-body-md">
              <li className="flex items-start gap-4"><MapPin size={20} className="mt-0.5 shrink-0 text-gold" /><a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="text-on-surface hover:text-gold">{company.addressOneLine}</a></li>
              <li className="flex items-start gap-4"><Phone size={20} className="mt-0.5 shrink-0 text-gold" /><a href={company.phoneHref} className="text-on-surface hover:text-gold">{company.phone}</a></li>
              <li className="flex items-start gap-4"><Mail size={20} className="mt-0.5 shrink-0 text-gold" /><a href={company.emailHref} className="break-all text-on-surface hover:text-gold">{company.email}</a></li>
            </ul>
            <div className="mt-8 flex gap-3">
              <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded border border-outline text-cream transition-colors hover:border-gold hover:text-gold" aria-label="Facebook"><Facebook size={18} /></a>
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded border border-outline text-cream transition-colors hover:border-gold hover:text-gold" aria-label="Instagram"><Instagram size={18} /></a>
            </div>
            <div className="mt-10 rounded-[3px] border border-outline-variant bg-surface-card p-7">
              <div className="flex items-center gap-3"><Clock size={20} className="text-gold" /><h3 className="font-display text-headline-sm font-bold text-cream">Hours</h3></div>
              <HoursList className="mt-4 -mx-2" />
              <HolidayHours className="mt-5 -mx-2 border-t border-outline-variant pt-5" />
            </div>
          </div>
          <div className="reveal">
            <div className="rounded-[3px] border border-outline-variant bg-surface-card p-8 md:p-10">
              <h3 className="font-display text-headline-sm font-bold text-cream">Send a Message</h3>
              <h2 className="mt-4 font-display text-headline-md font-bold text-cream">Get in Touch</h2>
              <ConfigForm name="contact" idPrefix="contact" boxed />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant">
        <iframe title="Boardroom Brewery location map" src={company.mapsEmbed} className="h-[460px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
    </>
  )
}
