import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'

/** Discrete zoom steps (multiplier vs fit-to-viewport base size). */
export const LIGHTBOX_ZOOM_LEVELS = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5] as const

type Props = {
  src: string
  alt: string
  grayscale?: boolean
}

type DragState = {
  pointerId: number
  startX: number
  startY: number
  originScrollLeft: number
  originScrollTop: number
}

export function LightboxImagePane({ src, alt, grayscale }: Props) {
  const [zoomIndex, setZoomIndex] = useState(0)
  const [canPan, setCanPan] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)

  useEffect(() => {
    setZoomIndex(0)
  }, [src])

  const updateCanPan = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const w = 2
    setCanPan(el.scrollWidth > el.clientWidth + w || el.scrollHeight > el.clientHeight + w)
  }, [])

  const zoom = LIGHTBOX_ZOOM_LEVELS[zoomIndex]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateCanPan()
    const ro = new ResizeObserver(updateCanPan)
    ro.observe(el)
    const img = el.querySelector('img')
    const onImgLoad = () => updateCanPan()
    img?.addEventListener('load', onImgLoad)
    return () => {
      ro.disconnect()
      img?.removeEventListener('load', onImgLoad)
    }
  }, [src, zoomIndex, updateCanPan])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const maxL = Math.max(0, el.scrollWidth - el.clientWidth)
    const maxT = Math.max(0, el.scrollHeight - el.clientHeight)
    if (el.scrollLeft > maxL) el.scrollLeft = maxL
    if (el.scrollTop > maxT) el.scrollTop = maxT
  }, [zoomIndex])

  const endDrag = useCallback((e: PointerEvent) => {
    const d = dragRef.current
    if (!d || e.pointerId !== d.pointerId) return
    const el = scrollRef.current
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
      el.classList.remove('lightbox-scroll--dragging')
    }
    dragRef.current = null
  }, [])

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return
      if (e.pointerType === 'touch') return
      const el = scrollRef.current
      if (!el) return
      if (el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight) return
      e.preventDefault()
      el.setPointerCapture(e.pointerId)
      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        originScrollLeft: el.scrollLeft,
        originScrollTop: el.scrollTop,
      }
      el.classList.add('lightbox-scroll--dragging')
    },
    [],
  )

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d || e.pointerId !== d.pointerId) return
    const el = scrollRef.current
    if (!el) return
    const maxL = Math.max(0, el.scrollWidth - el.clientWidth)
    const maxT = Math.max(0, el.scrollHeight - el.clientHeight)
    el.scrollLeft = Math.max(0, Math.min(maxL, d.originScrollLeft - (e.clientX - d.startX)))
    el.scrollTop = Math.max(0, Math.min(maxT, d.originScrollTop - (e.clientY - d.startY)))
  }, [])

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      endDrag(e.nativeEvent)
    },
    [endDrag],
  )

  const onPointerCancel = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      endDrag(e.nativeEvent)
    },
    [endDrag],
  )
  const canZoomIn = zoomIndex < LIGHTBOX_ZOOM_LEVELS.length - 1
  const canZoomOut = zoomIndex > 0

  const zoomIn = useCallback(() => {
    setZoomIndex((i) => Math.min(i + 1, LIGHTBOX_ZOOM_LEVELS.length - 1))
  }, [])

  const zoomOut = useCallback(() => {
    setZoomIndex((i) => Math.max(0, i - 1))
  }, [])

  const zoomReset = useCallback(() => setZoomIndex(0), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        zoomIn()
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault()
        zoomOut()
      } else if (e.key === '0') {
        e.preventDefault()
        zoomReset()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [zoomIn, zoomOut, zoomReset])

  const label = `${zoom}×`

  return (
    <div className="lightbox-image-pane">
      <div
        ref={scrollRef}
        className={`lightbox-scroll${canPan ? ' lightbox-scroll--can-pan' : ''}`}
        style={{ '--lightbox-zoom': zoom } as CSSProperties}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onLostPointerCapture={() => {
          dragRef.current = null
          scrollRef.current?.classList.remove('lightbox-scroll--dragging')
        }}
        onWheel={(e) => {
          if (!e.ctrlKey && !e.metaKey) return
          e.preventDefault()
          if (e.deltaY < 0) zoomIn()
          else zoomOut()
        }}
        role="presentation"
      >
        <div className="lightbox-scroll-inner">
          <img
            className={`lightbox-img${grayscale ? ' case-media--grayscale' : ''}`}
            src={src}
            alt={alt}
            draggable={false}
          />
        </div>
      </div>
      <div
        className="lightbox-zoom-bar"
        role="toolbar"
        aria-label="Zoom level"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lightbox-zoom-btn"
          aria-label="Zoom out"
          disabled={!canZoomOut}
          onClick={zoomOut}
        >
          −
        </button>
        <span className="lightbox-zoom-label" aria-live="polite">
          {label}
        </span>
        <button
          type="button"
          className="lightbox-zoom-btn"
          aria-label="Zoom in"
          disabled={!canZoomIn}
          onClick={zoomIn}
        >
          +
        </button>
      </div>
    </div>
  )
}
