
import InteractiveMapNavbar from '../components/InteractiveMapNavbar'
import LocationSection from '../components/LocationSection'
import styles from './HomePage.module.css'
import AccessibilityButton from '../components/AccessibilityButton'

export default function HomePage() {
  return (
    <div className={styles.page}>
      
      
      <InteractiveMapNavbar />
      <div className={styles.mobileFab}>
        <AccessibilityButton variant="floating" />
      </div>
      <main className={styles.main} id="inicio">
       

        <LocationSection MAP_EMBED_URL={'https://maps.google.com/maps?q=Centro+de+Formaci%C3%B3n+Profesional+CFP+N%C2%B07+Ramsay+2250,+C1428+Cdad.+Aut%C3%B3noma+de+Buenos+Aires,+Argentina&hl=es&z=16&output=embed'}
/>
      </main>
    </div>
  )
}
