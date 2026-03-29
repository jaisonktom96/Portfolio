import type { CaseStudyDetail } from '../types'
import { magicDiaryAssets as A } from '../figma/magicDiaryAssets'

/** MagicDiary — Magicbricks site-visit experience. Copy, structure, and assets aligned to Figma frame 2607:1321. */
export const magicdiary: CaseStudyDetail = {
  id: 'magicdiary',
  title: 'MagicDiary',
  description:
    'From 15% to 70% Retention: A User-Centric Redesign that Unlocked 10x Revenue',
  tag: 'First in industry.',
  company: 'Magicbricks',
  year: '2023',
  figmaDesignUrl:
    'https://www.figma.com/design/5BXKUo563G7chsvPVxTpxy/Portfolio?node-id=2607-1321&m=dev',
  metaLayout: 'strip3',
  heroArt: [
    {
      src: A.heroIsometric,
      alt: 'MagicDiary hero illustration — property search and site visits',
    },
    {
      src: A.heroDevice,
      alt: 'MagicDiary on a phone inside the Magicbricks experience',
    },
  ],
  summary:
    'Magicbricks ran a premium site-visit service—managed cabs to properties and back—but roughly 85% of buyers dropped off after the first visit. I led research, synthesis, prioritization, and UI for MagicDiary: a mini-app inside Magicbricks that gave buyers structure, checklists, comparisons, and confidence. Retention rose from 15% to 70%; the service later scaled to 7+ cities with 75,000+ visits, 7,500+ buyers, and roughly 50% faster decision-making for buyers.',
  context: [],
  role:
    'Primary research (shadowing, user interviews), synthesis, analysis, persona creation, journey mapping, problem definition, feature prioritization, UI design, prototyping, and usability testing.',
  meta: {
    industry: 'Real estate / proptech — Magicbricks (India)',
    timeline: '3 months',
    scope:
      'End-to-end site-visit experience: research, prioritization, mini-app UX/UI embedded in Magicbricks',
    collaboration: 'Product designer, UX researcher, Head of Design, and cross-functional product/engineering partners',
    team: 'Myself, Product designer, UX Researcher and Head of design',
  },
  keyMetrics: [
    { value: '15% → 70%', label: 'User retention after first visit' },
    { value: '7+ cities', label: 'Service scale after redesign' },
    { value: '~50%', label: 'Reduction in buyer decision-making time (stated impact)' },
  ],
  referenceUrl: 'https://unwilling-chimpanzee-98d31.rehost.site/MagicDiary',
  referenceLabel: 'Archived case study write-up (rehost)',
  sections: [
    {
      title: 'Project Overview',
      paragraphs: [
        'Magicbricks offered a premium site visit service: a free, managed cab to take buyers to properties and drop them back home. But it had a critical “leaky bucket” problem: an 85% user drop-off after the first visit.',
        'Our team prioritized fixing this retention issue over the challenge of user acquisition. I was tasked with redesigning the on-visit experience to build user confidence and provide tangible value. The resulting tool, MagicDiary, successfully increased user retention from 15% to 70% and enabled the service to later scale to 7+ cities.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.overviewCabPhoto,
          alt: 'Managed cab site-visit service — buyer and vehicle at a property',
          cropTopPercent: 25,
          radius: 9,
        },
        {
          type: 'callout',
          title: 'Why is it worth solving?',
          intro: 'A home buyer who physically visits a property is:',
          bullets: [
            '17× more likely to make a booking than a regular user',
            'Generates 10× more revenue for Magicbricks than a regular lead (who visited the project dossier page). These were, by far, our most valuable leads.',
          ],
        },
      ],
    },
    {
      title: 'Our Initial Hypothesis',
      paragraphs: [
        'Our investigation began with a broad hypothesis centered on logistical friction. We assumed the primary difficulty about visit sites was that the process itself was a tiring, multi-month deal. We believed the main problems were:',
      ],
      blocks: [
        {
          type: 'cardRow',
          cards: [
            {
              title: 'Shortlisting & Coordination',
              body: 'The overwhelming task of shortlisting and coordinating with numerous builders.',
            },
            {
              title: 'Managing logistics',
              body: 'The sheer exhaustion of dedicating entire weekends to travel and visits.',
            },
            {
              title: 'Long decisioning time',
              body: 'The difficulty of managing a complex process over a long period leading to long decisioning time.',
            },
          ],
        },
      ],
    },
    {
      title: 'How we approached the problem',
      paragraphs: [
        'We had to understand the chaotic reality of the existing site visit service. We followed a rigorous, multi-phase research strategy.',
        'Our approach combined deep qualitative observation with quantitative validation. Qualitative research was done in two phases.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.fieldResearchWide,
          alt: 'Field research — observing real site visits and buyer behavior',
        },
        {
          type: 'researchCardRow',
          cards: [
            {
              title: 'Shadowing',
              subtitle: 'To understand the real picture of the current service.',
              stats: [
                { text: '9 buyers', icon: 'user' },
                { text: '2 cities', icon: 'city' },
                { text: '34 sites', icon: 'site' },
              ],
            },
            {
              title: 'Contextual Inquiry',
              subtitle: 'To understand the pain points faced by users in detail.',
              stats: [
                { text: '11 buyers', icon: 'user' },
                { text: '2 cities', icon: 'city' },
                { text: '29 sites', icon: 'site' },
              ],
            },
            {
              title: 'Feature validation',
              subtitle: 'To get input for prioritization.',
              stats: [
                { text: '11 buyers', icon: 'user' },
                { text: '2 cities', icon: 'city' },
                { text: '29 sites', icon: 'site' },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Major insights',
      paragraphs: [
        'Issues clustered into pre-visit, during visit, and after visit—spanning communication, accuracy, waits, knowledge gaps, and emotional barriers to telling the relationship manager the truth.',
      ],
      blocks: [
        {
          type: 'insightPhases',
          phases: [
            {
              label: 'Pre-visit',
              cards: [
                {
                  title: 'Lack of itinerary communication',
                  body: 'Drivers and buyers were unaware of the next destination. No clear point of contact (POC) for location information.',
                },
                {
                  title: 'Inaccurate locations',
                  body: 'Sales office location was provided incorrectly, causing confusion.',
                },
                {
                  title: 'Transportation & scheduling delays',
                  body: 'Cab cancellations leading to significant rescheduling delays (e.g., 30 minutes). General cab delays (e.g., 10 minutes).',
                },
                {
                  title: 'Buyer–sales communication barriers',
                  body: 'First-time buyers were uninformed about the site visit process. Language barriers existed between buyers and sales personnel.',
                },
              ],
            },
            {
              label: 'During visit',
              cards: [
                {
                  title: 'Lack of knowledge on what to check',
                  body: 'New buyers didn’t know what to check at a site during a visit.',
                },
                {
                  title: 'Unfamiliar technical terms',
                  body: 'Terms like BDR, RERA, UDS (land ownership) were unclear.',
                },
                {
                  title: 'Less info to negotiate confidently',
                  body: "Buyer didn't have information on average maintenance charge/average charges across properties in the locality in order to confidently negotiate.",
                },
                {
                  title: 'Repetitive processes at each site',
                  body: "All buyers expressed frustration in entering their requirements again at the site, even though they have already shared with MB. In some cases, buyer didn't even get a seat while entering data.",
                },
                {
                  title: 'Long wait time at sales office',
                  body: 'Buyer checked the 3D models of the project, listened to other people\'s conversations with other agents.',
                },
                {
                  title: 'Language barrier',
                  body: 'Between buyer and salesperson. Buyer had to wait till sales personnel switched.',
                },
                {
                  title: 'Not able to visit the site',
                  body: 'Sales person not available to show the site.',
                },
                {
                  title: 'Repeated questions',
                  body: 'Sales person asking the same question again which he had already filled.',
                },
              ],
            },
            {
              label: 'After visit',
              cards: [
                {
                  title: 'Uncertainty on next steps',
                  body: 'Uncertainty about next locations and return time.',
                },
                {
                  title: 'Hesitation giving honest feedback',
                  body: 'Hesitation telling the relationship manager when a property was a poor fit.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Contextual inquiry & quick concepts',
      paragraphs: [
        'On long cab rides between sites (Bengaluru traffic helped), we built rapport and gathered richer detail. We did not reveal our full identity to builders where needed, to observe how buyers were treated.',
        'To validate direction fast, I printed a simple checklist and gave it to buyers in the cab. People read it carefully, brought it on-site, and marked opinions—strong evidence that structured guidance was the right anchor for the product.',
      ],
      blocks: [
        {
          type: 'figureRow',
          items: [
            { src: A.checklistBlank, alt: 'Printed site visit checklist' },
            { src: A.checklistInUse, alt: 'Buyer using a printed checklist during a site visit' },
          ],
          caption: 'Printed checklist · We saw buyers thoroughly reading the checklist and marking comments on-site.',
        },
      ],
    },
    {
      title: 'Data to Direction',
      paragraphs: [
        'To translate qualitative field notes into a prioritized roadmap, we balanced stated desires with observed behaviors through a two-pronged analysis:',
        'Feature Validation (Stated): Used a modified MoSCoW method to identify "Documenting Notes" and "Providing Feedback" as critical must-haves for reducing process chaos.',
        'Behavioral Analysis (Observed): Uncovered implicit needs by quantifying field observations through frequency analysis, pairwise comparisons, and weighted priority scoring.',
      ],
      blocks: [
        {
          type: 'cardRow',
          cards: [
            {
              title: 'Stated preference',
              body: 'What users said they wanted (MoSCoW-style validation).',
              imageSrc: A.statedPreference,
              imageAlt: 'What users said they wanted — stated preference (MoSCoW-style validation)',
            },
            {
              title: 'Frequency analysis',
              body: 'Tallied how often users faced certain issues.',
              imageSrc: A.frequencyChart,
              imageAlt: 'Frequency analysis chart across observed site visits',
            },
            {
              title: 'Relative importance',
              body: 'Pairwise comparison matrix to derive weights.',
              imageSrc: A.pairwiseChart,
              imageAlt: 'Pairwise comparison matrix for relative importance',
            },
            {
              title: 'Weighted priority score',
              body: 'Multiplied the frequency of each need by its importance weight.',
              imageSrc: A.weightedChart,
              imageAlt: 'Weighted priority scores for user requirements',
            },
          ],
        },
      ],
    },
    {
      title: 'Personas',
      paragraphs: [
        'We clearly identified two personas from our research synthesis.',
      ],
      blocks: [
        {
          type: 'personaPair',
          personas: [
            {
              name: 'Explorer Rohit',
              imageSrc: A.personaRohit,
              alt: 'Explorer Rohit — anxious, first-time buyer persona',
            },
            {
              name: 'Decisive Rajan',
              imageSrc: A.personaRajan,
              alt: 'Decisive Rajan — efficient, experienced buyer persona',
            },
          ],
        },
      ],
    },
    {
      title: 'Problem definition',
      paragraphs: [
        'Home buyers on site visits need a structured and trustworthy way to capture, evaluate, and compare properties because the current process is chaotic and relies on memory and biased information, which erodes their confidence and prevents them from making a high-stakes decision.',
      ],
    },
    {
      title: 'System flow',
      blocks: [
        {
          type: 'figure',
          src: A.systemFlow,
          alt: 'End-to-end system flow for MagicDiary within Magicbricks',
        },
        {
          type: 'figure',
          src: A.systemFlowSecondary,
          alt: 'Supporting flow and touchpoints across the service',
        },
      ],
    },
    {
      title: 'Solution',
      paragraphs: [
        'MagicDiary shipped as a mini-app inside Magicbricks. The home experience surfaced scheduled and completed visits; a guided checklist helped buyers know what to check and record opinions; adjacent capabilities supported reviews, distances, comparison, and deep project details.',
      ],
      blocks: [
        {
          type: 'solutionFeature',
          title: 'Embedded mini-app',
          bullet: 'User opens a mini-app inside Magicbricks called MagicDiary.',
          images: [
            { src: A.miniAppHomeA, alt: 'MagicDiary home — scheduled visits' },
            { src: A.miniAppHomeB, alt: 'MagicDiary home — completed visits' },
          ],
        },
        {
          type: 'solutionFeature',
          title: 'Project reviews',
          bullet: 'Users read reviews from others who have already visited the site.',
          images: [
            { src: A.reviewsA, alt: 'Project reviews screen' },
            { src: A.reviewsB, alt: 'Reviews detail' },
          ],
        },
        {
          type: 'solutionFeature',
          title: 'Check distances',
          bullet:
            'Users add frequent places (e.g. school, office) and see distance from the property.',
          images: [
            { src: A.distanceA, alt: 'Distance from frequent places' },
            { src: A.distanceB, alt: 'Distance comparison' },
          ],
        },
        {
          type: 'solutionFeature',
          title: 'Compare properties',
          bullet: 'Users compare multiple properties to decide what to pursue next.',
          images: [
            { src: A.compareA, alt: 'Compare properties — screen 1' },
            { src: A.compareB, alt: 'Compare properties — screen 2' },
            { src: A.compareC, alt: 'Compare properties — screen 3' },
          ],
        },
        {
          type: 'solutionFeature',
          title: 'View project details',
          bullet:
            'RERA, pricing, amenities, builder information, payment plans, and more.',
          images: [
            { src: A.detailsA, alt: 'Project dossier — overview' },
            { src: A.detailsB, alt: 'Project dossier — details' },
            { src: A.detailsC, alt: 'Project dossier — plans' },
          ],
        },
      ],
    },
    {
      title: 'Impact',
      paragraphs: [
        'The work coincided with substantial operational scale and buyer outcomes: 75,000+ site visits completed, expansion to 7+ cities, 7,500+ buyers served, and a reported ~50% reduction in buyer decision-making time—alongside the retention lift from 15% to 70% that made the service viable to grow.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.impactPhoto,
          alt: 'Impact summary — scale and outcomes',
        },
        {
          type: 'figure',
          src: A.impactSecondary,
          alt: 'Service growth and buyer outcomes',
        },
      ],
    },
  ],
}
