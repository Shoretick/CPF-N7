
import LocationSectionDyR from '../../components/LocationSectionDyR' 
import styles from './Marzipano.module.css'
import InteractiveMapNavbar from '../../components/InteractiveMapNavbar'
import AccessibilityButton from '../../components/AccessibilityButton'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useVoiceAnnouncement } from '../../context/AccessibilityContext'
import { sectoresData } from "../../data/sectoresData"

export default function Marzipano () {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)
  const announce = useVoiceAnnouncement()
  const { sectorId } = useParams();

  // 1. Buscamos el sector en el diccionario de datos
  const infoSector = sectoresData[sectorId || ''];
  
  // 2. CONTROL DE SEGURIDAD: Si no existe el sector, evitamos que la app se rompa
  if (!infoSector) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
        <h2>⚠️ Error: Sector "{sectorId}" no configurado</h2>
        <p>Asegúrate de agregar la clave exacta en tu archivo sectoresData.js</p>
        <Link to="/inicio">Volver al inicio</Link>
      </div>
    );
  }
  return (

    <div className={styles.page}>
      <InteractiveMapNavbar />
      <div className={styles.mobileFab}>
        <AccessibilityButton variant="floating" />
      </div>
      <main className={styles.main} id="inicio">
       

        <LocationSectionDyR description={infoSector.description} title={infoSector.title} urlbtn1="/mapa"
MAP_EMBED_URL={infoSector.url}
/>
      </main>
    </div>
  )
}





 