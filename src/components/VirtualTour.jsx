import React, { useState, useEffect, useRef } from 'react';
import styles from './VirtualTour.module.css';

export default function VirtualTour({
  destinationName = "Gastronomía B",
  originName = "Acceso Ramsay",
  mapImageUrl,
  miniMapImageUrl,
  scenes = [],
  destinationChangeRoute = "#",
  originChangeRoute = "#",
  startNavigationRoute = "#",
  url,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const marzipanoRef = useRef(null);

  // Detectar el tamaño de pantalla para alternar layouts automáticamente
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hook para inicializar tu visor Marzipano de forma dinámica
  useEffect(() => {
    if (!isMobile && marzipanoRef.current && scenes.length > 0) {
      console.log("Inicializando Marzipano con escenas:", scenes);
    }
  }, [isMobile, scenes]);

  // RENDER VERSIÓN ESCRITORIO
  const renderDesktop = () => (
    <div className={styles.desktopLayout}>
      {/* Columna Izquierda: Plano */}
      <div>
        <h3 className={styles.columnTitle}>Plano de tu recorrido</h3>
        <div className={styles.mapWrapper}>
          <img src={mapImageUrl} alt="Plano del establecimiento" className={styles.mapImg} />
        </div>
      </div>

      {/* Columna Derecha: Vista 360° */}
      <div>
        <h3 className={styles.columnTitle}>Navegación virtual interactiva</h3>
        <div className={styles.viewer360}>
          <div ref={marzipanoRef} className={styles.marzipanoContainer} >

             <iframe
            className={styles.marzipanoContainer}
            title="Ubicación del Centro de Formación Profesional CFP N° 7 en Ramsay 2250, Buenos Aires"
            src={url}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />


          </div>


        </div>
      </div>
    </div>
  );

  // RENDER VERSIÓN MOBILE
  const renderMobile = () => (
    <div className={styles.mobileLayout}>
      <h3 className={styles.mobileSectionTitle}>Querés ir a</h3>
      
      <div className={styles.routeSelector}>
        <a href={destinationChangeRoute} className={styles.routeBtn}>
          {destinationName}
        </a>
        <a href={destinationChangeRoute} className={styles.changeLink}>Cambiar destino</a>
        
        <span className={styles.routeLabel}>desde</span>
        
        <a href={originChangeRoute} className={styles.routeBtn}>
          {originName}
        </a>
        <a href={originChangeRoute} className={styles.changeLink}>Cambiar origen</a>
      </div>

      <div className={styles.mapWrapper}>
        <img src={mapImageUrl} alt="Plano de navegación" className={styles.mapImg} />
      </div>
    </div>
  );

  return (
   
    <div className={styles.container}>
      {isMobile ? renderMobile() : renderDesktop()}

      {/* Botón común inferior */}
      <div className={styles.actionRow}>
        <a href={startNavigationRoute} className={styles.primaryActionBtn}>
         Terminar navegación <span className={styles.btnArrow}>→</span>
        </a>
      </div>
    </div>
  );
}