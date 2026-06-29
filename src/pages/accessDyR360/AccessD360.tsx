import Navbar from '../../components/Navbar'
import LocationSectionDyR from '../../components/LocationSectionDyR' 
import styles from './AccessR360.module.css'

export default function AccessD360 () {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main} id="inicio">
       

        <LocationSectionDyR description={"Acceso por Dragones 2201 durante todo el dia "} title={"Acceso por Dragones 2201"} MAP_EMBED_URL={"https://www.google.com/maps/embed?pb=!4v1782722246425!6m8!1m7!1s3QK8Ztq-FScbdt6A0OAJEQ!2m2!1d-34.55173648070282!2d-58.44193453451932!3f87.02581283164648!4f-3.7999488145567!5f1.743996629979049"}
/>
      </main>
    </div>
  )
}
