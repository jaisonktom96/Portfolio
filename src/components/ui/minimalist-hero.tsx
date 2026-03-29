import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/** shadcn-style tokens: black canvas + white type (matches reference “mnmlst.” hero). */
export interface MinimalistHeroProps {
  logoText: string
  navLinks: { label: string; href: string; target?: '_blank' }[]
  imageSrc: string
  imageAlt: string
  overlayText: {
    headline: string
  }
  className?: string
}

const NavLink = ({
  href,
  target,
  children,
}: {
  href: string
  target?: '_blank'
  children: ReactNode
}) => (
  <a
    href={href}
    target={target}
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    className="text-sm font-medium tracking-widest text-white/60 transition-colors hover:text-white"
  >
    {children}
  </a>
)

export function MinimalistHero({
  logoText,
  navLinks,
  imageSrc,
  imageAlt,
  overlayText,
  className,
}: MinimalistHeroProps) {
  return (
    <div
      data-hero="minimalist"
      className={cn(
        'relative isolate z-[100] flex min-h-[80svh] max-h-[100svh] w-full flex-col items-center justify-between overflow-x-hidden bg-black p-8 font-sans text-white md:p-12',
        className,
      )}
    >
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
            className="text-xl font-[560] tracking-wider [font-family:var(--font-display)]"
        >
          {logoText}
        </motion.div>
        <nav className="hidden items-center space-x-8 md:flex" aria-label="Landing">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href} target={link.target}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <motion.button
          type="button"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-1.5 md:hidden"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-5 bg-white" />
        </motion.button>
      </header>

      <div className="relative flex min-h-0 w-full max-w-7xl flex-grow flex-col items-center justify-center gap-6 px-0 pt-[10svh] pb-[5svh]">
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[250px] w-[250px] rounded-full bg-[#5b7cf7]/90 md:h-[350px] md:w-[350px] lg:h-[420px] lg:w-[420px]"
            aria-hidden
          />
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-72 translate-y-8 scale-[1.8] object-cover md:w-80 md:translate-y-10 lg:w-96 lg:translate-y-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.src =
                'https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found'
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 text-center"
        >
          <h1 className="text-center text-[4.899rem] font-[454] tracking-tight text-white [font-family:var(--font-display)] [letter-spacing:-0.04em] sm:text-[6.124rem] md:text-[7.349rem] lg:text-[9.797rem] xl:text-[13.063rem]">
            {overlayText.headline}
          </h1>
        </motion.div>
      </div>
    </div>
  )
}
