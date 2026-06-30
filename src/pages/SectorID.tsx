import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useVoiceAnnouncement } from '../context/AccessibilityContext'
import AccessibilityButton from '../components/AccessibilityButton'
import InteractiveMapNavbar from '../components/InteractiveMapNavbar'
import styles from './SectorID.module.css'
import { sectoresData } from "../data/sectoresData"

import imgBComun from "../../recursos/imgBcomun.png"
import imgBComun2 from "../../recursos/imgBcomun2.png"

const SPACE_CARDS = [
  [
    { id: 'Baño Commun', label: 'Baño Comun', img1: imgBComun, icon: ClassroomIcon },
    { id: 'taller', label: 'Taller', icon: WorkshopIcon, img2: imgBComun2 } 
  ]
] as const

export default function SectorID() {
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

  const handleSpaceSelect = (label: string) => {
    setSelectedSpace(label)
    announce(`Espacio seleccionado: ${label}`)
  }
 
  return (
    <div className={styles.page}>
      <InteractiveMapNavbar />
      <div className={styles.mobileFab}>
        <AccessibilityButton variant="floating" />
      </div>

      {/* --- VISTA MOBILE --- */}
      <div className={styles.mobileLayout}>
        <main className={styles.mobileMain}>
          <h1 className={styles.mobileTitle}>{infoSector.titulo}</h1>

          <div className={styles.selectWrapper}></div>

          <div className={styles.spaceGrid}>
            {SPACE_CARDS.map((column, colIndex) => (
              <div key={colIndex} className={styles.spaceColumn}>
                {column.map((space) => {
                  const isSelected = selectedSpace === space.label

                  return (
                    <button
                      key={space.id}
                      className={`${styles.spaceCard} ${isSelected ? styles.spaceCardSelected : ''}`}
                      onClick={() => handleSpaceSelect(space.label)}
                    >
                      {space.img1 ? (
                        <div>
                          {/* Cambiado para usar la imagen dinámica del sector */}
                          <img src={infoSector.imagen} alt="img" width="100%" height="80%" className={styles.img1} />
                        </div>
                      ) : (
                        <>
                          <div>
                            <img src={space.img2} alt="image" width="100%" height="100%" />
                          </div>
                          
                          <span className={styles.spaceLabel}>{space.label}</span>
                        </>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          <button type="button" className={styles.planButton}>
            <span>Quiero ir acá</span>
            <ArrowIcon />
          </button>
        </main>
      </div>

      {/* --- VISTA DESKTOP (¡Ahora también dinámica!) --- */}
      <div className={styles.desktopLayout}>
        <div className={styles.desktopContent}>
          <section className={styles.desktopLeft}>
            {/* TÍTULO DINÁMICO */}
            <h1 className={styles.desktopTitle}>{infoSector.titulo}</h1>
            <h2 className={styles.desktopSectionTitle}>Normas de Anticipación/Accesibilidad Cognitiva</h2>
          </section>

          <aside className={styles.desktopRight}>
            <div className={styles.floorPlanCard}>
              <div className={styles.floorPlanImageSlot} aria-label="Plano del edificio">
                <div className={styles.contImg}>
                  {/* IMAGEN DINÁMICA */}
                  <img
                    src={infoSector.imagen}
                    alt={`Mapa de ${infoSector.titulo}`}
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "10%" }}
                  />
                </div>

                <div className={styles.contText}>
                  <h1 className={styles.floorPlanTitle1}>ANTES DE INGRESAR DEBE:</h1>
                  
                  {/* MAPEO DINÁMICO DE NORMAS */}
                  {infoSector.normas && infoSector.normas.map((norma, index) => (
                    <h2 key={index} className={styles.floorPlanTitle}>
                      <span>✅</span> {norma}
                    </h2>
                  ))}
                </div>
              </div>
              
              <div className={styles.contbotton}>
                <Link to='/inicio' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <button type="button" className={styles.planButton1}>
                    <span>Quiero ir acá (inicio)</span>
                    <ArrowIcon />
                  </button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// --- Componentes de Apoyo de Íconos ---
function ClassroomIcon() {
  return (
    <svg className={styles.spaceIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z" />
    </svg>
  )
}

function WorkshopIcon() {
  return (
    <svg className={styles.spaceIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M22.7 19.3 17.4 14l1.4-1.4 2.1 2.1 4.2-4.2 1.4 1.4-5.8 5.8zM4 20h9v-2H4v2zm0-4h6v-2H4v2zm0-4h6v-2H4v2zm10-6H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
    </svg>
  )
}