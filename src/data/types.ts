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

/** Table cell: plain text or a tool name + screenshot thumbnail (opens lightbox). */
export type CaseStudyTableCell =
  | string
  | {
      kind: 'toolThumb'
      label: string
      src: string
      alt: string
      grayscale?: boolean
    }

/** Structured content blocks for long-form case studies */
export type CaseStudyBlock =
  | {
      type: 'figure'
      src: string
      alt: string
      caption?: string
      /** When `prose`, caption uses body paragraph typography (same as .cs-prose). Default is smaller muted caption. */
      captionTone?: 'default' | 'prose'
      size?: 'small' | 'medium'
      /** Crop away this fraction from the top (e.g. 25 = hide top 25%, show bottom 75%) */
      cropTopPercent?: number
      /** Border radius in px; with crop, applied via clip-path `round` */
      radius?: number
      /** When true, render in grayscale (opt-in; site default is full color) */
      grayscale?: boolean
      /** When true, skip hover scale/filter and prefer crisp browser scaling (dense screenshots). */
      preserveImageQuality?: boolean
    }
  | {
      type: 'figureRow'
      items: { src: string; alt: string; caption?: string; grayscale?: boolean }[]
      caption?: string
    }
  | { type: 'table'; caption?: string; headers: string[]; rows: CaseStudyTableCell[][] }
  /** Numbered list (same width/typography as .cs-list) */
  | { type: 'orderedList'; items: string[] }
  /** Inline section prose (same styling as section paragraphs); use to interleave copy with figures/blocks */
  | { type: 'proseBlock'; text: string; className?: string }
  | { type: 'callout'; title: string; intro?: string; bullets?: string[] }
  | {
      type: 'cardRow'
      cards: { title: string; body: string; imageSrc?: string; imageAlt?: string; grayscale?: boolean }[]
      /** Three-up gradient metric tiles (survey stats row) */
      variant?: 'metrics'
      /** When true, body-only tiles (no h3); titles still used for keys / image alt */
      hideTitles?: boolean
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
      /** When `prose`, title uses body copy typography (same as .cs-prose); default is display heading. */
      titleTone?: 'default' | 'prose'
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

/** Plain string or `{ text, className }` for styled lead paragraphs (e.g. rounded panel). */
export type CaseStudyParagraph = string | { text: string; className?: string }

/** h3 group inside a case study section (e.g. phases under “Usability testing”) */
export type CaseStudySubsection = {
  title: string
  paragraphs?: CaseStudyParagraph[]
  bullets?: string[]
  blocks?: CaseStudyBlock[]
  blocksBeforeBullets?: boolean
}

export type CaseStudySection = {
  title: string
  paragraphs?: CaseStudyParagraph[]
  bullets?: string[]
  blocks?: CaseStudyBlock[]
  /** When true, render blocks after paragraphs and before bullets (default: bullets before blocks). */
  blocksBeforeBullets?: boolean
  /**
   * Prose in the left column, blocks in the right (desktop). Stacks on narrow viewports.
   * Use when a section has both `paragraphs` and `blocks` (no `blocksBeforeBullets`).
   */
  sectionLayout?: 'proseBlocksSplit'
  /** Nested h3 + body (rendered after top-level paragraphs/bullets/blocks). */
  subsections?: CaseStudySubsection[]
  /** Section title tag; `3` uses h3 + smaller title style (e.g. steps under a design chapter). Default `2`. */
  sectionHeadingLevel?: 2 | 3
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
