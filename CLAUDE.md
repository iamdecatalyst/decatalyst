# De Catalyst Portfolio

Personal portfolio for Isaac Wisdom (De Catalyst) - CEO & Solo Founder, VYLTH Strategies.

**Live:** https://decatalyst.com

## Tech Stack

- React 19 + Vite 7 + TypeScript
- Tailwind CSS 3 with neumorphic design system
- Framer Motion 12 (scroll animations, shared layout transitions)

## Project Structure

```
src/
├── components/
│   ├── layout/      Navigation, Footer, ScrollProgress, TerminalSection
│   ├── ui/          TerminalWindow, Card3D, Typewriter
│   └── sections/    Hero, About, Skills, Projects, Experience, Blog, Contact
├── hooks/           useSpaceScroll, useIsMobile, useMousePosition, useReducedMotion
├── data/            projects.ts, skills.ts, experience.ts, socials.ts
├── lib/             utils.ts (cn helper), spaceConfig.ts
└── styles/          neumorphic.css (design system), depth3d.css
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

**Repo:** https://github.com/iamdecatalyst/decatalyst (public)
**Branch:** main

## Git Commit Rules

- **One-liner brief commit messages** — no multi-line, no body paragraphs
- **No Co-Authored-By** — never add co-author trailers
- Example: `git commit -m "remove borders, pure shadow depth"`

## Design System

- **Theme:** Black & white monochrome (matching VYLTH Nexus ecosystem)
- **Dark base:** #0d0d0d with neumorphic dual shadows, NO borders on elements
- **Depth:** Pure shadow-based (raised/pressed dual shadows), never use `border` for depth
- **Accent:** White (#ffffff) — no colored accents
- **Fonts:** Inter (body), JetBrains Mono (headings/code), Crimson Pro (serif accents)
- **Neumorphic CSS:** Adapted from VYLTH Nexus (`/mnt/vylth/nexus/accounts/src/index.css`)
