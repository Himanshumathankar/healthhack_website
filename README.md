# Health Hackathon 3.0

A responsive event website for **Global Health Access Innovation Challenge – Next Generation**, jointly branded for VIT Bhopal University and Johns Hopkins Whiting School of Engineering.

- **Hackathon:** 28–29 January 2027
- **Workshop:** 27 January 2027
- **Venue:** VIT Bhopal University

## Features

- Responsive split hero with a scroll-driven photo runway on desktop and the complete healthcare illustration from the event brochure.
- Ten healthcare innovation tracks, seven timeline milestones, five prizes, and team registration information.
- Photo gallery of previous-edition moments with a keyboard-navigable lightbox.
- Organizing committee, coordinators, industry partners, institutional profiles, and participation FAQs.
- Compact Coordinator contact cards with supplied portraits and call, WhatsApp, and SMS links.
- Registration links, the brochure's original QR code, downloadable PDF, and email contact.
- Sticky navigation, working URL fragments, smooth scrolling, active-section indicators, and back-to-top navigation.
- Staggered entrances, one-time scroll reveals, animated accordions, and menu opening/closing transitions.
- Keyboard-accessible controls, visible focus states, and support for reduced-motion preferences.
- Timeline highlighting based on the Asia/Kolkata calendar and an automatic completed-event state after 29 January 2027.

## Tech stack

| Layer | Choice | Role |
| --- | --- | --- |
| UI | [React](https://react.dev/) 19 | Component tree, client state, and accessibility-focused interactions |
| Language | [TypeScript](https://www.typescriptlang.org/) 5 | Typed application and data modules |
| Bundler | [Vite](https://vite.dev/) 7 | Dev server, production build, and React plugin |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 | Utility classes via the Vite plugin, plus project CSS |
| Icons | [Lucide React](https://lucide.dev/) | Interface icons |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) | Wheel/touch scrolling with reduced-motion fallback |
| Animation | CSS, IntersectionObserver, Web Animations API | Entrances, reveals, accordions, and hero slide progress |
| Motion assets | [lottie-web](https://airbnb.io/lottie/) | Lottie runtime; `public/lottie/hero-bg.json` is available as a motion asset |
| Hosting | [Vercel](https://vercel.com/) | Static Vite deploy (`vercel.json`, Node 22) |
| Runtime | Node.js 22 | Local tooling and the production install/build environment |

Fonts are self-hosted. There is no backend, database, or environment-variable configuration.

## Local setup

Use Node.js 22 and npm. With nvm installed, `.nvmrc` selects the correct Node version.

```sh
nvm use
npm ci
npm run dev
```

Open http://127.0.0.1:5173. No environment variables or backend services are required.

## Production build and preview

```sh
npm run build
npm run preview -- --port 4173 --strictPort
```

Open http://127.0.0.1:4173. The preview serves the compiled files in `dist`; it is a local verification server. Build output is generated and excluded from Git.

## Deployment

### Vercel

Import the repository and select the directory containing `package.json` and `vercel.json` as the Root Directory. If the repository begins with the project files, use `.`; if importing the parent workspace, select `health-hackathon`.

The checked-in configuration uses:

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Node.js | 22.x |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

No environment variables are required. Alternatively, run `npx vercel` from the project directory for a preview deployment and `npx vercel --prod` to publish.

### Other static hosts

Run `npm ci` and `npm run build`, then publish the contents of `dist` at the site's root. Assets use root-relative paths. Navigation uses fragments such as `/#overview`, so no client-side route rewrite is required. Preserve direct delivery of the PDF, images, and fonts.

Once the final public domain is selected, add it to the canonical and Open Graph URL metadata in `index.html` if needed.

## Content and assets

- `src/data/event.ts`: current-edition event data, dates, tracks, prizes, committee, coordinators, partners, institutional profiles, and registration destination.
- `src/data/coordinator.ts`: coordinator contact details and portrait framing.
- `src/data/gallery.ts`: previous-edition gallery photos, captions, and categories.
- `src/data/previousEdition.json`: historical reference data; its problem statements are not rendered as confirmed requirements for this edition.
- `public/health-hackathon-3-brochure.pdf`: original two-page event brochure.
- `public/assets/`: brochure artwork, institutional logos, event emblem, campus images, and registration QR code.
- `public/lottie/`: hero and gallery WebP photos plus `hero-bg.json`.
- `public/fonts/`: self-hosted font files and their required license notices.
- `IMPLEMENTATION_NOTES.md`: source precedence, asset provenance, and organizer confirmation items.
- `MOTION_NOTES.md`: animation behavior and verification notes.
- `VERCEL_READINESS.md`: production checks and registration form review.

The brochure is authoritative for this edition. Keep its published currency equivalents and verify event changes with the organizers before updating the content. The external registration form's access policy and conflicting dates are documented in the verification notes.

Required font licenses and source-supported institutional attribution are retained.
