import { caseStudies } from './caseStudies/index'
import type {
  AboutContent,
  CaseStudyDetail,
  OutsideWorkItem,
  Project,
  Testimonial,
  WritingEntry,
} from './types'

export type {
  AboutContent,
  CaseStudyDetail,
  OutsideWorkImage,
  OutsideWorkItem,
  Project,
  Testimonial,
  WritingEntry,
} from './types'

export { caseStudies }

export const CONTACT_EMAIL = 'jaisonktom@gmail.com'

/** Bump when case study copy changes materially (helps verify the loaded bundle in devtools). */
export const CONTENT_REVISION = '2026-04-08-magic-diary-phones-device-left'

/** Card list on home, same order as case studies */
export const projects: Project[] = caseStudies.map(
  ({ id, title, description, tag, company, year }) => ({ id, title, description, tag, company, year }),
)

export function getCaseStudyBySlug(slug: string): CaseStudyDetail | undefined {
  return caseStudies.find((c) => c.id === slug)
}

/** Home, Awards row (laurel badges below testimonials) */
export const awards = [
  { lines: ['Rockstar, Product', 'MoEngage', '(2025)'] },
  { lines: ['Best performer', 'Magicbricks', '(2024)'] },
  { lines: ['Pre-seed funding', 'Khoj Hackathon', 'IIITDMJ (2021)'] },
] as const

export const aboutContent: AboutContent = {
  headline: 'About',
  paragraphs: [
    'I am Jaison Thomas, a product designer who works at the intersection of research, systems thinking, and craft. My practice is built around clarity: making complex domains legible, aligning teams on what to build next, and shipping interfaces that respect real-world constraints.',
    'I have led end-to-end work across consumer and B2B products, habit formation and retention, orchestration tooling, analytics, and multi-stakeholder research. I partner closely with product, engineering, and data to connect design decisions to measurable outcomes without turning people into metrics.',
    'This site is meant to grow with case studies, writing, and artifacts. If you are exploring collaboration, research partnerships, or product design leadership, I would love to hear from you.',
  ],
}

export const LEGACY_PORTFOLIO_URL = 'https://jaisondesignportfolio.framer.website/'

export const writingsContent: WritingEntry[] = [
  {
    title: 'Designing for trust in analytics surfaces',
    date: 'Draft',
    summary:
      'Why definition transparency, latency honesty, and progressive depth matter as much as chart polish, especially in B2B workflows where numbers drive decisions.',
    note: 'Add a public URL when published.',
  },
  {
    title: 'Habit loops without dark patterns',
    date: 'Draft',
    summary:
      'A practical framework for retention work that improves weekly active usage while protecting user autonomy, reminders, milestones, and paywalls that align with intent.',
    note: 'Add a public URL when published.',
  },
  {
    title: 'Orchestration as a systems design problem',
    date: 'Draft',
    summary:
      'How journey builders, testing, and analytics interlock, and why UX must model graphs, branches, and failure modes across teams.',
    note: 'Add a public URL when published.',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      "Jaison, one of your greatest superpowers is your deep understanding of people and concepts. You don't just skim the surface; you dive in with your heart, seeking to grasp every detail, whether it's a conversation with a person or a complex idea. You're not satisfied until you've explored it from every angle, questioning why things work a certain way and how they connect to other aspects of life.",
    name: 'Minaxi Goel',
    role: 'Senior Reseracher, Clarivate',
  },
  {
    quote:
      "Jaison is an exceptional professional characterized by a unique amalgamation of attributes including exceptional drive, attentive listening, and adept problem-solving skills. The assurance of Jaison's involvement in any project alleviates concerns, as he consistently ensures its successful completion. His pivotal role as an affirmative contributor significantly enriched the team, consistently delivering punctually and upholding superior standards of quality.",
    name: 'Sandeep Pal',
    role: 'Lead Designer, MoEngage',
  },
  {
    quote:
      'Jaison consistently demonstrates a level of commitment that sets a new benchmark. He has shown a great capacity for taking ownership and going the extra mile. Jaison has a fantastic ability to learn fast, and then move forward independently. It is his personal hard work, dedication, and sense of ownership that truly shine through and deserve credit. His excellent collaboration on work-related tasks and internal team workshops has already made a significant and positive impact.',
    name: 'Arindam Roy',
    role: 'Design Director, MoEngage',
  },
  {
    quote:
      'Jaison has a systematic approach to problem solving. While designing a mobile app, Jaison showed great skills not only in user research but also in UI design. He is empathetic and has sound principles with respect to human-centric design.',
    name: 'Anabil Dey',
    role: 'Strategy & Operations, Google',
  },
  {
    quote:
      'We discovered Jaison while looking for a person to help us design an app. He was totally invested in the project and worked in the true spirit of collaboration with our team. He was meticulous in his approach and completed the prototype within the planned timeline.',
    name: 'Kaushik',
    role: 'Senior Consultant, Cloudcraftz Solutions',
  },
]

/** Shared assets in /public/outside-work/ */
const ow = (filename: string) => `/outside-work/${filename}` as const

/** Home, interests beyond day-to-day product work */
export const outsideWork: OutsideWorkItem[] = [
  {
    title: 'Organise events & run communities',
    description:
      'I run two communities for designers. Design FunDays (250+ designers) focuses on bringing designers together through offline and online events. Designers who Claude is a 100+ member group for peers who want to explore Claude and Figma together. I also host sessions on Claude Code, Figma MCP, and related topics.',
    images: [
      {
        src: ow('design-competition-rooftop-workshop.png'),
        alt: 'In-person design session on a rooftop patio: presenters at a whiteboard with participants at tables.',
      },
      {
        src: ow('design-competition-remote-session.png'),
        alt: 'Remote design session on a video call with participants in a grid.',
      },
      {
        src: ow('image-f54bcd4d-4f7b-47f6-8812-d6fa752149ff.png'),
        alt: 'Workshop graphic, Claude and Figma MCP session',
      },
    ],
  },
  {
    title: 'Photography',
    description:
      'Off-screen I reach for a camera, light, composition, and patience. It sharpens the same instincts I use in product: frame what matters, cut what doesn’t, and know when to wait for the moment.',
    images: [
      {
        src: ow('photography-church-dusk.png'),
        alt: 'White Gothic church at dusk, illuminated shrine and warm light against a dark blue sky.',
      },
      {
        src: ow('photography-temple-storm.png'),
        alt: 'Ornate stone Hindu temple carvings against heavy storm clouds, low angle.',
      },
      {
        src: ow('photography-hike-path.png'),
        alt: 'Hiker on a stone path through tall dry grass toward rocky hills under a pale sky.',
      },
    ],
  },
  {
    title: 'Travel',
    description:
      'Travel and long rides pull me away from the screen: new routes, unfamiliar roads, and the quiet focus that comes from moving through space. Whether it is a planned trip or a weekend ride, it is a reminder that direction matters as much as pace, the same instinct I try to bring to product work.',
    images: [
      {
        src: ow('travel-hairpin-road.png'),
        alt: 'Mountain hairpin road winding downhill with motorcycles on the curves.',
      },
      {
        src: ow('travel-motorcycle-plateau.png'),
        alt: 'Motorcycle on a rocky plateau, misty hills and rock formations behind.',
      },
      {
        src: ow('travel-backwater-nets.png'),
        alt: 'Traditional fishing nets and a small shack on calm backwater.',
      },
    ],
  },
]
