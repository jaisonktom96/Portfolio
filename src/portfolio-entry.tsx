import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CONTENT_REVISION } from './data/content'
import './index.css'
import App from './App.tsx'

if (import.meta.env.DEV) {
  console.info(
    '[portfolio] dev bundle, minimalist hero landing, revision:',
    CONTENT_REVISION,
    '(LandingPage.tsx, if revision mismatches or you see the old Figma Saturn hero, run npm run dev:clean)',
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
