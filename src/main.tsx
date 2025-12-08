import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { TripsProvider } from './context/TripsContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css';
import { ToastProvider } from './components/index.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TripsProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </TripsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
