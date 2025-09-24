import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { TripsProvider } from './context/TripsContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TripsProvider>
        <App />
      </TripsProvider>
    </BrowserRouter>
  </StrictMode>
)
