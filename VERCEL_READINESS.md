# Vercel readiness — 7 October 2026

## Configuration

- Project root: the directory containing `package.json` and `vercel.json` (`health-hackathon` within the supplied workspace).
- Framework: Vite; Node: 22.x; install: `npm ci`; build: `npm run build`; output: `dist`.
- No required environment variables or backend services. Fragment-based navigation needs no SPA rewrite.
- Removed the previous host's hard-coded `og:url`; set the final domain in the HTML metadata once selected.

## Production verification

- Clean lockfile installation and production TypeScript/Vite build passed using Node 22.23.3; npm audit reported zero vulnerabilities.
- Tested the compiled `dist` site using `npm run preview` on port 4173, not the development server.
- All 17 asset references are deployable, exist in `dist`, and match their originals. All 19 public files returned HTTP 200 and identical bytes, including the PDF with `application/pdf` content type. No local computer paths in production HTML, JS, or CSS.
- Visually inspected at 320×740, 360×800, 768×1024, 1366×900, and 1920×1080. No horizontal overflow; hero retains its intrinsic proportions and `object-fit: contain`.
- Checked all five desktop and seven mobile navigation destinations, URL fragments and sticky offsets, direct-fragment reloads, smooth scrolling/back-to-top, active indicators, hero and section/card reveals, menu opening/closing, rapid toggles, accordion expansion/collapse, keyboard controls and reduced-motion emulation.
- Browser warning/error logs were empty. Registration links all retain the brochure's destination; PDF and image bytes are unchanged.

## Registration organizer review

The printed link and QR both redirect to Google Form ID `1FAIpQLSchifHES7ecD6yo-cY_X-njAixyT6urEl2oFDGZSUDsRcJplQ`. Both returned HTTP 401 to anonymous HTTP checks. The existing signed-in browser can open the form, titled **VITB-JHU Health-Hack 2027: Registration Form**. No responses were entered or submitted, and later form pages/payment/submission flow were not tested.

The form currently says **28–29 January 2026** for the in-person final stage and **6 October 2026** for registration opening. These conflict with the authoritative brochure's **28–29 January 2027** and **5 October 2026**. The website retains the brochure dates. Organizers should correct the external form and confirm its intended sign-in/access policy before launch.
