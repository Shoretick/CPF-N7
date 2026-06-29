import Navbar from '../components/Navbar'
import LocationSection from '../components/LocationSection'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main} id="inicio">
        <h1 className={styles.welcome}>Bienvenido al CFP N.° 7</h1>
        <p className={styles.description}>
          Formación profesional en navegación asistida y accesibilidad.
        </p>

        <LocationSection MAP_EMBED_URL={'https://maps.google.com/maps?q=Centro+de+Formaci%C3%B3n+Profesional+CFP+N%C2%B07+Ramsay+2250,+C1428+Cdad.+Aut%C3%B3noma+de+Buenos+Aires,+Argentina&hl=es&z=16&output=embed'}
/>
      </main>
    </div>
  )
}
