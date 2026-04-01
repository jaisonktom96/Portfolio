import { Link, Outlet, useLocation } from 'react-router-dom'
import { CONTENT_REVISION } from '../data/content'
import '../styles/home-figma.css'

export function Layout() {
  const location = useLocation()
  const hideChromeOnLanding = location.pathname === '/'

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
            Start the app with <code className="dev-build-banner__code">npm run dev</code> in this project
            folder, then open the URL Vite prints (usually{' '}
            <code className="dev-build-banner__code">http://localhost:4000</code>).
            Browser error <code className="dev-build-banner__code">-102</code> means nothing is listening —
            the dev server is not running. View Source (⌘⌥U):{' '}
            <code className="dev-build-banner__code">meta portfolio-disk-revision</code> should match the
            terminal <code className="dev-build-banner__code">[vite] Disk CONTENT_REVISION</code> line.
          </span>
        </div>
      ) : null}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {!hideChromeOnLanding ? (
        <header className="site-header site-header--figma">
          <Link className="wordmark wordmark--figma" to="/">
            Jaison Thomas
          </Link>
          <nav className="site-nav site-nav--figma" aria-label="Primary">
            <Link to="/#work">All works</Link>
          </nav>
        </header>
      ) : null}

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
