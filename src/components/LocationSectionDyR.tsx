import { Link } from 'react-router-dom'
import styles from './LocationSectionDyR.module.css'



export default function LocationSectionDyR( {MAP_EMBED_URL,title,description}) {
  return (
    <section className={styles.section} id="ubicacion" aria-labelledby="ubicacion-titulo">
      <div className={styles.card}>
        <h2 className={styles.title} id="ubicacion-titulo">
         {title}
        </h2>

        <div className={styles.divider} role="separator" aria-hidden="true" />

        <p className={styles.description}>
         {description}
        </p>

        <h3 className={styles.subtitle}>Vista 360</h3>

        <div className={styles.mapWrapper}>
          <iframe
            className={styles.map}
            title="Ubicación del Centro de Formación Profesional CFP N° 7 en Ramsay 2250, Buenos Aires"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        

        <div className={styles.actions}>
          
          <Link to="/inicio" className={styles.buttonPrimary}>
             Ir al Inicio
          </Link>
          <Link to="/accesoDyR" className={styles.buttonSecondary}>
           Accesos
          </Link>
        </div>
      </div>
    </section>
  )
}
