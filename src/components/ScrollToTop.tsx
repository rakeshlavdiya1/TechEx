import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to top on route change, or to an #anchor (also on lazy-loaded pages). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    let tries = 0
    const timer = window.setInterval(() => {
      const el = document.getElementById(hash.slice(1))
      tries += 1
      if (el) {
        el.scrollIntoView()
        window.clearInterval(timer)
      } else if (tries > 15) {
        window.clearInterval(timer)
      }
    }, 100)
    return () => window.clearInterval(timer)
  }, [pathname, hash])
  return null
}
