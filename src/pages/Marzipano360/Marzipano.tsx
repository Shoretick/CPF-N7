import Navbar from '../../components/Navbar'
import LocationSectionDyR from '../../components/LocationSectionDyR' 
import styles from './Marzipano.module.css'

export default function Marzipano () {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main} id="inicio">
       

        <LocationSectionDyR description={"Entrada 360"} title={" Acceso por Ramsay 2250"}
         MAP_EMBED_URL={"/marzipano/entrada1-360/index.html"}
/>
      </main>
    </div>
  )
}





 