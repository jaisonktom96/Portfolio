import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Append `v` query so `/public` assets reload when `CONTENT_REVISION` changes (avoids stale browser cache). */
export function withAssetRevision(src: string, revision: string): string {
  if (!src || !revision) return src
  try {
    const u = new URL(src, 'http://local.invalid')
    u.searchParams.set('v', revision)
    if (src.startsWith('/')) {
      return `${u.pathname}${u.search}${u.hash}`
    }
    return u.href
  } catch {
    const sep = src.includes('?') ? '&' : '?'
    return `${src}${sep}v=${encodeURIComponent(revision)}`
  }
}
