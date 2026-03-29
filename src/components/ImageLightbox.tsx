import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  src: string
  alt: string
  /** Match in-page treatment when asset is marked grayscale in case study data */
  grayscale?: boolean
  onClose: () => void
}

export function ImageLightbox({ src, alt, grayscale, onClose }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-label="Image preview">
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <img
        className={`lightbox-img${grayscale ? ' case-media--grayscale' : ''}`}
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  )
}
