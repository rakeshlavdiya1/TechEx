import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '../data/site'
import Logo from './Logo'
import Button from './Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-full px-3 py-2 text-sm transition-colors ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-white/10 bg-ink-900/80 backdrop-blur-xl' : 'border-b border-transparent'}`}>
      <div className={`container-x flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
        <Logo compact={scrolled} />

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-cyan-glow to-transparent" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <Button to="/contact" size="md">Let&apos;s Build Your Workspace</Button>
          </div>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full glass xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
              <motion.span className="absolute left-0 h-0.5 w-5 rounded bg-white" animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }} />
              <motion.span className="absolute left-0 top-1.5 h-0.5 w-5 rounded bg-white" animate={{ opacity: open ? 0 : 1 }} />
              <motion.span className="absolute left-0 h-0.5 w-5 rounded bg-white" animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="container-x max-h-[calc(100svh-4rem)] overflow-y-auto pb-8 xl:hidden"
          >
            <ul className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <NavLink to={link.to} end={link.to === '/'} className={({ isActive }) => `block rounded-xl px-4 py-3.5 text-lg font-medium ${isActive ? 'bg-white/10 text-white' : 'text-slate-300'}`}>
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-5"><Button to="/contact" size="lg" className="w-full">Let&apos;s Build Your Workspace</Button></div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
