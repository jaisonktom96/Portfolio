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
            Home loads <code className="dev-build-banner__code">LandingPage.tsx</code> +{' '}
            <code className="dev-build-banner__code">MinimalistHero</code> (black bg, yellow circle, white type).
            The old Saturn hero was removed from the repo. If you still see it, the browser is
            serving a stale bundle, run <code className="dev-build-banner__code">npm run dev:clean</code>{' '}
            and reload. Footer revision must match this banner.
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
