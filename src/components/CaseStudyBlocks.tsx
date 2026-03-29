import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import type { CaseStudyBlock } from '../data/types'
import { magicDiaryAssets } from '../data/figma/magicDiaryAssets'
import { ImageLightbox } from './ImageLightbox'

const statIconSrc: Record<'user' | 'city' | 'site', string> = {
  user: magicDiaryAssets.iconUser,
  city: magicDiaryAssets.iconCity,
  site: magicDiaryAssets.iconSite,
}

export function CaseStudyBlocks({ blocks }: { blocks: CaseStudyBlock[] }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className="case-blocks">
      {blocks.map((block, i) => (
        <CaseStudyBlockView key={`b-${i}`} block={block} onImageClick={setLightbox} />
      ))}
      {lightbox ? (
        <ImageLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      ) : null}
    </div>
  )
}

type BlockProps = {
  block: CaseStudyBlock
  onImageClick: (img: { src: string; alt: string }) => void
}

type FigureBlock = Extract<CaseStudyBlock, { type: 'figure' }>

function CaseStudyFigureBlock({
  block,
  onImageClick,
}: {
  block: FigureBlock
  onImageClick: (img: { src: string; alt: string }) => void
}) {
  const crop = block.cropTopPercent
  const r = block.radius ?? 9
  const imgRef = useRef<HTMLImageElement>(null)
  const [cropAspect, setCropAspect] = useState<string | null>(null)

  const applyCropAspect = (el: HTMLImageElement) => {
    if (crop == null || el.naturalWidth < 1 || el.naturalHeight < 1) return
    const visibleHFrac = 1 - crop / 100
    setCropAspect(`${el.naturalWidth} / ${el.naturalHeight * visibleHFrac}`)
  }

  useLayoutEffect(() => {
    const el = imgRef.current
    if (el?.complete) applyCropAspect(el)
  }, [block.src, crop])

  const figureClass = `case-figure${block.size ? ` case-figure--${block.size}` : ''}`

  if (crop != null) {
    /* Placeholder ratio until natural dimensions load (avoids clip-path empty top gap). */
    const aspect = cropAspect ?? '3 / 2'
    const wrapStyle: CSSProperties = {
      width: '100%',
      overflow: 'hidden',
      borderRadius: r,
      border: '1px solid rgba(255, 255, 255, 0.06)',
      background: 'rgba(255, 255, 255, 0.02)',
      aspectRatio: aspect,
    }
    const imgStyle: CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'bottom center',
      display: 'block',
      border: 'none',
      borderRadius: 0,
    }
    return (
      <figure className={figureClass}>
        <div className="case-figure-crop" style={wrapStyle}>
          <img
            ref={imgRef}
            src={block.src}
            alt={block.alt}
            className="case-figure-img case-figure-img--clickable"
            style={imgStyle}
            loading="lazy"
            decoding="async"
            onLoad={(e) => applyCropAspect(e.currentTarget)}
            onClick={() => onImageClick({ src: block.src, alt: block.alt })}
          />
        </div>
        {block.caption ? (
          <figcaption className="case-figure-caption">{block.caption}</figcaption>
        ) : null}
      </figure>
    )
  }

  const plainStyle: CSSProperties = block.radius != null ? { borderRadius: block.radius } : {}
  return (
    <figure className={figureClass}>
      <img
        src={block.src}
        alt={block.alt}
        className="case-figure-img case-figure-img--clickable"
        style={Object.keys(plainStyle).length ? plainStyle : undefined}
        loading="lazy"
        decoding="async"
        onClick={() => onImageClick({ src: block.src, alt: block.alt })}
      />
      {block.caption ? (
        <figcaption className="case-figure-caption">{block.caption}</figcaption>
      ) : null}
    </figure>
  )
}

function CaseStudyBlockView({ block, onImageClick }: BlockProps) {
  switch (block.type) {
    case 'figure':
      return <CaseStudyFigureBlock block={block} onImageClick={onImageClick} />
    case 'figureRow':
      return (
        <figure className="case-figure">
          <div className="case-figure-row">
            {block.items.map((item) => (
              <div key={item.src} className="case-figure--tile">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="case-figure-img case-figure-img--clickable"
                  loading="lazy"
                  decoding="async"
                  onClick={() => onImageClick({ src: item.src, alt: item.alt })}
                />
              </div>
            ))}
          </div>
          {block.caption ? (
            <figcaption className="case-figure-caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      )
    case 'table':
      return (
        <div className="case-table-wrap">
          {block.caption ? <p className="case-table-caption">{block.caption}</p> : null}
          <table className="case-table">
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={`r-${ri}`}>
                  {row.map((cell, ci) => (
                    <td key={`c-${ri}-${ci}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'callout':
      return (
        <aside className="case-callout">
          <h3 className="case-callout-title">{block.title}</h3>
          {block.intro ? <p className="case-callout-intro">{block.intro}</p> : null}
          {block.bullets && block.bullets.length > 0 ? (
            <ul className="case-callout-list">
              {block.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </aside>
      )
    case 'cardRow':
      return (
        <div className="case-card-row">
          {block.cards.map((c) => (
            <div key={c.title} className="case-card-tile">
              {c.imageSrc ? (
                <img
                  src={c.imageSrc}
                  alt={c.imageAlt ?? c.title}
                  className="case-card-tile-img case-figure-img--clickable"
                  loading="lazy"
                  decoding="async"
                  onClick={() => onImageClick({ src: c.imageSrc!, alt: c.imageAlt ?? c.title })}
                />
              ) : null}
              <h3 className="case-card-tile-title">{c.title}</h3>
              {c.body.trim() ? <p className="case-card-tile-body">{c.body}</p> : null}
            </div>
          ))}
        </div>
      )
    case 'researchCardRow':
      return (
        <div className="case-research-row">
          {block.cards.map((c) => (
            <div key={c.title} className="case-research-card">
              <h3 className="case-research-card-title">{c.title}</h3>
              <p className="case-research-card-sub">{c.subtitle}</p>
              <ul className="case-research-stats">
                {c.stats.map((s) => (
                  <li key={s.text}>
                    {s.icon ? (
                      <img src={statIconSrc[s.icon]} alt="" className="case-research-stat-icon" width={34} height={26} />
                    ) : null}
                    <span className="case-research-stat-value">{s.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    case 'insightPhases':
      return (
        <div className="case-insight-phases">
          {block.phases.map((phase) => (
            <div key={phase.label} className="case-insight-phase">
              <h3 className="case-insight-phase-label">{phase.label}</h3>
              <div className="case-insight-grid">
                {phase.cards.map((card) => (
                  <div key={card.title} className="case-insight-card">
                    <h4 className="case-insight-card-title">{card.title}</h4>
                    <p className="case-insight-card-body">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    case 'personaPair':
      return (
        <div className="case-persona-pair">
          {block.personas.map((p) => (
            <figure key={p.name} className="case-persona">
              <img
                src={p.imageSrc}
                alt={p.alt}
                className="case-persona-img case-figure-img--clickable"
                loading="lazy"
                decoding="async"
                onClick={() => onImageClick({ src: p.imageSrc, alt: p.alt })}
              />
              <figcaption className="case-persona-caption">{p.name}</figcaption>
            </figure>
          ))}
        </div>
      )
    case 'beforeAfter':
      return (
        <div className="case-before-after">
          {block.title ? <h3 className="case-before-after-title">{block.title}</h3> : null}
          <div className="case-before-after-row">
            <figure className="case-before-after-item">
              <span className="case-before-after-badge case-before-after-badge--before">
                {block.before.label ?? 'Before'}
              </span>
              <img
                src={block.before.src}
                alt={block.before.alt}
                className="case-before-after-img"
                loading="lazy"
                decoding="async"
                onClick={() => onImageClick({ src: block.before.src, alt: block.before.alt })}
              />
            </figure>
            <figure className="case-before-after-item">
              <span className="case-before-after-badge case-before-after-badge--after">
                {block.after.label ?? 'After'}
              </span>
              <img
                src={block.after.src}
                alt={block.after.alt}
                className="case-before-after-img"
                loading="lazy"
                decoding="async"
                onClick={() => onImageClick({ src: block.after.src, alt: block.after.alt })}
              />
            </figure>
          </div>
        </div>
      )
    case 'solutionFeature':
      return (
        <div className="case-solution-feature">
          <h3 className="case-solution-feature-title">{block.title}</h3>
          <p className="case-solution-feature-bullet">{block.bullet}</p>
          <div className="case-solution-feature-phones">
            {block.images.map((im) => (
              <div key={im.src} className="cs-phone-frame">
                <img src={im.src} alt={im.alt} className="cs-phone-frame-img" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      )
    default:
      return null
  }
}
