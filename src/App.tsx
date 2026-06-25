import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AccessibilityProvider } from './context/AccessibilityContext'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'

export default function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  )
}
