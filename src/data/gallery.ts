export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'Keynotes' | 'Collaboration' | 'Prototyping' | 'Mentorship' | 'Awards';
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'IMG_2056',
    src: '/lottie/IMG_2056.webp',
    title: 'Inaugural Session & Keynote',
    caption: 'University dignitaries and keynote speakers inaugurating Health Hackathon with global health directives.',
    category: 'Keynotes',
  },
  {
    id: 'IMG_2091',
    src: '/lottie/IMG_2091.webp',
    title: 'Cross-Disciplinary Team Ideation',
    caption: 'Engineers, data scientists, and healthcare innovators uniting to tackle resource-limited healthcare gaps.',
    category: 'Collaboration',
  },
  {
    id: 'IMG_3176',
    src: '/lottie/IMG_3176.webp',
    title: 'Hardware & Sensor Prototyping',
    caption: 'Student teams integrating biometric sensors and edge computing devices for rural clinic diagnostics.',
    category: 'Prototyping',
  },
  {
    id: 'IMG_3228',
    src: '/lottie/IMG_3228.webp',
    title: 'Clinical & Technical Mentorship',
    caption: 'Industry experts and medical researchers guiding teams on clinical feasibility and regulatory pathways.',
    category: 'Mentorship',
  },
  {
    id: 'IMG_3300',
    src: '/lottie/IMG_3300.webp',
    title: 'Midnight Hackathon Sprint',
    caption: 'The energy remains high as teams build through the night to refine their AI models and physical prototypes.',
    category: 'Collaboration',
  },
  {
    id: 'IMG_3352',
    src: '/lottie/IMG_3352.webp',
    title: 'Jury Evaluation & Architecture Review',
    caption: 'Distinguished faculty reviewing student codebases, system diagrams, and algorithmic accuracy.',
    category: 'Mentorship',
  },
  {
    id: 'IMG_3395',
    src: '/lottie/IMG_3395.webp',
    title: 'Digital Health Platform Demo',
    caption: 'Live test runs of telehealth dashboards designed for low-bandwidth rural health centers.',
    category: 'Prototyping',
  },
  {
    id: 'IMG_3448',
    src: '/lottie/IMG_3448.webp',
    title: 'Grand Plenary Hall',
    caption: 'Auditorium filled with eager participants, researchers, and mentors during the plenary address.',
    category: 'Keynotes',
  },
  {
    id: 'IMG_3546',
    src: '/lottie/IMG_3546.webp',
    title: 'Final Stage Pitch Presentations',
    caption: 'Shortlisted finalists pitching their transformative healthtech solutions before the grand jury.',
    category: 'Prototyping',
  },
  {
    id: 'IMG_3592',
    src: '/lottie/IMG_3592.webp',
    title: 'Deep-Dive Clinical Feedback',
    caption: 'One-on-one session with clinicians discussing usability and patient safety protocols.',
    category: 'Mentorship',
  },
  {
    id: 'IMG_3618',
    src: '/lottie/IMG_3618.webp',
    title: 'Collaborative Workspace Dynamics',
    caption: 'Teams exchanging ideas across problem tracks to craft holistic community healthcare models.',
    category: 'Collaboration',
  },
  {
    id: 'IMG_3621',
    src: '/lottie/IMG_3621.webp',
    title: 'Hands-on Device Calibration',
    caption: 'Validating low-cost point-of-care testing devices for maternal and neonatal health screening.',
    category: 'Prototyping',
  },
  {
    id: 'IMG_3643',
    src: '/lottie/IMG_3643.webp',
    title: 'Design Thinking & UX Workshop',
    caption: 'Interactive workshop on human-centered design for elderly patients and rural healthcare workers.',
    category: 'Mentorship',
  },
  {
    id: 'IMG_3689',
    src: '/lottie/IMG_3689.webp',
    title: 'Institutional Leadership Address',
    caption: 'Leadership from VIT Bhopal and Johns Hopkins Whiting School addressing the assembly.',
    category: 'Keynotes',
  },
  {
    id: 'IMG_3699',
    src: '/lottie/IMG_3699.webp',
    title: 'Global Community at Work',
    caption: 'Bright minds from across institutions coming together with one shared mission.',
    category: 'Collaboration',
  },
  {
    id: 'IMG_3722',
    src: '/lottie/IMG_3722.webp',
    title: 'Interactive Technical Masterclass',
    caption: 'Delegates and students engaging during specialized AI diagnostics and bioethics sessions.',
    category: 'Keynotes',
  },
  {
    id: 'IMG_3768',
    src: '/lottie/IMG_3768.webp',
    title: 'Valedictory & Prize Distribution',
    caption: 'Celebrating top innovations recognized for practical impact, scalability, and technical excellence.',
    category: 'Awards',
  },
  {
    id: 'IMG_3779',
    src: '/lottie/IMG_3779.webp',
    title: 'Winning Team Felicitations',
    caption: 'Awardees receiving certificates and laurels for their groundbreaking healthcare access solution.',
    category: 'Awards',
  },
  {
    id: 'IMG_3810',
    src: '/lottie/IMG_3810.webp',
    title: 'Health Hackathon Community Finale',
    caption: 'Organizers, mentors, delegates, and student innovators marking the conclusion of an inspiring edition.',
    category: 'Awards',
  },
];

export const galleryCategories = [
  'All',
  'Keynotes',
  'Collaboration',
  'Prototyping',
  'Mentorship',
  'Awards',
] as const;
