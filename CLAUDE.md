# De Catalyst Portfolio

Personal portfolio for Isaac Wisdom (De Catalyst) - CEO & Solo Founder, VYLTH Strategies.

**Live:** https://decatalyst.com

## Tech Stack

- React 19 + Vite 7 + TypeScript
- Tailwind CSS 3 with neumorphic design system
- Framer Motion 12 (scroll animations, shared layout transitions)
- Three.js via @react-three/fiber (constellation hero, particles, bloom)
- @react-three/postprocessing (bloom + vignette)

## Project Structure

```
src/
├── components/
│   ├── layout/      Navigation, Footer, ScrollProgress, SectionWrapper
│   ├── three/       HeroScene (Three.js constellation + particles)
│   ├── ui/          TypeWriter
│   └── sections/    Hero, About, Skills, Projects, Experience, Blog, Contact
├── hooks/           useScrollProgress, useSectionInView, useMousePosition, useReducedMotion
├── data/            projects.ts, skills.ts, experience.ts, socials.ts
├── lib/             utils.ts (cn helper)
└── styles/          neumorphic.css (design system)
```

## Development

```bash
npm run dev      # Start dev server
npm run build    # Type-check + production build
npm run preview  # Preview production build
```

## Deployment

**Server:** Sage (`decatalyst@89.117.52.141`)
**Path:** `/opt/decatalyst`
**Domain:** decatalyst.com (+ www.decatalyst.com)
**DNS:** Namecheap -> A records pointing to 89.117.52.141
**SSL:** Let's Encrypt via Certbot (auto-renewing, expires May 28, 2026)
**Nginx:** `/etc/nginx/sites-enabled/decatalyst`

### Deploy command

```bash
ssh decatalyst@89.117.52.141 "cd /opt/decatalyst && git pull && npm run build"
```

### Nginx config location

```
/etc/nginx/sites-available/decatalyst
/etc/nginx/sites-enabled/decatalyst  (symlink)
```

Serves `/opt/decatalyst/dist` as static files with SPA fallback (`try_files $uri $uri/ /index.html`).

## GitHub

**Repo:** https://github.com/Wisyle/decatalyst (public)
**Branch:** main

## Design System

- **Dark base:** #0d0d0d with neumorphic dual shadows
- **Accents:** Klein Blue (#002FA7), Copper (#cd7f32), Rose (#e11d48)
- **Fonts:** Inter (body), JetBrains Mono (headings/code), Crimson Pro (serif accents)
- **Neumorphic CSS:** Ported from VYLTH Flow (`/mnt/vylth/vylth-flow/packages/theme/src/css/neumorphic.css`)
