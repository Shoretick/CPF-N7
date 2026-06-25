import { Link } from 'react-router-dom'
import styles from './LocationSection.module.css'

const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Centro+de+Formaci%C3%B3n+Profesional+CFP+N%C2%B07+Ramsay+2250,+C1428+Cdad.+Aut%C3%B3noma+de+Buenos+Aires,+Argentina&hl=es&z=16&output=embed'

export default function LocationSection() {
  return (
    <section className={styles.section} id="ubicacion" aria-labelledby="ubicacion-titulo">
      <div className={styles.card}>
        <h2 className={styles.title} id="ubicacion-titulo">
          ¿Donde nos encontramos?
        </h2>

        <div className={styles.divider} role="separator" aria-hidden="true" />

        <p className={styles.description}>
          Ingresar por Dragones 2201 durante todo el dia o bien por Ramsay 2250 hasta
          las 13 hs.
        </p>

        <h3 className={styles.subtitle}>Mapa</h3>

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

        <h3 className={styles.subtitle}>Mapa interactivo accesible</h3>

        <div className={styles.actions}>
          <button type="button" className={styles.buttonPrimary}>
            Recorre el CFP N° 7
          </button>
          <Link to="/mapa" className={styles.buttonSecondary}>
            ¿Como llego al aula?
          </Link>
        </div>
      </div>
    </section>
  )
}
