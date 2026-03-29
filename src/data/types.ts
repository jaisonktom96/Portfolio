export type Project = {
  id: string
  title: string
  description: string
  tag?: string
  company?: string
  year?: string
}

export type KeyMetric = {
  value: string
  label: string
}

/** Structured content blocks for long-form case studies */
export type CaseStudyBlock =
  | {
      type: 'figure'
      src: string
      alt: string
      caption?: string
      size?: 'small' | 'medium'
      /** Crop away this fraction from the top (e.g. 25 = hide top 25%, show bottom 75%) */
      cropTopPercent?: number
      /** Border radius in px; with crop, applied via clip-path `round` */
      radius?: number
      /** When true, render in grayscale (opt-in; site default is full color) */
      grayscale?: boolean
    }
  | {
      type: 'figureRow'
      items: { src: string; alt: string; caption?: string; grayscale?: boolean }[]
      caption?: string
    }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'callout'; title: string; intro?: string; bullets?: string[] }
  | {
      type: 'cardRow'
      cards: { title: string; body: string; imageSrc?: string; imageAlt?: string; grayscale?: boolean }[]
    }
  | {
      type: 'researchCardRow'
      cards: {
        title: string
        subtitle: string
        stats: { text: string; icon?: 'user' | 'city' | 'site' }[]
      }[]
    }
  | {
      type: 'insightPhases'
      phases: { label: string; cards: { title: string; body: string }[] }[]
    }
  | {
      type: 'personaPair'
      personas: { name: string; imageSrc: string; alt: string; grayscale?: boolean }[]
    }
  | {
      type: 'solutionFeature'
      title: string
      bullet: string
      images: { src: string; alt: string; grayscale?: boolean }[]
    }
  | {
      type: 'beforeAfter'
      title?: string
      before: { src: string; alt: string; label?: string; grayscale?: boolean }
      after: { src: string; alt: string; label?: string; grayscale?: boolean }
    }
  | {
      type: 'linkList'
      title?: string
      intro?: string
      items: { label: string; href: string }[]
    }

export type CaseStudyMeta = {
  industry: string
  timeline: string
  scope: string
  collaboration: string
  /** Shown as "Team" when using Figma strip layout */
  team?: string
}

export type CaseStudySection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  blocks?: CaseStudyBlock[]
  /** When true, render blocks after paragraphs and before bullets (default: bullets before blocks). */
  blocksBeforeBullets?: boolean
}

export type CaseStudyDetail = Project & {
  summary: string
  /** Opening context, multiple short paragraphs */
  context: string[]
  role: string
  meta: CaseStudyMeta
  keyMetrics: KeyMetric[]
  sections: CaseStudySection[]
  /** Optional hero art (e.g. Figma phone mockups) */
  heroArt?: { src: string; alt: string }[]
  /** `wide` = landscape dashboard frame; default matches MagicDiary phone mockups */
  heroArtLayout?: 'phone' | 'wide'
  /** `strip3` = My role / Team / Timeline (Figma case study header) */
  metaLayout?: 'grid4' | 'strip3'
  /** Optional link to an external write-up or archive */
  referenceUrl?: string
  referenceLabel?: string
  /** Matching frame in the Figma Portfolio file */
  figmaDesignUrl?: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export type OutsideWorkImage = {
  src: string
  alt: string
}

export type OutsideWorkItem = {
  title: string
  description: string
  /** Circular thumbnails; lightbox navigates within this list */
  images: OutsideWorkImage[]
}

export type WritingEntry = {
  title: string
  date: string
  summary: string
  href?: string
  note?: string
}

export type AboutContent = {
  headline: string
  paragraphs: string[]
}
