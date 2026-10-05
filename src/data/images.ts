/**
 * Every photo used by the site is listed here.
 * To use real photography, drop your files into /public/images and change the
 * paths below (e.g. '/images/business-team.jpg'). Nothing else needs to change.
 */
export const IMAGES = {
  businessTeam: {
    src: '/images/business-team.svg',
    alt: 'A business team discussing strategy around a table in a modern office',
  },
  securityOps: {
    src: '/images/security-ops.svg',
    alt: 'A security operations centre with monitoring screens and a protected network',
  },
} as const
