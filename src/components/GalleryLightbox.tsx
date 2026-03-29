import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type GalleryImage = { src: string; alt: string }

type Props = {
  images: GalleryImage[]
  initialIndex: number
  onClose: () => void
}

export function GalleryLightbox({ images, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  const safeIndex = Math.min(Math.max(0, index), Math.max(0, images.length - 1))
  const current = images[safeIndex]

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(images.length - 1, i + 1))
  }, [images.length])

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    },
    [onClose, goPrev, goNext],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!current || images.length === 0) return null

  const atStart = safeIndex <= 0
  const atEnd = safeIndex >= images.length - 1
  const multi = images.length > 1

  return createPortal(
    <div
      className="lightbox-overlay gallery-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      {multi ? (
        <>
          <button
            type="button"
            className="lightbox-nav lightbox-nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            disabled={atStart}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-nav--next"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            disabled={atEnd}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      ) : null}
      <img
        className="lightbox-img"
        src={current.src}
        alt={current.alt}
        onClick={(e) => e.stopPropagation()}
      />
      {multi ? (
        <p className="lightbox-counter" aria-live="polite">
          {safeIndex + 1} / {images.length}
        </p>
      ) : null}
    </div>,
    document.body,
  )
}
