/**
 * Central place for brand details. Change the company name, contact details
 * and navigation here and the whole site updates.
 */
export const SITE = {
  name: 'Tech-Ex',
  email: 'hello@techex.com',
  phone: '+91 969 454 1870',
  location: 'Jaipur, India',
  get year() {
    return new Date().getFullYear()
  },
}

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Cybersecurity One', to: '/cybersecurity-one' },
  { label: 'Business One', to: '/business-one' },
  { label: 'Smart Think Center', to: '/smart-think-center' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const
