# Tech-Ex Website

A premium, interactive business website for three products: **Cybersecurity One**, **Business One** and **Smart Think Center**.

Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router and Lucide icons.

## Quick start

```bash
npm install          # install dependencies
npm run dev          # start the dev server at http://localhost:5173
npm run build        # type-check and create a production build in /dist
npm run preview      # serve the production build locally
```

Requires Node.js 18 or newer.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: hero, product cards, split banner, feature sections |
| `/cybersecurity-one` | SOC, IT dashboard, vulnerability assessment, penetration testing, control center |
| `/business-one` | Connected departments, email reduction, approval flow |
| `/smart-think-center` | Six-step process, live workspace UI |
| `/about`, `/contact` | Company and contact form |
| `*` | Custom 404 |

## Project structure

```
public/            favicon and /images (replaceable banner images)
src/
  animations/      shared Framer Motion variants
  components/      reusable UI (Navbar, ProductCard, ProductStoryTransition, FiberPath, Workflow, ...)
  data/            all editable content: site, products, departments, features, images
  hooks/           useCountUp, useActiveSection, useMediaQuery
  pages/           one file per route
  sections/        page sections (cyber/, business/, smart/ and home sections)
  App.tsx          routes + layout
  index.css        Tailwind layers and global styles
```

## Customising

**Company name, contact details, navigation** – `src/data/site.ts`. The logo mark is in `src/components/Logo.tsx`; the favicon is `public/favicon.svg`.

**Colors** – `tailwind.config.js` (`ink`, `electric`, `cyan.glow`, `violet.glow`) and the CSS variables at the top of `src/index.css`. Each product's accent color is set in `src/data/products.ts`.

**Images** – the homepage banner uses one business image and one cybersecurity image. Drop your files into `public/images/` and update the paths in `src/data/images.ts`, e.g. `'/images/business-team.jpg'`. Use images you have the rights to (Unsplash and Pexels are good sources). Recommended size: 1600×1000 or larger. The placeholder SVGs can be deleted afterwards.

**Departments** – `src/data/departments.ts`.

**Add a product**
1. Add an entry to `PRODUCTS` in `src/data/products.ts` (the home cards, footer and story transition pick it up automatically). Add its id to the `ProductId` type.
2. Create `src/pages/YourProduct.tsx` (copy `SmartThinkCenter.tsx` as a starting point).
3. Register it in `src/App.tsx` (lazy import + `<Route>`) and add a link in `NAV_LINKS` in `src/data/site.ts`.

**Contact form** – validation is built in. Submission currently shows a success state only. Connect a backend in the `submit` function in `src/sections/ContactForm.tsx`.

**Legal pages** – the Privacy Policy and Terms are placeholders on the About page. Replace them before publishing.

## Accessibility and performance

- Semantic landmarks, skip link, visible focus states, keyboard-navigable menus and tabs
- `prefers-reduced-motion` is respected (network canvas is frozen, story transition is skipped, reveals are disabled)
- Routes are code-split; the canvas background pauses when off-screen
- Fonts load from Google Fonts with system fallbacks

## Upload to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Tech-Ex website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploy

Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages). Build command: `npm run build`, output folder: `dist`. Because the site uses client-side routing, configure a fallback that serves `index.html` for unknown paths (Netlify: a `_redirects` file containing `/* /index.html 200`).
