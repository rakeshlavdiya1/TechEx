import Button from './Button'
import Reveal from './Reveal'

interface CTASectionProps {
  title: string
  text?: string
  cta: string
  to: string
  accent?: string
  secondary?: { label: string; to: string }
}

export default function CTASection({ title, text, cta, to, accent = '#22d3ee', secondary }: CTASectionProps) {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-16 sm:py-24" style={{ boxShadow: `0 0 90px -40px ${accent}` }}>
            <div aria-hidden className="absolute -top-32 left-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full opacity-30 blur-3xl" style={{ background: accent }} />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">{title}</h2>
              {text && <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">{text}</p>}
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button to={to} size="lg">{cta}</Button>
                {secondary && <Button to={secondary.to} variant="secondary" size="lg">{secondary.label}</Button>}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
