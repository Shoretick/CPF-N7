import React from 'react';
import  AccessCard  from './AccessCard';
import styles from './AccessSelectionDesktop.module.css';
import { Link } from 'react-router-dom';

export const AccessSelectionDesktop= () => {
  return (
    <div className={styles.desktopContainer}>
      
      {/* Fila Superior: Título e Info Banner */}
      <header className={styles.headerRow}>
        <div className={styles.titleSection}>
          <h2 className={styles.mainTitle}>
            <span className={styles.titleIcon}>📍</span> Seleccioná tu acceso
          </h2>
          <p className={styles.subtitle}>
            Elegí por cuál acceso vas a ingresar para conocer cómo llegar y qué encontrarás en tu recorrido.
          </p>
        </div>

        <div className={styles.rightHeader}>
          {/* Alerta de Importante */}
          <div className={styles.infoBanner}>
            <span className={styles.infoIcon}>ⓘ</span>
            <div className={styles.infoText}>
              <strong>Importante</strong>
              <p>Los accesos pueden estar abiertos o cerrados según el horario.</p>
            </div>
          </div>

          {/* Simulador de hora */}
          <div className={styles.simulatorContainer}>
            <span>SIMULADOR DE HORA:</span>
            <input type="range" min="0" max="100" defaultValue="65" className={styles.slider} />
            <span className={styles.timeDisplay}>08:08 hs</span>
          </div>
        </div>
      </header>

      {/* Grilla de Accesos */}
      <section className={styles.cardsGrid}>
        <AccessCard 
          title="Acceso Ramsay"
          description="Ingreso principal sobre calle Ramsay."
          isOpen={true}
          hours="06:00 - 21:30"
          days="Lunes a Viernes"
          buttonRoute="/accesor360" 
          useAltColor={false}
        />

        <AccessCard 
          title="Acceso Dragones"
          description="Ingreso lateral sobre calle Dragones."
          isOpen={false}
          hours="07:00 - 19:00"
          days="Lunes a Viernes"
          buttonRoute="/accesod360" 
          useAltColor={true}
        />
      </section>

      {/* Botón Inferior */}
      <footer className={styles.bottomSection}>
        

        <a href="/inicio" className={styles.virtualTourBtn}>
          ir al Inicio <span className={styles.btnArrow}>→</span>
        </a>
        
      </footer>

    </div>
  );
};

export default AccessSelectionDesktop;