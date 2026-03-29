import type { CaseStudyDetail } from '../types'

export const futurestar: CaseStudyDetail = {
  id: 'futurestar',
  title: 'Futurestar — User Research',
  description:
    'Identifying the difficulties faced by students in identifying the career path of their interest, and understanding the perspective of students, parents & schools. Mapped out the journey and created personas involved in this problem.',
  tag: 'First in industry.',
  company: 'Futurestar',
  year: '2022',
  figmaDesignUrl:
    'https://www.figma.com/design/5BXKUo563G7chsvPVxTpxy/Portfolio?node-id=2607-2210&m=dev',
  summary:
    'Futurestar aimed to help young people navigate career discovery without reducing lives to algorithms. I led qualitative research across students, parents, and educators to understand motivations, constraints, trusted information sources, and the emotional texture of big decisions. The output was a shared map of journeys, personas, and tensions that grounded product strategy in real-world complexity.',
  context: [
    'Career discovery is not a single decision—it is a long arc shaped by identity, family expectations, academic pressure, peer influence, and uneven access to guidance.',
    'The organization needed evidence, not assumptions, to decide what to build first and how to position the product ethically—especially when recommendations can shape young people’s futures.',
  ],
  role:
    'Research lead—study design, recruitment, interviews, synthesis workshops, journey mapping, persona development, and stakeholder readouts.',
  meta: {
    industry: 'Edtech / career discovery',
    timeline: 'Multi-stage qualitative study with iterative synthesis',
    scope: 'Students (multiple age bands), parents/guardians, teachers and counselors',
    collaboration:
      'Product, leadership, and later design for concept directions informed by findings',
  },
  keyMetrics: [
    { value: 'Multi-stakeholder', label: 'Triangulated views across roles' },
    { value: 'Journey + persona', label: 'Behavioral segments, not demographics alone' },
    { value: 'Actionable', label: 'Prioritized implications for roadmap' },
  ],
  sections: [
    {
      title: 'Research questions',
      paragraphs: [
        'We started by clarifying what we needed to learn—not only “what students want,” but how decisions are negotiated across stakeholders, what trust looks like in guidance, and where digital tools help versus add noise.',
        'Core questions included: What triggers active search? What makes advice credible? How do students balance passion vs practicality? How do parents express concern without shutting down exploration? What constraints do schools operate under?',
      ],
    },
    {
      title: 'Methodology',
      paragraphs: [
        'We used semi-structured interviews to allow stories to emerge while keeping comparability across participants. Sessions were adapted for age: younger students needed different prompts and pacing than older adolescents preparing for higher education decisions.',
        'We triangulated with educators to understand institutional constraints—time, responsibility boundaries, and how guidance is delivered in reality versus policy documents.',
      ],
      bullets: [
        'Recruitment criteria designed to reduce bias and capture diversity of context',
        'Consent processes appropriate for minors and guardians',
        'De-identified notes and thematic coding for synthesis',
      ],
    },
    {
      title: 'What we heard from students',
      paragraphs: [
        'Students described a mix of excitement and anxiety. Many wanted autonomy but also reassurance. Social proof mattered—peers and online narratives strongly influenced what felt “realistic.” Fear of choosing wrong showed up as procrastination, not apathy.',
        'Information overload was common, but the deeper issue was evaluation: students often did not know how to compare paths, what signals mattered, or how to sequence next steps.',
      ],
    },
    {
      title: 'Parents and guardians',
      paragraphs: [
        'Parents were not monolithic. Some prioritized stability; others emphasized passion—often the same parent oscillated between both depending on context. Trust was tied to transparency: parents responded better when tools clarified intent, data use, and outcomes rather than promising certainty.',
        'A recurring tension was communication: students wanted independence; parents wanted visibility. Products that ignore this dynamic create adoption friction at home.',
      ],
    },
    {
      title: 'Schools and counselors',
      paragraphs: [
        'Educators highlighted workload limits and the risk of overpromising individualized guidance. They wanted tools that complemented counseling—helping students prepare for conversations rather than replacing human judgment.',
      ],
    },
    {
      title: 'Synthesis: journeys and personas',
      paragraphs: [
        'We mapped journeys with emotional highs and lows—from first curiosity to narrowing options to decision milestones. Personas were built around behaviors and constraints: sources of trust, sensitivity to pressure, access to networks, and preferred learning modalities.',
        'A key insight was that “career discovery” is often a family system problem. A student-only product narrative would miss critical blockers and enablers.',
      ],
      bullets: [
        'Behavioral segments (e.g., explorers vs planners vs pressured deciders)',
        'Tension map between aspiration, peer influence, and family expectations',
        'Implications for onboarding, tone, and guardian-facing features',
      ],
    },
    {
      title: 'Implications for product',
      paragraphs: [
        'Research did not produce a feature list—it produced constraints and opportunities. We recommended sequencing that builds evaluation skills early, surfaces credible next steps, and designs guardian touchpoints as collaboration features rather than surveillance.',
      ],
    },
    {
      title: 'Deliverables and handoff',
      paragraphs: [
        'Deliverables included journey maps, persona cards, a prioritized opportunity backlog, and workshop facilitation so design and engineering could align on problem framing before solutioning accelerated.',
      ],
    },
    {
      title: 'Reflection',
      paragraphs: [
        'Career discovery is deeply human work. The best research outputs respect nuance—helping teams build with empathy while avoiding simplistic narratives about “what Gen Z wants.”',
      ],
    },
  ],
}
