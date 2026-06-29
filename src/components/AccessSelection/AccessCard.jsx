import React from 'react';
import styles from './AccessCard.module.css';

export const AccessCard = ({ 
  title, 
  description, 
  isOpen, 
  hours, 
  days, 
  cardRoute, 
  buttonRoute,
  useAltColor 
}) => {
  return (
    <div className={styles.card}>
      {/* Gráfico/Icono de la izquierda */}
      <div className={`${styles.imagePlaceholder} ${useAltColor ? styles.bluePlaceholder : ''}`}>
        {/* Usamos un SVG simple emulando las puertas de tu captura */}
        <svg className={styles.iconGraphic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3h18v18H3V3z" />
          <path d="M12 3v18M3 12h18" />
        </svg>
      </div>

      {/* Información Central */}
      <div className={styles.mainInfo}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        
        <div className={`${styles.statusBadge} ${isOpen ? styles.open : styles.closed}`}>
          <span className={isOpen ? styles.openCircle : styles.closedCircle}></span>
          {isOpen ? 'ABIERTO' : 'CERRADO'}
        </div>
      </div>

      {/* Horarios y Botón de la derecha */}
      <div className={styles.scheduleDetails}>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleIcon}>🕒</span>
          <div className={styles.scheduleText}>
            <strong>Horario de apertura</strong>
            {hours}
          </div>
        </div>

        <div className={styles.scheduleItem}>
          <span className={styles.scheduleIcon}>📅</span>
          <div className={styles.scheduleText}>
            <strong>Días</strong>
            {days}
          </div>
        </div>

        <a href={buttonRoute} className={`${styles.actionBtn} ${useAltColor ? styles.blueBtn : ''}`}>
          📍 Ver cómo llegar
        </a>
      </div>
    </div>
  );
};

export default AccessCard;