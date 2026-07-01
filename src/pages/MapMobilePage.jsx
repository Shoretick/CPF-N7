import { useState, useRef, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
// Quitamos makeTransform de aquí para evitar el SyntaxError
import QuickPinchZoom from 'react-quick-pinch-zoom'
import AccessibilityButton from '../components/AccessibilityButton'
import InteractiveMapNavbar from '../components/InteractiveMapNavbar'
import styles from './MapMobilePage.module.css'

import mapaImg from '../../recursos/mapaHD.png'

export default function MapMobilePage() {
  const imgRef = useRef(null);
  
  // La librería pasa un objeto con los valores ya calculados, los aplicamos directamente
  const onUpdate = useCallback(({ x, y, scale }) => {
    if (imgRef.current) {
      imgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    }
  }, []);

  return (
    <div className={styles.page}>
      <InteractiveMapNavbar />
      
      <div className={styles.mobileFab}>
        <AccessibilityButton variant="floating" />
      </div>

      <div className={styles.mobileLayout}>
        <h1 className={styles.mobileTitle}>¿A dónde quieres ir?</h1>
      </div>

      <div className={styles.mapContainer}>
        <QuickPinchZoom onUpdate={onUpdate}>
          <div className={styles.zoomWrapper}>
            <img 
              ref={imgRef}
              src={mapaImg} 
              alt="Plano del edificio" 
              className={styles.mapImage}
            />
          </div>
        </QuickPinchZoom>
      </div>
      <div className={styles.contbotton}>
                <Link to="/inicio"type="button" className={styles.planButton} style={{ textDecoration: 'none' }}>
            <span>ir al Inicio</span>
            <ArrowIcon />
          </Link>
              </div>
    </div>
      
  )
}

function ArrowIcon() {
  return (
    <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
    </svg>
  )
}