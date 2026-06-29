import Navbar from '../../components/Navbar'
import LocationSectionDyR from '../../components/LocationSectionDyR' 
import styles from './AccessR360.module.css'

export default function AccessR360 () {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main} id="inicio">
       

        <LocationSectionDyR description={"Ingresar Ramsay 2250 hasta las 13 hs."} title={" Acceso por Ramsay 2250"} MAP_EMBED_URL={"https://www.google.com/maps/embed?pb=!4v1782716887833!6m8!1m7!1sWRDWWvJ2UWrMh8edU3FyLQ!2m2!1d-34.55039836578997!2d-58.44136499984281!3f238.8627463689382!4f-5.655751814795124!5f0.7820865974627469"}
/>
      </main>
    </div>
  )
}





 