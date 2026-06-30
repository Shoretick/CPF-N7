import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AccessibilityProvider } from './context/AccessibilityContext'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import BComun from './pages/BComun'
import AccessDyR from './pages/AccessDyR'
import AccessR360 from './pages/accessDyR360/AccessR360 '
import AccessD360 from './pages/accessDyR360/AccessD360'
import SectorID from './pages/SectorID'
import Marzipano from './pages/Marzipano360/Marzipano'
import Tour360 from './pages/Tour360'

export default function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/bcomun" element={<BComun />} />
           <Route path= "/sector/:sectorId" element={<SectorID />} />
          <Route path="/accesodyr" element={<AccessDyR />} />
          <Route path="/accesor360" element={<AccessR360 />} />
          <Route path="/accesod360" element={<AccessD360 />} />
          <Route path="/marzipano-360" element={<Marzipano />} />
           <Route path="/tour360" element={<Tour360 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  )
}
