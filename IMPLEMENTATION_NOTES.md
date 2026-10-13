# Implementation and source notes

## Sources and precedence

1. New-edition source: the two-page user-supplied `‎Untitled.pdf`, copied unmodified to `public/health-hackathon-3-brochure.pdf`. Both pages were rendered and visually inspected. Page 1 provides identity, artwork, workshop date, abstract, VIT profile and campus image. Page 2 provides Johns Hopkins profiles and photos, committee and roles, 32 coordinators, two industry partners, ten focus areas, timeline, five prizes, fee, QR, contact email, university address and switchboard.
2. Previous edition: https://vitbhopal.ac.in/health-hackathon-2026-d/ — read for scope and comparison. Its February 2026 dates, different committee roles, three prizes, USD equivalents, old link, phone contacts, detailed problem statements, guidelines and benefits were not promoted to 2027 facts. All 15 historical statements remain separate in `src/data/previousEdition.json`.
3. The user’s exact seven milestones and spellings of ten focus areas take precedence. Published USD equivalents are preserved, with no conversion.

## Authentic artwork extraction

The PDF has no independent artwork layers or text objects: each page contains a single embedded 1654-pixel-wide JPEG. The original JPEGs were extracted without screenshot scaling. The full circular healthcare illustration was isolated from page 1 at source coordinates (721, 253)–(1564, 1104), using the existing circular boundary to remove unrelated brochure design. The central digital human, standing person, laboratory, and complete illuminated platform remain intact. The resulting 843 × 851 WebP is rendered with `height: auto` and `object-fit: contain`; no fixed-height crop or overflow clipping is applied. Resolution is limited by the brochure’s original raster artwork, rather than inflated by artificial upscaling.

University logos and the Health Hack emblem are original brochure extractions. Small unrelated yellow/blue page fragments outside the brand marks were excluded. University photos are authentic, but their source resolutions are 360 × 180 (VIT), 639 × 325 (Johns Hopkins) and 481 × 318 (Whiting). No portraits were invented or reused. Fonts are self-hosted.

## Registration verification (7 October 2026)

- Printed link, visually read from page 2: **https://forms.gle/wxTCu2gxwcBePpDD8**.
- Original QR decoded independently with OpenCV: **https://www.canvaqr.com/RGK9lxDFrM**.
- Both HTTP redirects resolve to the same Google Form ID: **1FAIpQLSchifHES7ecD6yo-cY_X-njAixyT6urEl2oFDGZSUDsRcJplQ** (query parameters differ: `usp=send_form` / `usp=header`).
- Direct anonymous access to the final form returned **HTTP 401**. The destination is verified against both brochure sources; form title, edition-specific fields, access policy, payment workflow and submission success could not be verified. Organizers should review access before public launch.
- The site links directly to the printed `forms.gle` URL. Its extracted original QR retains the brochure’s Canva redirect. Both are configurable in `event.ts`. The old TinyURL is confined to the historical data.

## Content review

All new committee roles were transcribed from page 2: Chief Patron (1), Patrons (3), Co-Patrons (5), Convenors (4), Co-Convenors (1), Co-ordinators (32), Industry Partners (2). Coordinator professional roles beyond the group heading are not supplied by the brochure and were not invented. Name spacing and punctuation were normalized for legibility without changing identities. Institutional figures and rankings follow the brochure, with an on-page attribution to their publication context.

The only displayed phone number is the brochure’s university switchboard, +91-7560 350 900 / 901 / 902, identified as such. The event contact is healthhack@vitbhopal.ac.in.

## Requires organizer confirmation

- Final Google Form title, fields, access policy and ability to submit (HTTP 401 anonymously).
- Specific submission template, file formats, payment instructions, fee collection timing and refund terms.
- Formal eligibility, solo-entry/team matching rules, judging rubric, mentors, specific datasets/APIs and detailed workshop agenda.
- Accommodation and travel arrangements, exact session times, certificates, incubation support and post-event benefits.
- Applicability of any of the previous edition’s 15 detailed problem statements, advisory committee, guidelines, news and gallery.

These unknowns are absent from confirmed current-edition content. The participation section retains useful topics only where the new brochure supports them, with contact links for logistical questions.

## Verification

Inspected at 320 × 740 (compact phone), 360 × 800 (small phone), 768 × 1024 (tablet), 1366 × 900 (laptop) and 1920 × 1080 (wide desktop). Checked the full illustration’s intrinsic ratio and viewport bounds, no horizontal overflow, all seven milestones, ten focus areas, five awards, team fee, all names/roles, email, registration links, QR decoding and original PDF delivery. Tested mobile menu open/close, Escape focus return, anchor offsets, native keyboard accordions, skip link, active navigation, reduced-motion visibility and completed-edition behavior after 29 January 2027. Production build and browser console checks pass. Axe WCAG 2/2.1 A/AA audits at phone and laptop widths return zero automated violations after correcting secondary-label contrast. Automated audits complement the manual keyboard and visual checks; they are not a certification. Detailed QA results are in the workspace `tmp/qa/` directory.

## Vercel preparation follow-up

See `VERCEL_READINESS.md` for the clean Node 22 production build, asset/HTTP audit, compiled-preview browser checks, and current registration form review. The signed-in browser now confirms the form title is “VITB-JHU Health-Hack 2027: Registration Form”; anonymous HTTP access still returns 401. Its final-stage year and registration-opening day conflict with the brochure and require organizer correction. The website content and registration destination remain brochure-authoritative.
