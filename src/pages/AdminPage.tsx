import Navbar from '../components/InteractiveMapNavbar' 
import styles from './Adminpage.module.css'

export default function AdminPage () {
  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.main} id="inicio" style={{  width: "100%", height:"100%"}}>
        

          <iframe
            className={styles.marzipanoContainer}
            title="Ubicación del Centro de Formación Profesional CFP N° 7 en Ramsay 2250, Buenos Aires"
            src="/admin-app/index.html"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            style={{  width: "100%", height:"100%"}}
          />
        
       

       

      </div>
    </div>
  )
}





 