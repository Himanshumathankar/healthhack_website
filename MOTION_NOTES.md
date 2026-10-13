# Motion update

Content data, brochure, assets, branding, and link destinations are unchanged.

The old scroll offset override, broad reveal containers, persistent animation fill transforms, and native instantaneous disclosures prevented consistent visible motion. The update uses CSS for hero and interface motion and a single IntersectionObserver for one-time section/card entrances. No animation dependencies or competing scroll libraries were added.

- Interface motion: 260 ms; section entrances: 600 ms; reveal stagger: 65 ms, capped at 195 ms.
- Section anchors share one scroll controller with the active navigation indicator. Clicks scroll smoothly below the measured sticky header and create history entries; manual scrolling replaces the current hash without scrolling again. Hero/top clears the hash while preserving pathname and query parameters.
- Navigation intent lasts only until scrolling settles or the visitor interrupts it. Short bottom sections use clamped scroll positions, and Back/Forward restores the saved position without a competing native history scroll.
- Navigation stays mounted throughout closing, becomes inert immediately, and supports Escape, outside clicks, focus departure, selection, arrow keys, Home, and End.
- Accordions keep native details/summary semantics and animate measured height, including interrupted toggles.
- Reduced-motion mode disables movement. Reveal elements use visible default styles if observers or Web Animations are unavailable or fail.

## Verification

Inspected the running preview at 320, 360, 768, 1366, and 1920 px. Checked menu opening/closing, rapid repeated toggles, navigation hashes and sticky offsets, keyboard navigation/focus, card hover after entrances, progressive timeline reveals, accordion Enter/Space and rapid reversals, back-to-top, and emulated reduced motion. No horizontal overflow or clipped hero artwork; browser warning/error logs were empty. Production TypeScript/Vite build passes.

The section-navigation update was inspected at 1440, 1280, 1024, 768, and 390 px. All ten destinations are available through the shared navigation and its overflow menu. Checked every desktop/mobile anchor, manual scroll hash replacement, hero hash removal with query preservation, Coordinator → Contact, repeated Contact clicks and upward scrolling, rapid navigation, wheel interruption, fresh Contact deep-link loading and refresh, keyboard menu selection/Escape, Back/Forward, and reduced-motion navigation. Existing event data, media, contact actions, and animation styles are unchanged.
