# Committee portraits

The 2027 brochure and existing committee records remain the authority for membership, names, roles, and affiliations. Portrait sources are used only for photographs. No previous-edition membership or role has been imported.

Verified on 7 October 2026. Each downloaded asset opened successfully and was visually inspected. The reference HTML associates each image below with the named member through its image alt text and adjacent name. All 14 images, including the user-supplied photograph documented below, are served from `/assets/committee/`; there are no remote image dependencies.

## Reference website

Source page: <https://healthhack2026-main-1.vercel.app/>

| Current member | Source image path | Local filename |
| --- | --- | --- |
| Hon’ble Dr. G. Viswanathan | `images/img1.jpg` | `g-viswanathan.jpg` |
| Dr. Sankar Viswanathan | `images/img2.jpg` | `sankar-viswanathan.jpg` |
| Ms. Kadhambari S. Viswanathan | `images/img3.jpg` | `kadhambari-s-viswanathan.jpg` |
| Ms. Ramani Balasundaram | `images/img4.jpg` | `ramani-balasundaram.jpg` |
| Dr. T. B. Sridharan | `images/img5.jpeg` | `t-b-sridharan.jpeg` |
| Dr. Sridevi Sarma | `images/img8.webp` | `sridevi-sarma.webp` |
| Dr. Siddhartha Maiti | `images/img9.jpg` | `siddhartha-maiti.jpg` |
| Dr. Siddharth Singh Chouhan | `images/img10.jpg` | `siddharth-singh-chouhan.jpg` |
| Dr. Youseph Yazdi | `images/img11.webp` | `youseph-yazdi.webp` |
| Dr. Hedy Alavi | `images/img12.webp` | `hedy-alavi.webp` |
| Dr. Seenivasan R | `images/img13.webp` | `seenivasan-r.webp` |

The reference's K. K. Nair and Debashis Adhikari images are excluded because those people are absent from the current committee.

## Official university sources

VIT Bhopal's [Leadership page](https://vitbhopal.ac.in/leadership/) explicitly pairs these photographs with the current Vice Chancellor and Registrar:

| Current member | Official profile | Downloaded image |
| --- | --- | --- |
| Dr. Satish Kumar Modh | <https://vitbhopal.ac.in/prof-satish-kumar-modh/> | <https://vitbhopal.ac.in/wp-content/uploads/2026/03/VC-satish-modh.jpg> |
| Dr. Gyan Prakash Mishra | <https://vitbhopal.ac.in/dr-gyan-prakash-mishra/> | <https://vitbhopal.ac.in/wp-content/uploads/2026/07/Dr-Gyan-Prakash-Mishra-762x1024.png> |

Local files: `satish-kumar-modh.jpg` and `gyan-prakash-mishra.png`.

## User-supplied portrait

Dr. Prabakar S. (Director Operations, VIT Bhopal University): the user supplied and identified this photograph on 7 October 2026. Source file: `WhatsApp Image 2026-10-07 at 18.04.19.jpeg`; local file: `prabakar-s.jpeg` (800 × 800). The original photograph is used without alteration. The current committee name and role are preserved.

## Presentation and maintenance

- Portrait paths, intrinsic dimensions, and positioning are stored in `src/data/event.ts`.
- `CommitteeMember` preserves each name and complete role, with lazy-loaded images, descriptive alt text, reserved square frames, and an initials fallback on image errors.
- `object-fit: contain` preserves each complete source photograph, including the Registrar's taller portrait; no additional face cropping is applied.
- Existing accordion expansion/collapse, section reveals, navigation, and motion preferences are retained.
- Add a future verified portrait to `public/assets/committee/` and the corresponding member's optional `portrait` record. Record its official source here.

Photographs retain their original source ownership. This document does not grant additional reuse rights.
