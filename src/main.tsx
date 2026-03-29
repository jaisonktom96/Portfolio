import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CONTENT_REVISION } from './data/content'
import './index.css'
import App from './App.tsx'

if (import.meta.env.DEV) {
  console.info(
    '[portfolio] dev bundle loaded — content revision:',
    CONTENT_REVISION,
    '(if this mismatches the page, the browser cached an old module)',
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
