import {
  useLayoutEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type MutableRefObject,
  type Ref,
  type SyntheticEvent,
} from 'react'

export type ImageSkeletonFit = 'natural' | 'cover' | 'blockFill'

export type ImageWithSkeletonProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad'> & {
  wrapperClassName?: string
  /**
   * natural — block flow; min-height placeholder until decode.
   * cover — absolute fill (parent must be position: relative and sized).
   * blockFill — width/height 100%, object-fit cover (parent must set height).
   */
  fit?: ImageSkeletonFit
  imgRef?: Ref<HTMLImageElement>
  /** Omit shimmer for tiny decorative assets */
  showSkeleton?: boolean
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void
}

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): Ref<T> {
  return (node: T | null) => {
    for (const r of refs) {
      if (!r) continue
      if (typeof r === 'function') r(node)
      else (r as MutableRefObject<T | null>).current = node
    }
  }
}

export function ImageWithSkeleton({
  className = '',
  wrapperClassName = '',
  fit = 'natural',
  imgRef,
  showSkeleton = true,
  onLoad,
  src,
  ...rest
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)
  const innerRef = useRef<HTMLImageElement | null>(null)

  const setRefs = mergeRefs(innerRef, imgRef)

  useLayoutEffect(() => {
    setLoaded(false)
    const el = innerRef.current
    if (el?.complete && el.naturalWidth > 0) setLoaded(true)
  }, [src])

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true)
    onLoad?.(e)
  }

  if (!showSkeleton) {
    return <img ref={setRefs} src={src} className={className} onLoad={onLoad} {...rest} />
  }

  const wrapMods =
    fit === 'cover'
      ? 'image-skeleton-wrap image-skeleton-wrap--cover'
      : fit === 'blockFill'
        ? 'image-skeleton-wrap image-skeleton-wrap--block-fill'
        : 'image-skeleton-wrap image-skeleton-wrap--natural'

  const imgMods = [
    fit === 'cover' ? 'image-skeleton-img--fit-cover' : '',
    fit === 'blockFill' ? 'image-skeleton-img--block-fill' : '',
    className,
    loaded ? 'image-skeleton-img--loaded' : 'image-skeleton-img--pending',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={[wrapMods, wrapperClassName].filter(Boolean).join(' ')}>
      <span
        className={['image-skeleton', loaded && 'image-skeleton--hidden'].filter(Boolean).join(' ')}
        aria-hidden
      />
      <img ref={setRefs} src={src} className={imgMods} onLoad={handleLoad} {...rest} />
    </span>
  )
}
