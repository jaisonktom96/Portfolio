import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  aboutContent,
  CONTACT_EMAIL,
  LEGACY_PORTFOLIO_URL,
  projects,
  testimonials,
  writingsContent,
} from '../data/content'
import {
  figmaHeroBg,
  figmaLockIcon,
  figmaStarIcon,
  FIGMA_FILE,
  projectCardImages,
} from '../data/figmaAssets'
import '../styles/home-figma.css'

export function Home() {
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash, location.pathname])

  return (
    <main id="main" className="figma-home">
      <section className="figma-hero" aria-labelledby="hero-title">
        <div
          className="figma-hero-bg"
          style={{ backgroundImage: `url(${figmaHeroBg})` }}
          aria-hidden="true"
        />
        <div className="figma-hero-content">
          <p className="figma-hero-greeting">Hey, I'm Jaison Thomas</p>
          <h1 id="hero-title" className="figma-hero-title">
            Product Designer
          </h1>
          <p className="figma-hero-intro">
            I design human-centered systems for engagement, analytics, and journeys — previously at Magicbricks and MoEngage.
          </p>
        </div>
      </section>

      <section id="work" className="figma-works" aria-labelledby="works-heading">
        <p className="figma-works-eyebrow">My Works</p>
        <div className="figma-works-head">
          <h2 id="works-heading">My Works</h2>
          <span className="figma-works-line" aria-hidden="true" />
        </div>

        {projects.map((p, i) => {
          const shots = projectCardImages[p.id]
          const single = p.id === 'futurestar'
          return (
            <Link
              key={p.id}
              className="figma-work-card"
              to={`/work/${p.id}`}
            >
              <span className="figma-work-step" aria-hidden="true">
                {i + 1}
              </span>
              <img
                src={figmaLockIcon}
                alt=""
                className="figma-work-lock"
                width={30}
                height={30}
              />
              <h3>{p.title}</h3>
              {p.company || p.year ? (
                <p className="figma-work-meta">
                  {p.company}{p.company && p.year ? ' · ' : ''}{p.year}
                </p>
              ) : null}
              <p className="figma-work-desc">{p.description}</p>
              <hr className="figma-work-rule" />
              <div
                className={
                  single
                    ? 'figma-work-shots figma-work-shots--single'
                    : 'figma-work-shots'
                }
              >
                {(single ? [shots[0]] : shots).map((src, j) => (
                  <img
                    key={`${p.id}-${j}`}
                    src={src}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="figma-work-footer">
                {p.tag ? <span className="figma-badge">{p.tag}</span> : null}
                <span className="figma-read">Read case study</span>
              </div>
            </Link>
          )
        })}
      </section>

      <div className="figma-testimonials-wrap">
        <div className="figma-testimonials-inner">
          <div className="figma-testimonials-head">
            <h2 id="testimonials-heading">Testimonials</h2>
            <span className="figma-works-line" aria-hidden="true" />
          </div>
          <ul
            className="figma-testimonial-grid"
            aria-labelledby="testimonials-heading"
          >
            {testimonials.map((t) => (
              <li key={t.name} className="figma-t-card">
                <div className="figma-t-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img
                      key={i}
                      src={figmaStarIcon}
                      alt=""
                      width={20}
                      height={20}
                    />
                  ))}
                </div>
                <p className="figma-t-quote">{t.quote}</p>
                <p className="figma-t-name">
                  {t.name}, {t.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section
        id="writings"
        className="figma-section writings"
        aria-labelledby="writings-heading"
      >
        <h2 id="writings-heading">Writings</h2>
        <p className="writings-intro">
          Essays and notes on product design, research, and systems—publish links
          here as they go live.
        </p>
        <ul className="writings-list">
          {writingsContent.map((w) => (
            <li key={w.title} className="writings-item">
              <div className="writings-item-head">
                <span className="writings-item-title">{w.title}</span>
                <span className="writings-item-date">{w.date}</span>
              </div>
              <p className="writings-item-summary">{w.summary}</p>
              {w.href ? (
                <a
                  href={w.href}
                  className="writings-item-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read
                </a>
              ) : (
                <span className="writings-item-placeholder">{w.note}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="figma-section about" aria-labelledby="about-heading">
        <h2 id="about-heading">{aboutContent.headline}</h2>
        {aboutContent.paragraphs.map((para, i) => (
          <p key={`about-${i}`} className="about-text">
            {para}
          </p>
        ))}
        <p className="about-text">
          An earlier version of this portfolio{' '}
          <a href={LEGACY_PORTFOLIO_URL} target="_blank" rel="noreferrer">
            lived on Framer
          </a>
          .
        </p>
        <p className="about-contact">
          <a className="contact-link" href={`mailto:${CONTACT_EMAIL}`}>
            Get in touch
          </a>
        </p>
        <p className="about-figma">
          <a
            className="about-figma-link"
            href={`${FIGMA_FILE}?node-id=2607-3036&m=dev`}
            target="_blank"
            rel="noreferrer"
          >
            Figma — Home (source)
          </a>
        </p>
      </section>
    </main>
  )
}
