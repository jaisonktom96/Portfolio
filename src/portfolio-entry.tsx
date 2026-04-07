import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CONTENT_REVISION } from './data/content'
import './index.css'
import App from './App.tsx'

if (import.meta.env.DEV) {
  console.info(
    '[portfolio] CONTENT_REVISION (must match blue banner + footer):',
    CONTENT_REVISION,
    '— If the banner shows an older string, restart: npm run dev (or rm -rf node_modules/.vite && npm run dev).',
    'Using vite preview? Re-run npm run build first.',
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
