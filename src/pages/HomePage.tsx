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

        <LocationSection />
      </main>
    </div>
  )
}
