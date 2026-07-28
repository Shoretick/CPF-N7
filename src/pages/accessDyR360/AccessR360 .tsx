
import InteractiveMapNavbar from '../../components/InteractiveMapNavbar'
import LocationSectionDyR from '../../components/LocationSectionDyR' 
import styles from './AccessD360.module.css'
import AccessibilityButton from '../../components/AccessibilityButton'

export default function AccessR360 () {
  return (
    <div className={styles.page}>
      <InteractiveMapNavbar />
      <div className={styles.mobileFab}>
        <AccessibilityButton variant="floating" />
      </div>
      <main className={styles.main} id="inicio">
       

        <LocationSectionDyR urlbtn1= "/accesodyr"subtitle="Acceso Ramsay" description={"Usá las flechas táctiles para recorrer el espacio. Seguí las indicaciones de navegación y accedé a más información seleccionando los círculos que aparezcan en pantalla."} title={" Recorrido virtual del CFP N°7"} MAP_EMBED_URL={"/marzipano/Recorridos completos linkeados/Ramsay hasta puerta principal CFP/app-files/index.html"}
/>
      </main>
    </div>
  )
}





 