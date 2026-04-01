import { Fragment, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Navigate, useParams } from 'react-router-dom'
import { CaseStudyBlocks } from '../components/CaseStudyBlocks'
import { SuggestedWorkCards } from '../components/SuggestedWorkCards'
import { CONTENT_REVISION, getCaseStudyBySlug } from '../data/content'
import type { CaseStudySubsection } from '../data/types'
import {
  useScrollProgress,
  useActiveSection,
  useScrollReveal,
  useReadingTime,
  useTocReveal,
  useHeroHidesCaseStudyToc,
} from '../hooks/useCaseStudyEffects'

function CaseStudySubsectionBody({
  sub,
  keyPrefix,
}: {
  sub: CaseStudySubsection
  keyPrefix: string
}) {
  return (
    <>
      {(sub.paragraphs ?? []).map((para, j) => {
        const text = typeof para === 'string' ? para : para.text
        const proseClass = typeof para === 'string' ? undefined : para.className
        return (
          <p
            key={`${keyPrefix}-p-${j}`}
            className={['cs-prose', proseClass].filter(Boolean).join(' ')}
          >
            {text}
          </p>
        )
      })}
      {sub.blocksBeforeBullets && sub.blocks && sub.blocks.length > 0 ? (
        <CaseStudyBlocks blocks={sub.blocks} />
      ) : null}
      {sub.bullets && sub.bullets.length > 0 ? (
        <ul className="cs-list">
          {sub.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {!sub.blocksBeforeBullets && sub.blocks && sub.blocks.length > 0 ? (
        <CaseStudyBlocks blocks={sub.blocks} />
      ) : null}
    </>
  )
}

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const study = slug ? getCaseStudyBySlug(slug) : undefined

  useEffect(() => {
    document.title = study
      ? `${study.title}, Jaison Thomas`
      : 'Not found, Jaison Thomas'
    return () => {
      document.title = 'Jaison Thomas, Portfolio'
    }
  }, [study])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (import.meta.env.DEV && study) {
      console.info('[portfolio] case study:', study.id, 'rev', CONTENT_REVISION)
    }
  }, [study])

  if (!study) return <Navigate to="/" replace />

  return <CaseStudyContent study={study} />
}

function CaseStudyContent({ study }: { study: NonNullable<ReturnType<typeof getCaseStudyBySlug>> }) {
  const hasContext = study.context.length > 0
  const metaLayout = study.metaLayout ?? 'grid4'
  const readingTime = useReadingTime(study)
  const scrollProgress = useScrollProgress()

  /** Major sections only: omit `sectionHeadingLevel === 3` (page uses `<h3>` for those). */
  const tocItems = useMemo(
    () => [
      ...(hasContext ? [{ id: 'context', label: 'Context' }] : []),
      ...study.sections
        .map((sec, i) => ({
          id: `section-${i}`,
          label: sec.title,
          omitFromToc: sec.sectionHeadingLevel === 3,
        }))
        .filter((item) => !item.omitFromToc)
        .map(({ id, label }) => ({ id, label })),
    ],
    [hasContext, study.sections],
  )

  const sectionIds = useMemo(
    () => [
      ...(hasContext ? ['context'] : []),
      ...study.sections.map((_, i) => `section-${i}`),
    ],
    [hasContext, study.sections],
  )
  const activeSection = useActiveSection(sectionIds)

  /** When scroll is inside an h3-only section, highlight the nearest preceding TOC (h2) section. */
  const activeTocId = useMemo(() => {
    if (!activeSection) return ''
    if (activeSection === 'context') return 'context'
    const m = activeSection.match(/^section-(\d+)$/)
    if (!m) return activeSection
    let idx = parseInt(m[1], 10)
    while (idx >= 0) {
      const sec = study.sections[idx]
      if (sec && sec.sectionHeadingLevel !== 3) return `section-${idx}`
      idx -= 1
    }
    return activeSection
  }, [activeSection, study.sections])
  useScrollReveal()

  const tocRevealId = useMemo(() => {
    if (study.sections.length === 0) return null
    const overviewIndex = study.sections.findIndex((s) => s.title === 'Project Overview')
    return overviewIndex >= 0 ? `section-${overviewIndex}` : 'section-0'
  }, [study.sections])

  const tocRevealed = useTocReveal(tocRevealId, study.id)
  const heroHidesToc = useHeroHidesCaseStudyToc('header.cs-hero', study.id)
  const tocShown = tocRevealed && !heroHidesToc

  useEffect(() => {
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (!ogTitle) {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:title')
      m.content = `${study.title}, Jaison Thomas`
      document.head.appendChild(m)
    } else {
      ogTitle.setAttribute('content', `${study.title}, Jaison Thomas`)
    }
    if (!ogDesc) {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:description')
      m.content = study.description
      document.head.appendChild(m)
    } else {
      ogDesc.setAttribute('content', study.description)
    }
  }, [study])

  const tocSidebar = (
    <aside
      className={`cs-sidebar${tocShown ? ' cs-sidebar--visible' : ''}`}
      aria-hidden={!tocShown}
      inert={!tocShown}
    >
      <div className="cs-toc-wrap">
        <nav className="cs-toc" aria-label="Jump to section">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`cs-toc-link${activeTocId === item.id ? ' active' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <span className="cs-reading-time">{readingTime} min read</span>
        </nav>
      </div>
    </aside>
  )

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="cs-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {createPortal(tocSidebar, document.body)}

      <main id="main" className="cs" data-content-revision={CONTENT_REVISION}>
        <div className="cs-layout">
          <div className="cs-main">
            {/* Hero (no TOC) */}
            <header className="cs-hero">
              {study.tag ? <span className="cs-eyebrow">{study.tag}</span> : null}
              <h1 className="cs-title">{study.title}</h1>
              <p className="cs-subtitle">{study.description}</p>

              {study.heroArt && study.heroArt.length > 0 ? (
                <div
                  className={`cs-hero-art${study.heroArtLayout === 'wide' ? ' cs-hero-art--wide-layout' : ''}`}
                >
                  {study.heroArt.map((art) =>
                    study.heroArtLayout === 'wide' ? (
                      <figure key={art.src} className="cs-hero-wide">
                        <img
                          src={art.src}
                          alt={art.alt}
                          className="cs-hero-wide-img"
                          loading="eager"
                          decoding="async"
                        />
                      </figure>
                    ) : (
                      <div key={art.src} className="cs-phone-frame cs-phone-frame--hero">
                        <img
                          src={art.src}
                          alt={art.alt}
                          className="cs-phone-frame-img"
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                    ),
                  )}
                </div>
              ) : null}

              {metaLayout === 'strip3' ? (
                <dl className="cs-meta">
                  <div className="cs-meta-item">
                    <dt>My Role</dt>
                    <dd>{study.role}</dd>
                  </div>
                  <div className="cs-meta-item">
                    <dt>Team</dt>
                    <dd>{study.meta.team ?? study.meta.collaboration}</dd>
                  </div>
                  <div className="cs-meta-item">
                    <dt>Timeline</dt>
                    <dd>{study.meta.timeline}</dd>
                  </div>
                </dl>
              ) : (
                <dl className="cs-meta">
                  <div className="cs-meta-item">
                    <dt>Industry</dt>
                    <dd>{study.meta.industry}</dd>
                  </div>
                  <div className="cs-meta-item">
                    <dt>Timeline</dt>
                    <dd>{study.meta.timeline}</dd>
                  </div>
                  <div className="cs-meta-item">
                    <dt>My Role</dt>
                    <dd>{study.role}</dd>
                  </div>
                  <div className="cs-meta-item">
                    <dt>Collaboration</dt>
                    <dd>{study.meta.collaboration}</dd>
                  </div>
                </dl>
              )}
            </header>

            {/* Context */}
            {hasContext ? (
              <section id="context" className="cs-section">
                <h2 className="cs-section-title">Context</h2>
                {study.context.map((para, i) => (
                  <p key={`ctx-${i}`} className="cs-prose">{para}</p>
                ))}
              </section>
            ) : null}

            {/* Main sections */}
            {study.sections.map((sec, i) => {
              const proseBlocksSplit =
                sec.sectionLayout === 'proseBlocksSplit' &&
                (sec.paragraphs?.length ?? 0) > 0 &&
                (sec.blocks?.length ?? 0) > 0 &&
                !sec.blocksBeforeBullets

              const SectionHeadingTag = sec.sectionHeadingLevel === 3 ? 'h3' : 'h2'
              const sectionTitleClass =
                sec.sectionHeadingLevel === 3
                  ? 'cs-section-title cs-section-title--h3'
                  : 'cs-section-title'

              return (
                <Fragment key={sec.title}>
                  <section
                    id={`section-${i}`}
                    className={
                      proseBlocksSplit ? 'cs-section cs-section--prose-blocks-split' : 'cs-section'
                    }
                  >
                    <SectionHeadingTag className={sectionTitleClass}>{sec.title}</SectionHeadingTag>
                    {proseBlocksSplit ? (
                      <>
                        <div className="cs-section-prose-blocks">
                          <div className="cs-section-prose-blocks__copy">
                            {(sec.paragraphs ?? []).map((para, j) => {
                              const text = typeof para === 'string' ? para : para.text
                              const proseClass =
                                typeof para === 'string' ? undefined : para.className
                              return (
                                <p
                                  key={`${sec.title}-p-${j}`}
                                  className={['cs-prose', proseClass].filter(Boolean).join(' ')}
                                >
                                  {text}
                                </p>
                              )
                            })}
                          </div>
                          <div className="cs-section-prose-blocks__blocks">
                            <CaseStudyBlocks blocks={sec.blocks ?? []} />
                          </div>
                        </div>
                        {sec.bullets && sec.bullets.length > 0 ? (
                          <ul className="cs-list">
                            {sec.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {(sec.paragraphs ?? []).map((para, j) => {
                          const text = typeof para === 'string' ? para : para.text
                          const proseClass =
                            typeof para === 'string' ? undefined : para.className
                          return (
                            <p
                              key={`${sec.title}-p-${j}`}
                              className={['cs-prose', proseClass].filter(Boolean).join(' ')}
                            >
                              {text}
                            </p>
                          )
                        })}
                        {sec.blocksBeforeBullets && sec.blocks && sec.blocks.length > 0 ? (
                          <CaseStudyBlocks blocks={sec.blocks} />
                        ) : null}
                        {sec.bullets && sec.bullets.length > 0 ? (
                          <ul className="cs-list">
                            {sec.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                        {!sec.blocksBeforeBullets && sec.blocks && sec.blocks.length > 0 ? (
                          <CaseStudyBlocks blocks={sec.blocks} />
                        ) : null}
                      </>
                    )}
                    {(sec.subsections ?? []).map((sub, si) => (
                      <div key={`${sec.title}-sub-${si}`} className="cs-subsection">
                        <h3
                          id={`section-${i}-sub-${si}`}
                          className="cs-section-subtitle"
                          tabIndex={-1}
                        >
                          {sub.title}
                        </h3>
                        <CaseStudySubsectionBody sub={sub} keyPrefix={`${sec.title}-sub-${si}`} />
                      </div>
                    ))}
                  </section>
                </Fragment>
              )
            })}

            <SuggestedWorkCards excludeId={study.id} />
          </div>
        </div>
      </main>
    </>
  )
}
