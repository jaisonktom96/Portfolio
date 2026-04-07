import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ImageWithSkeleton } from './ImageWithSkeleton'
import { CONTENT_REVISION, projects } from '../data/content'
import { projectCardImages } from '../data/figmaAssets'
import { withAssetRevision } from '../lib/utils'

const MotionLink = motion.create(Link)

const workCardEase = [0.22, 1, 0.36, 1] as const

/** Compact suggestion rows, not full home “My Works” cards. */
export function SuggestedWorkCards({ excludeId }: { excludeId: string }) {
  const reduceMotion = useReducedMotion()
  const other = projects.filter((p) => p.id !== excludeId)
  if (other.length === 0) return null

  return (
    <section className="cs-more-work" aria-labelledby="more-work-heading">
      <h2 className="cs-more-work-heading" id="more-work-heading">
        More projects
      </h2>
      <div className="cs-more-work-cards">
        {other.map((p, i) => {
          const preview = projectCardImages[p.id]
          const metaParts = [p.company, p.year, p.tag].filter(Boolean)
          return (
            <MotionLink
              key={p.id}
              className="cs-suggest-card"
              to={`/work/${p.id}`}
              initial={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : i * 0.06,
                ease: workCardEase,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -2,
                      boxShadow: '0 8px 24px -8px rgba(0, 0, 0, 0.45)',
                      transition: { duration: 0.18, ease: workCardEase },
                    }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.995 }}
            >
              {preview ? (
                <div className="cs-suggest-card-thumb">
                  <ImageWithSkeleton
                    fit="blockFill"
                    src={withAssetRevision(preview, CONTENT_REVISION)}
                    alt=""
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="cs-suggest-card-thumb cs-suggest-card-thumb--empty" aria-hidden />
              )}
              <div className="cs-suggest-card-body">
                <h3 className="cs-suggest-card-title">{p.title}</h3>
                {metaParts.length > 0 ? (
                  <p className="cs-suggest-card-meta">{metaParts.join(' · ')}</p>
                ) : null}
              </div>
            </MotionLink>
          )
        })}
      </div>
    </section>
  )
}
