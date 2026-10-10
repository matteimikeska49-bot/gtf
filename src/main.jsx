import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Only the build browser supplies this flag. Visitors retain animations. */}
      <MotionConfig skipAnimations={typeof window.__GTF_PRERENDER_ROUTE === 'string'}>
        <App />
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
