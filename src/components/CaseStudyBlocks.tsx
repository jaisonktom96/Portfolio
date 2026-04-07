import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import type { CaseStudyBlock, CaseStudyTableCell } from '../data/types'
import { CONTENT_REVISION } from '../data/content'
import { magicDiaryAssets } from '../data/figma/magicDiaryAssets'
import { withAssetRevision } from '../lib/utils'
import { ImageLightbox } from './ImageLightbox'
import { ImageWithSkeleton } from './ImageWithSkeleton'

function assetUrl(src: string) {
  return withAssetRevision(src, CONTENT_REVISION)
}

const statIconSrc: Record<'user' | 'city' | 'site', string> = {
  user: magicDiaryAssets.iconUser,
  city: magicDiaryAssets.iconCity,
  site: magicDiaryAssets.iconSite,
}

type LightboxPayload = { src: string; alt: string; grayscale?: boolean }

export function CaseStudyBlocks({ blocks }: { blocks: CaseStudyBlock[] }) {
  const [lightbox, setLightbox] = useState<LightboxPayload | null>(null)

  return (
    <div className="case-blocks">
      {blocks.map((block, i) => (
        <CaseStudyBlockView key={`b-${i}`} block={block} onImageClick={setLightbox} />
      ))}
      {lightbox ? (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          grayscale={lightbox.grayscale}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </div>
  )
}

type BlockProps = {
  block: CaseStudyBlock
  onImageClick: (img: LightboxPayload) => void
}

type FigureBlock = Extract<CaseStudyBlock, { type: 'figure' }>

function figureImgClass(grayscale?: boolean, preserveImageQuality?: boolean): string {
  return `case-figure-img case-figure-img--clickable${grayscale ? ' case-media--grayscale' : ''}${
    preserveImageQuality ? ' case-figure-img--hq' : ''
  }`
}

function CaseStudyFigureBlock({
  block,
  onImageClick,
}: {
  block: FigureBlock
  onImageClick: (img: LightboxPayload) => void
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

  const captionClass =
    block.captionTone === 'prose'
      ? 'case-figure-caption case-figure-caption--prose'
      : 'case-figure-caption'

  if (crop != null) {
    /* Placeholder ratio until natural dimensions load (avoids clip-path empty top gap). */
    const aspect = cropAspect ?? '3 / 2'
    const wrapStyle: CSSProperties = {
      position: 'relative',
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
        {block.caption ? (
          <figcaption className={captionClass}>{block.caption}</figcaption>
        ) : null}
        <div className="case-figure-crop" style={wrapStyle}>
          <ImageWithSkeleton
            fit="cover"
            imgRef={imgRef}
            src={assetUrl(block.src)}
            alt={block.alt}
            className={figureImgClass(block.grayscale, block.preserveImageQuality)}
            style={imgStyle}
            loading="lazy"
            decoding="async"
            onLoad={(e) => applyCropAspect(e.currentTarget)}
            onClick={() =>
              onImageClick({ src: assetUrl(block.src), alt: block.alt, grayscale: block.grayscale })
            }
          />
        </div>
      </figure>
    )
  }

  const plainStyle: CSSProperties = block.radius != null ? { borderRadius: block.radius } : {}
  return (
    <figure className={figureClass}>
      {block.caption ? (
        <figcaption className={captionClass}>{block.caption}</figcaption>
      ) : null}
      <ImageWithSkeleton
        src={assetUrl(block.src)}
        alt={block.alt}
        className={figureImgClass(block.grayscale, block.preserveImageQuality)}
        style={Object.keys(plainStyle).length ? plainStyle : undefined}
        loading="lazy"
        decoding="async"
        onClick={() =>
          onImageClick({ src: assetUrl(block.src), alt: block.alt, grayscale: block.grayscale })
        }
      />
    </figure>
  )
}

function renderTableCellContent(
  cell: CaseStudyTableCell,
  onImageClick: (img: LightboxPayload) => void,
): ReactNode {
  if (typeof cell === 'string') return cell
  if (cell.kind === 'toolThumb') {
    return (
      <div className="case-table-tool-thumb">
        <span>{cell.label}</span>
        <button
          type="button"
          className="case-table-tool-thumb-hit"
          onClick={() =>
            onImageClick({
              src: assetUrl(cell.src),
              alt: cell.alt,
              grayscale: cell.grayscale,
            })
          }
          aria-label={`Open full size: ${cell.label}`}
        >
          <ImageWithSkeleton
            src={assetUrl(cell.src)}
            alt=""
            wrapperClassName="case-table-tool-thumb-skeleton"
            className={`case-table-tool-thumb-img${cell.grayscale ? ' case-media--grayscale' : ''}`}
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
    )
  }
  return null
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
                <ImageWithSkeleton
                  fit="cover"
                  src={assetUrl(item.src)}
                  alt={item.alt}
                  className={figureImgClass(item.grayscale)}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    onImageClick({
                      src: assetUrl(item.src),
                      alt: item.alt,
                      grayscale: item.grayscale,
                    })
                  }
                />
              </div>
            ))}
          </div>
          {block.caption ? (
            <figcaption className="case-figure-caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      )
    case 'proseBlock':
      return (
        <p className={['cs-prose', block.className].filter(Boolean).join(' ')}>{block.text}</p>
      )
    case 'orderedList':
      return (
        <ol className="cs-list cs-list--ordered">
          {block.items.map((item, i) => (
            <li key={`${i}-${item.slice(0, 24)}`}>{item}</li>
          ))}
        </ol>
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
                    <td
                      key={`c-${ri}-${ci}`}
                      className={
                        typeof cell === 'object' && cell !== null && 'kind' in cell && cell.kind === 'toolThumb'
                          ? 'case-table-cell--thumb'
                          : undefined
                      }
                    >
                      {renderTableCellContent(cell, onImageClick)}
                    </td>
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
        <div
          className={`case-card-row${block.variant === 'metrics' ? ' case-card-row--metrics' : ''}`}
        >
          {block.cards.map((c) => (
            <div
              key={c.title}
              className={`case-card-tile${block.variant === 'metrics' ? ' case-card-tile--metrics' : ''}`}
            >
              {c.imageSrc ? (
                <ImageWithSkeleton
                  fit="blockFill"
                  src={assetUrl(c.imageSrc)}
                  alt={c.imageAlt ?? c.title}
                  className={`case-card-tile-img case-figure-img--clickable${c.grayscale ? ' case-media--grayscale' : ''}`}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    onImageClick({
                      src: assetUrl(c.imageSrc!),
                      alt: c.imageAlt ?? c.title,
                      grayscale: c.grayscale,
                    })
                  }
                />
              ) : null}
              {!block.hideTitles ? <h3 className="case-card-tile-title">{c.title}</h3> : null}
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
                      <ImageWithSkeleton
                        src={assetUrl(statIconSrc[s.icon])}
                        alt=""
                        className="case-research-stat-icon"
                        width={34}
                        height={26}
                        showSkeleton={false}
                      />
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
              <ImageWithSkeleton
                wrapperClassName="case-persona-img-wrap"
                src={assetUrl(p.imageSrc)}
                alt={p.alt}
                className={`case-persona-img case-figure-img--clickable${p.grayscale ? ' case-media--grayscale' : ''}`}
                loading="lazy"
                decoding="async"
                onClick={() =>
                  onImageClick({ src: assetUrl(p.imageSrc), alt: p.alt, grayscale: p.grayscale })
                }
              />
              <figcaption className="case-persona-caption">{p.name}</figcaption>
            </figure>
          ))}
        </div>
      )
    case 'beforeAfter':
      return (
        <div className="case-before-after">
          {block.title ? (
            <h3
              className={
                block.titleTone === 'prose'
                  ? 'case-before-after-title case-before-after-title--prose'
                  : 'case-before-after-title'
              }
            >
              {block.title}
            </h3>
          ) : null}
          <div className="case-before-after-row">
            <figure className="case-before-after-item">
              <span className="case-before-after-badge case-before-after-badge--before">
                {block.before.label ?? 'Before'}
              </span>
              <div className="case-before-after-frame">
                <ImageWithSkeleton
                  src={assetUrl(block.before.src)}
                  alt={block.before.alt}
                  className={`case-before-after-img case-figure-img--clickable${block.before.grayscale ? ' case-media--grayscale' : ''}`}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    onImageClick({
                      src: assetUrl(block.before.src),
                      alt: block.before.alt,
                      grayscale: block.before.grayscale,
                    })
                  }
                />
              </div>
            </figure>
            <figure className="case-before-after-item">
              <span className="case-before-after-badge case-before-after-badge--after">
                {block.after.label ?? 'After'}
              </span>
              <div className="case-before-after-frame">
                <ImageWithSkeleton
                  src={assetUrl(block.after.src)}
                  alt={block.after.alt}
                  className={`case-before-after-img case-figure-img--clickable${block.after.grayscale ? ' case-media--grayscale' : ''}`}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    onImageClick({
                      src: assetUrl(block.after.src),
                      alt: block.after.alt,
                      grayscale: block.after.grayscale,
                    })
                  }
                />
              </div>
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
                <ImageWithSkeleton
                  fit="cover"
                  src={assetUrl(im.src)}
                  alt={im.alt}
                  className={`cs-phone-frame-img${im.grayscale ? ' case-media--grayscale' : ''}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      )
    case 'linkList':
      return (
        <div className="case-link-list">
          {block.title ? <h3 className="case-link-list-title">{block.title}</h3> : null}
          {block.intro ? <p className="case-link-list-intro">{block.intro}</p> : null}
          <ul className="case-link-list-items">
            {block.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="case-link-list-link" target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )
    default:
      return null
  }
}
