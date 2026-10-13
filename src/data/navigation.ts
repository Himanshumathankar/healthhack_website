/** Shared destinations, in the existing mobile menu's published order. */
export const navigationLinks = [
  ['overview', 'Overview'],
  ['tracks', 'Focus areas'],
  ['timeline', 'Timeline'],
  ['awards', 'Awards'],
  ['registration', 'Registration'],
  ['gallery', 'Gallery'],
  ['committee', 'People'],
  ['institutions', 'Institutions'],
  ['participation', 'FAQs'],
  ['coordinator', 'Student Coordinator'],
  ['contact', 'Contact'],
] as const;

export type NavigationLink = typeof navigationLinks[number];
