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
  useAltColor, 
  botontext,
  img

}) => {
  return (
    <div className={styles.card}>
      {/* Gráfico/Icono de la izquierda */}
      <div className={`${styles.imagePlaceholder} ${useAltColor ? styles.bluePlaceholder : ''}`}>
        {/* Usamos un SVG simple emulando las puertas de tu captura */}
        <img src={img} className={styles.iconGraphic} >
          
        </img>
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
        
          <div className={styles.scheduleText}>
            <strong>{hours} </strong>
            
          </div>
        </div>

        <div className={styles.scheduleItem}>
          <span className={styles.scheduleIcon}>♿🧍🚗</span>
          <div className={styles.scheduleText}>
            
            {days}
          </div>
        </div>

        <a href={buttonRoute} className={`${styles.actionBtn} ${useAltColor ? styles.blueBtn : ''}`}>
           {botontext}
        </a>
      </div>
    </div>
  );
};

export default AccessCard;