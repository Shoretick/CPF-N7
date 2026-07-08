import React, { useState } from 'react';
import AccessCard from './AccessCard';
import styles from './AccessSelectionDesktop.module.css';

export const AccessSelectionDesktop = () => {
  // Estado para los minutos del día (de 0 a 1439). 
  // Iniciamos a las 08:00 hs (8 * 60 = 480 minutos)
  const [simulatedMinutes, setSimulatedMinutes] = useState(480);

  // Convertir minutos totales a formato HH:MM
  const formatTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const simulatedTimeStr = formatTime(simulatedMinutes);

  // Función para determinar si el acceso está abierto según la hora simulada
  const checkIfOpen = (hoursRange) => {
    // Separa "06:00 - 21:30" en apertura y cierre
    const [openTime, closeTime] = hoursRange.split(' - ');
    
    const [openH, openM] = openTime.split(':').map(Number);
    const [closeH, closeM] = closeTime.split(':').map(Number);

    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    // Retorna true si los minutos simulados entran en el rango
    return simulatedMinutes >= openMinutes && simulatedMinutes <= closeMinutes;
  };

  const handleSliderChange = (e) => {
    setSimulatedMinutes(Number(e.target.value));
  };

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
            <input 
              type="range" 
              min="0" 
              max="1439" // 24 horas * 60 minutos - 1
              value={simulatedMinutes} 
              onChange={handleSliderChange}
              className={styles.slider} 
            />
            <span className={styles.timeDisplay}>{simulatedTimeStr} hs</span>
          </div>
        </div>
      </header>

      {/* Grilla de Accesos */}
      <section className={styles.cardsGrid}>
        <AccessCard 
          title="Acceso Ramsay"
          description="Ingreso principal sobre calle Ramsay."
          hours="06:00 - 21:30"
          isOpen={checkIfOpen("06:00 - 21:30")} // Evaluación dinámica
          days="Lunes a Viernes"
          buttonRoute="/accesor360" 
          useAltColor={false}
        />

        <AccessCard 
          title="Acceso Dragones"
          description="Ingreso lateral sobre calle Dragones."
          hours="07:00 - 19:00"
          isOpen={checkIfOpen("07:00 - 19:00")} // Evaluación dinámica
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