import { awards } from '../data/content'

const LAUREL_WREATH = '/awards-laurel-wreath.png'

export function AwardsSection() {
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
          {awards.map((award) => (
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
