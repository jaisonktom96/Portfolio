import { useState, useEffect, useMemo } from 'react'
import type { CaseStudyDetail } from '../data/types'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

/**
 * TOC fades in only after the user scrolls past the hero (min scroll) and the trigger
 * section (e.g. Project Overview) intersects the viewport. Stays true once shown.
 * Resets when `resetKey` changes (e.g. case study id).
 */
export function useTocReveal(triggerSectionId: string | null, resetKey: string): boolean {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setRevealed(false)
    if (!triggerSectionId) return

    /** Pixels scrolled before we allow the TOC to appear (keeps hero TOC-free). */
    const MIN_SCROLL_BEFORE_REVEAL = 140

    const tryReveal = () => {
      const el = document.getElementById(triggerSectionId)
      if (!el) return

      const rect = el.getBoundingClientRect()
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const vh = window.innerHeight

      // Deep link / mid-page load: section already above the fold
      if (rect.bottom <= 0) {
        setRevealed(true)
        return
      }

      if (scrollY < MIN_SCROLL_BEFORE_REVEAL) return

      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        setRevealed(true)
      }
    }

    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(tryReveal)
    })
    const delayed = window.setTimeout(tryReveal, 250)

    window.addEventListener('scroll', tryReveal, { passive: true })
    window.addEventListener('resize', tryReveal, { passive: true })
    window.addEventListener('hashchange', tryReveal)

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      window.clearTimeout(delayed)
      window.removeEventListener('scroll', tryReveal)
      window.removeEventListener('resize', tryReveal)
      window.removeEventListener('hashchange', tryReveal)
    }
  }, [triggerSectionId, resetKey])

  return revealed
}

/**
 * True while the case study hero is still in the upper viewport ("viewing hero").
 * Used to fade the TOC out when the user scrolls back up to the hero.
 */
export function useHeroHidesCaseStudyToc(heroSelector: string, resetKey: string): boolean {
  const [heroHidesToc, setHeroHidesToc] = useState(true)

  useEffect(() => {
    setHeroHidesToc(true)

    const check = () => {
      const hero = document.querySelector(heroSelector)
      if (!hero) {
        setHeroHidesToc(false)
        return
      }
      const rect = hero.getBoundingClientRect()
      const vh = window.innerHeight
      const inHero = rect.bottom > 48 && rect.top < vh * 0.72
      setHeroHidesToc(inHero)
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [heroSelector, resetKey])

  return heroHidesToc
}

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState('')
  const ids = useMemo(() => sectionIds, [sectionIds.join(',')])

  useEffect(() => {
    if (ids.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}

export function useScrollReveal(): void {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('in-view')
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -32px 0px' },
    )
    requestAnimationFrame(() => {
      document
        .querySelectorAll(
          '.cs-section, .cs-intro, .case-blocks > *, .cs-metric, .cs-hero-art, .cs-more-work',
        )
        .forEach((el) => observer.observe(el))
    })
    return () => observer.disconnect()
  }, [])
}

export function useReadingTime(study: CaseStudyDetail): number {
  return useMemo(() => {
    let words = 0
    const count = (s: string) => s.split(/\s+/).filter(Boolean).length
    words += count(study.summary)
    for (const p of study.context) words += count(p)
    for (const sec of study.sections) {
      for (const p of sec.paragraphs ?? []) words += count(p)
      for (const b of sec.bullets ?? []) words += count(b)
      for (const block of sec.blocks ?? []) {
        if (block.type === 'callout') {
          if (block.intro) words += count(block.intro)
          for (const b of block.bullets ?? []) words += count(b)
        }
        if (block.type === 'cardRow')
          for (const c of block.cards) words += count(c.title) + count(c.body)
        if (block.type === 'researchCardRow')
          for (const c of block.cards) words += count(c.title) + count(c.subtitle)
        if (block.type === 'insightPhases')
          for (const ph of block.phases)
            for (const c of ph.cards) words += count(c.title) + count(c.body)
        if (block.type === 'solutionFeature')
          words += count(block.title) + count(block.bullet)
      }
    }
    return Math.max(1, Math.ceil(words / 200))
  }, [study])
}
