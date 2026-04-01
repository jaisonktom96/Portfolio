import { useState } from 'react'
import { awards, CONTENT_REVISION } from '../data/content'
import { ImageLightbox } from './ImageLightbox'

const LAUREL_WREATH = '/awards-laurel-wreath.png'

const LATEST_TESTIMONIAL_SRC = `/case-studies/user-profile-redesign/Rockstarmessage.jpeg`

export function AwardsSection() {
  const [testimonialOpen, setTestimonialOpen] = useState(false)
  const testimonialSrc = `${LATEST_TESTIMONIAL_SRC}?v=${encodeURIComponent(CONTENT_REVISION)}`

  return (
    <section
      className="figma-home-block figma-awards-wrap"
      id="awards"
      aria-labelledby="awards-heading"
    >
      <div className="figma-awards-inner">
        <h2 className="figma-works-eyebrow" id="awards-heading">
          Awards
        </h2>
        <div className="figma-awards-grid">
          {awards.map((award) => {
            const isRockstarProduct = award.lines[0] === 'Rockstar, Product'
            return (
              <article
                key={award.lines.join('-')}
                className="figma-award"
              >
                <div className="figma-award-copy">
                  {award.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
                <img
                  src={LAUREL_WREATH}
                  alt=""
                  width={173}
                  height={173}
                  className="figma-award-laurel-img"
                  decoding="async"
                />
                {isRockstarProduct ? (
                  <div className="figma-awards-actions">
                    <button
                      type="button"
                      className="figma-awards-testimonial-btn"
                      onClick={() => setTestimonialOpen(true)}
                    >
                      View Message
                    </button>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
        {testimonialOpen ? (
          <ImageLightbox
            src={testimonialSrc}
            alt="Rockstar Product award: citation recognizing Jaison K Thomas as Product Designer"
            onClose={() => setTestimonialOpen(false)}
          />
        ) : null}
      </div>
    </section>
  )
}
