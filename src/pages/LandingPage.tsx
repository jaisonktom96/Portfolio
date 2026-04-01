import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { AwardsSection } from '@/components/AwardsSection'
import { GalleryLightbox } from '@/components/GalleryLightbox'
import { MinimalistHero } from '@/components/ui/minimalist-hero'
import { CONTENT_REVISION, outsideWork, projects, testimonials } from '../data/content'
import { figmaStarIcon, projectCardImages } from '../data/figmaAssets'

/** Portrait, background-removed version saved to public/case-studies/hero-portrait.png */
const HERO_PORTRAIT = '/case-studies/hero-portrait.png'

const MotionLink = motion.create(Link)

const workCardEase = [0.22, 1, 0.36, 1] as const

/** Circular thumbnails in “Other than work” (52px → +50%). Inline size beats stale CSS / cascade issues. */
const OUTSIDE_WORK_THUMB_PX = 78

/** Home / landing, minimalist hero + scroll sections (no legacy Saturn/Figma hero). */
type OutsideGalleryState = {
  images: { src: string; alt: string }[]
  initialIndex: number
}

export function LandingPage() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [outsideGallery, setOutsideGallery] = useState<OutsideGalleryState | null>(null)

  /** Thumbs always come from bundled `outsideWork` so the UI matches the deployed JS bundle (no stale thumbs.json override). */
  const thumbCacheKey = CONTENT_REVISION

  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash, location.pathname])

  return (
    <div id="main">
      {outsideGallery ? (
        <GalleryLightbox
          images={outsideGallery.images}
          initialIndex={outsideGallery.initialIndex}
          onClose={() => setOutsideGallery(null)}
        />
      ) : null}
      <MinimalistHero
        logoText="Jaison Thomas"
        navLinks={[
          {
            label: 'RESUME',
            href: '/Resume_JaisonThomas.pdf',
            target: '_blank',
          },
        ]}
        imageSrc={HERO_PORTRAIT}
        imageAlt="Jaison Thomas, profile portrait in a dark turtleneck."
        overlayText={{
          headline: 'Simplify',
        }}
      />

      <div className="figma-home">
        <section id="work" className="figma-works" aria-labelledby="works-heading">
          <h2 className="figma-works-eyebrow" id="works-heading">
            My Works
          </h2>

          {projects.map((p, i) => {
            const shots = projectCardImages[p.id]
            const preview = shots?.[0]
            const metaParts = [p.company, p.year, p.tag].filter(Boolean)
            return (
              <MotionLink
                key={p.id}
                className="figma-work-card"
                to={`/work/${p.id}`}
                initial={
                  reduceMotion
                    ? { opacity: 1, y: 0, filter: 'none' }
                    : { opacity: 0, y: 40, filter: 'blur(6px)' }
                }
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2, margin: '0px 0px -10% 0px' }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : i * 0.09,
                  ease: workCardEase,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -5,
                        /* Elevation only — accent stroke is 2px border in CSS (matches default border width) */
                        boxShadow: '0 18px 40px -12px rgba(0, 0, 0, 0.55)',
                        transition: { duration: 0.22, ease: workCardEase },
                      }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.992 }}
              >
                <div className="figma-work-card-row">
                  <div className="figma-work-card-copy">
                    <h3>{p.title}</h3>
                    <p className="figma-work-desc">{p.description}</p>
                    {metaParts.length > 0 ? (
                      <p className="figma-work-meta figma-work-meta--footer">
                        {metaParts.join(' · ')}
                      </p>
                    ) : null}
                    <span className="figma-work-cta">View case study</span>
                  </div>
                  {preview ? (
                    <motion.div
                      className="figma-work-preview"
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { scale: 1.03, transition: { duration: 0.35, ease: workCardEase } }
                      }
                    >
                      <img src={preview} alt="" loading="lazy" />
                    </motion.div>
                  ) : null}
                </div>
              </MotionLink>
            )
          })}
        </section>

        <div className="figma-home-block figma-testimonials-wrap">
          <div className="figma-testimonials-inner">
            <h2 className="figma-works-eyebrow" id="testimonials-heading">
              Testimonials
            </h2>
            <div
              className="figma-testimonials-viewport"
              role="region"
              aria-label="Testimonials scrolling horizontally"
            >
              <div className="figma-testimonials-track">
                <ul className="figma-testimonials-row" aria-label="Testimonials">
                  {testimonials.map((t) => (
                    <li key={t.name} className="figma-t-card">
                      <div className="figma-t-stars" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <img
                            key={i}
                            src={figmaStarIcon}
                            alt=""
                            width={16}
                            height={16}
                          />
                        ))}
                      </div>
                      <p className="figma-t-quote">{t.quote}</p>
                      <p className="figma-t-name">
                        {t.name}
                        <span className="figma-t-role">, {t.role}</span>
                      </p>
                    </li>
                  ))}
                </ul>
                <ul className="figma-testimonials-row" aria-hidden="true">
                  {testimonials.map((t) => (
                    <li key={`dup-${t.name}`} className="figma-t-card">
                      <div className="figma-t-stars" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <img
                            key={i}
                            src={figmaStarIcon}
                            alt=""
                            width={16}
                            height={16}
                          />
                        ))}
                      </div>
                      <p className="figma-t-quote">{t.quote}</p>
                      <p className="figma-t-name">
                        {t.name}
                        <span className="figma-t-role">, {t.role}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <AwardsSection />

        <div className="figma-home-block figma-outside-work-wrap">
          <div className="figma-outside-work-inner">
            <h2 className="figma-works-eyebrow" id="other-than-work-heading">
              Other than work
            </h2>
            <ul className="figma-outside-work-grid" aria-labelledby="other-than-work-heading">
              {outsideWork.map((item) => {
                const thumbImages = item.images

                return (
                <li key={item.title} className="figma-outside-work-card">
                  <div className="figma-outside-work-card-anim">
                    <article>
                    <h3 className="figma-outside-work-title">{item.title}</h3>
                    {thumbImages.length > 0 ? (
                      <div
                        className="figma-outside-work-thumbs"
                        role="group"
                        aria-label={`Photos for ${item.title}`}
                        data-thumb-count={thumbImages.length}
                      >
                        {thumbImages.map((img, j) => (
                          <button
                            key={`${item.title}-${img.src}-${j}`}
                            type="button"
                            className="figma-outside-work-thumb"
                            style={{
                              width: OUTSIDE_WORK_THUMB_PX,
                              height: OUTSIDE_WORK_THUMB_PX,
                              minWidth: OUTSIDE_WORK_THUMB_PX,
                              minHeight: OUTSIDE_WORK_THUMB_PX,
                              flexShrink: 0,
                              boxSizing: 'border-box',
                            }}
                            onClick={() =>
                              setOutsideGallery({ images: thumbImages, initialIndex: j })
                            }
                            aria-label={`View image ${j + 1} of ${thumbImages.length}`}
                          >
                            <img
                              src={`${img.src}${img.src.includes('?') ? '&' : '?'}v=${encodeURIComponent(thumbCacheKey)}`}
                              alt=""
                            />
                            <span className="figma-outside-work-thumb-overlay" aria-hidden />
                          </button>
                        ))}
                      </div>
                    ) : null}
                    <p className="figma-outside-work-desc">{item.description}</p>
                    </article>
                  </div>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
