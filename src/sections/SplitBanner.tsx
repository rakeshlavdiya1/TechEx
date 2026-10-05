import { IMAGES } from '../data/images'
import Reveal from '../components/Reveal'

const maskLeft = 'linear-gradient(to right, #000 38%, transparent 62%)'
const maskRight = 'linear-gradient(to left, #000 38%, transparent 62%)'

export default function SplitBanner() {
  return (
    <section aria-labelledby="banner-title" className="py-6 sm:py-10">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate min-h-[30rem] overflow-hidden rounded-3xl border border-white/10 sm:min-h-[34rem]">
            {/* Business (left) */}
            <img src={IMAGES.businessTeam.src} alt={IMAGES.businessTeam.alt} loading="lazy" width={1600} height={1000} className="absolute inset-0 -z-10 h-full w-full object-cover" style={{ maskImage: maskLeft, WebkitMaskImage: maskLeft }} />
            {/* Cybersecurity (right) */}
            <img src={IMAGES.securityOps.src} alt={IMAGES.securityOps.alt} loading="lazy" width={1600} height={1000} className="absolute inset-0 -z-10 h-full w-full object-cover" style={{ maskImage: maskRight, WebkitMaskImage: maskRight }} />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/20" />

            {/* Glowing seam + particles */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-glow to-transparent shadow-[0_0_24px_4px_rgba(34,211,238,0.55)]">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="absolute -left-[2px] h-1 w-1 animate-drop-dot rounded-full bg-white" style={{ animationDelay: `${i * 0.75}s` }} />
              ))}
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-40 -translate-x-1/2 bg-gradient-to-r from-electric-500/0 via-cyan-glow/10 to-violet-glow/0" />

            <div className="relative flex min-h-[30rem] flex-col items-center justify-end px-6 pb-12 text-center sm:min-h-[34rem] sm:pb-16">
              <div className="mb-5 flex w-full max-w-3xl justify-between text-xs font-medium text-slate-300 sm:text-sm">
                <span className="glass rounded-full px-3 py-1">Business</span>
                <span className="glass rounded-full px-3 py-1">Cybersecurity</span>
              </div>
              <h2 id="banner-title" className="max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">Business Moves Fast. Security Must Move Faster.</h2>
              <p className="mt-4 max-w-xl text-base text-slate-300 sm:text-lg">Connect your people, operations and technology through one intelligent digital ecosystem.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
