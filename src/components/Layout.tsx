import { Link, Outlet } from 'react-router-dom'
import { CONTENT_REVISION } from '../data/content'

export function Layout() {
  return (
    <div
      className="site theme-figma"
      data-portfolio-app="vite-react"
      data-portfolio-revision={CONTENT_REVISION}
    >
      {import.meta.env.DEV ? (
        <div className="dev-build-banner" role="status">
          <span className="dev-build-banner__label">Local dev</span>
          <span className="dev-build-banner__rev">{CONTENT_REVISION}</span>
          <span className="dev-build-banner__hint">
            Nav first link must say “Portfolio”; MagicDiary summary must mention Magicbricks. If
            not, empty cache or use a private window.
          </span>
        </div>
      ) : null}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header site-header--figma">
        <Link className="wordmark wordmark--figma" to="/">
          Jaison Thomas
        </Link>
        <nav className="site-nav site-nav--figma" aria-label="Primary">
          <Link to="/#work">Portfolio</Link>
          <Link to="/#writings">Writings</Link>
          <Link to="/#about">About</Link>
        </nav>
      </header>

      <Outlet />

      <footer className="site-footer site-footer--figma">
        <div className="site-footer-inner">
          <span>© {new Date().getFullYear()} Jaison Thomas</span>
          <span className="site-footer-revision" title="If this line is missing or wrong, the browser is not running the latest build from this project.">
            {CONTENT_REVISION}
          </span>
        </div>
      </footer>
    </div>
  )
}
