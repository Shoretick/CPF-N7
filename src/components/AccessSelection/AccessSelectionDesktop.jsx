import React, { useState } from 'react';
import AccessCard from './AccessCard';
import styles from './AccessSelectionDesktop.module.css';
import image1 from "../../../recursos/ENTRADA DRAGONES.png"
import image2 from "../../../recursos/ENTRADA RAMSEY.png"

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
             Seleccioná tu acceso
          </h2>
          <p className={styles.subtitle}>
            Cada acceso al predio cierra a un horario
distinto.
Usá el simulador de hora para saber si tu
acceso preferido estará abierto o
cerrado durante tu visita al CFP N°7
          </p>
        </div>

        <div className={styles.rightHeader}>
          {/* Alerta de Importante */}
          <div className={styles.infoBanner}>
           
           
          </div>

          {/* Simulador de hora */}
          <div className={styles.simulatorContainer}>
            <span>Simulador de hora:</span>
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
          description="Ramsay 2250 Entre calles Mendoza y Blanco Encalada."
          hours="🕒 08:00 a 18:00"
          isOpen={checkIfOpen("06:00 - 18:00")} // Evaluación dinámica
          days="Lunes a Viernes"
          buttonRoute="/accesor360" 
          useAltColor={false}
          botontext="Ingresar por Ramsay"
          img= {image2}

        />

        <AccessCard 
          title="Acceso Dragones"
          description="Ingreso lateral sobre calle Dragones."
          hours="🕒 08:00 a 22:00"
          isOpen={checkIfOpen("08:00 - 22:00")} // Evaluación dinámica
          days="Lunes a Viernes"
          buttonRoute="/accesod360" 
          useAltColor={true}
          botontext="Ingresar por Dragones"
          img={image1}
        />
      </section>

      {/* Botón Inferior */}
      <footer className={styles.bottomSection}>
        <a href="/inicio" className={styles.virtualTourBtn}><span className={styles.btnArrow}>← </span>
          Volver a la web del CFP N°7 
        </a>
      </footer>

    </div>
  );
};

export default AccessSelectionDesktop;