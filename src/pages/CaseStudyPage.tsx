import { Fragment, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CaseStudyBlocks } from '../components/CaseStudyBlocks'
import { CONTACT_EMAIL, CONTENT_REVISION, getCaseStudyBySlug } from '../data/content'
import {
  useScrollProgress,
  useActiveSection,
  useScrollReveal,
  useReadingTime,
  useTocReveal,
  useHeroHidesCaseStudyToc,
} from '../hooks/useCaseStudyEffects'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const study = slug ? getCaseStudyBySlug(slug) : undefined

  useEffect(() => {
    document.title = study
      ? `${study.title} — Jaison Thomas`
      : 'Not found — Jaison Thomas'
    return () => {
      document.title = 'Jaison Thomas — Portfolio'
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

  const tocItems = useMemo(
    () => [
      ...(hasContext ? [{ id: 'context', label: 'Context' }] : []),
      ...study.sections.map((sec, i) => ({ id: `section-${i}`, label: sec.title })),
    ],
    [hasContext, study.sections],
  )

  const sectionIds = useMemo(() => tocItems.map((t) => t.id), [tocItems])
  const activeSection = useActiveSection(sectionIds)
  useScrollReveal()

  const tocRevealId = useMemo(() => {
    if (study.sections.length === 0) return null
    const overviewIndex = study.sections.findIndex(
      (s) => s.title === 'Project Overview' || s.title === 'MoEngage Flow Analytics',
    )
    return overviewIndex >= 0 ? `section-${overviewIndex}` : 'section-0'
  }, [study.sections])

  const tocRevealed = useTocReveal(tocRevealId, study.id)
  const heroHidesToc = useHeroHidesCaseStudyToc('header.cs-hero', study.id)
  const tocShown = tocRevealed && !heroHidesToc

  const hasProjectOverview = study.sections.some(
    (s) => s.title === 'Project Overview' || s.title === 'MoEngage Flow Analytics',
  )

  const keyOutcomes = (
    <div className="cs-intro cs-intro--key-outcomes">
      <ul className="cs-metrics" aria-label="Key outcomes">
        {study.keyMetrics.map((m) => (
          <li key={m.label} className="cs-metric">
            <span className="cs-metric-value">{m.value}</span>
            <span className="cs-metric-label">{m.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  useEffect(() => {
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (!ogTitle) {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:title')
      m.content = `${study.title} — Jaison Thomas`
      document.head.appendChild(m)
    } else {
      ogTitle.setAttribute('content', `${study.title} — Jaison Thomas`)
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
              className={`cs-toc-link${activeSection === item.id ? ' active' : ''}`}
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
              <nav className="cs-breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true"> / </span>
                <Link to="/#work">Work</Link>
                <span aria-hidden="true"> / </span>
                <span>{study.title}</span>
              </nav>

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
                    <dt>Timeline</dt>
                    <dd>{study.meta.timeline}</dd>
                  </div>
                  <div className="cs-meta-item">
                    <dt>My Role</dt>
                    <dd>{study.role}</dd>
                  </div>
                  <div className="cs-meta-item">
                    <dt>Team</dt>
                    <dd>{study.meta.team ?? study.meta.collaboration}</dd>
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
            {study.sections.map((sec, i) => (
              <Fragment key={sec.title}>
                <section id={`section-${i}`} className="cs-section">
                  <h2 className="cs-section-title">{sec.title}</h2>
                  {(sec.paragraphs ?? []).map((para, j) => (
                    <p key={`${sec.title}-p-${j}`} className="cs-prose">{para}</p>
                  ))}
                  {sec.bullets && sec.bullets.length > 0 ? (
                    <ul className="cs-list">
                      {sec.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {sec.title === 'Project Overview' || sec.title === 'MoEngage Flow Analytics'
                    ? keyOutcomes
                    : null}
                  {sec.blocks && sec.blocks.length > 0 ? (
                    <CaseStudyBlocks blocks={sec.blocks} />
                  ) : null}
                </section>
                {!hasProjectOverview && i === 0 ? keyOutcomes : null}
              </Fragment>
            ))}

            {/* Footer links */}
            {study.figmaDesignUrl || study.referenceUrl ? (
              <div className="cs-footer-links">
                {study.figmaDesignUrl ? (
                  <a href={study.figmaDesignUrl} className="cs-btn" target="_blank" rel="noreferrer">
                    Open in Figma
                  </a>
                ) : null}
                {study.referenceUrl ? (
                  <a href={study.referenceUrl} className="cs-btn cs-btn--outline" target="_blank" rel="noreferrer">
                    {study.referenceLabel ?? 'External write-up'}
                  </a>
                ) : null}
              </div>
            ) : null}

            {/* CTA Section */}
            <section className="cs-cta-section">
              <h2 className="cs-cta-heading">Interested in working together?</h2>
              <p className="cs-cta-body">
                I am always open to discussing product design, research partnerships, or new opportunities.
              </p>
              <a className="cs-cta-btn" href={`mailto:${CONTACT_EMAIL}`}>
                Get in touch
              </a>
            </section>

            <div className="cs-back">
              <Link className="cs-back-link" to="/#work">
                ← Back to all work
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
