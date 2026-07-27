import Navbar from '../../components/Navbar'
import InteractiveMapNavbar from '../../components/InteractiveMapNavbar'
import LocationSectionDyR from '../../components/LocationSectionDyR' 
import styles from './AccessD360.module.css'
import AccessibilityButton from '../../components/AccessibilityButton'

export default function AccessD360 () {
  return (
    <div className={styles.page}>
      <InteractiveMapNavbar />
      <div className={styles.mobileFab}>
        <AccessibilityButton variant="floating" />
      </div>
      <main className={styles.main} id="inicio">
       

        <LocationSectionDyR subtitle="Acceso Dragones" description={"Usá las flechas táctiles para recorrer el espacio. Seguí las indicaciones de navegación y accedé a más información seleccionando los círculos que aparezcan en pantalla."} title={" Recorrido virtual del CFP N°7"} MAP_EMBED_URL={"/marzipano/Recorridos completos linkeados/Dragones hasta puerta principal CFP/app-files/index.html"}
/>
      </main>
    </div>
  )
}
