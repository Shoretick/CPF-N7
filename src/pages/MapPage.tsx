
import { useState } from 'react'
import { useVoiceAnnouncement } from '../context/AccessibilityContext'
import AccessibilityButton from '../components/AccessibilityButton'
import InteractiveMapNavbar from '../components/InteractiveMapNavbar'
import styles from './MapPage.module.css'

import mapaDelEdificio from "../../recursos/mapaHD.png"
import ico1S4 from "../../recursos/llaveIcon.png"
import ico2S4 from "../../recursos/cocineroIcon.png"
import ico3S4 from "../../recursos/pcIcon.png"
import ico4S4 from "../../recursos/bancosIcon.png"
import { Link } from 'react-router-dom'




const COURSES = Array.from({ length: 8 }, (_, i) => `Curso ${i + 1}`)


const SPACE_CARDS = [
  [
    { id: 'aula', label: 'Aula', icon: ClassroomIcon },
    { id: 'taller', label: 'Taller', icon: WorkshopIcon },
    { id: 'recreo', label: 'Recreo', icon: PlaygroundIcon },
  ],
  [
    { id: 'cocina', label: 'Cocina', icon: KitchenIcon },
    { id: 'informatica', label: 'Informatica', icon: ComputerIcon },
    { id: 'informacion', label: 'Informacion', icon: InfoIcon },
  ],
] as const

const SECTOR_CARDS = [
  {
    id: 's1',
    code: 'S1',
    name: 'Talleres',
    image:ico1S4,
    description: 'Espacios de formacion tecnica y practica',
    icon: WrenchIcon,
    cardClass: styles.sectorCardS1,
  },
  {
    id: 's2',
    code: 'S2',
    name: 'Cocina',
    image:ico2S4,
    description: 'Cocina, Pasteleria y Cocteleria',
    icon: WrenchIcon,
    cardClass: styles.sectorCardS2,
  },
  {
    id: 's3',
    code: 'S3',
    name: 'Administración / Informatica	',
    image:ico3S4,
    description: 'Oficinas administrativas e informática',
    icon: WrenchIcon,
    cardClass: styles.sectorCardS3,
  },
  {
    id: 's4',
    code: 'S4',
    name: 'Patio y Buffet',
    image:ico4S4,
    description: 'Patio principal y servicio de buffet',
    icon: WrenchIcon,
    cardClass: styles.sectorCardS4,
  },
] as const

const UTILITY_CARDS = [
  {
    id: 'u1',
    title: 'Baños',
    description: 'Baños para estudiantes',
    link:"/bcomun",
    icon: RestroomIcon,
    image:ico1S4,
    cardClass: styles.utilityCard1,
  },
  {
    id: 'u2',
    title: 'Baño Accesible',
    description: 'baño adaptado para personas con discapacidad',
    link:null,
    icon: RestroomIcon,
    cardClass: styles.utilityCard2,
  },
  {
    id: 'u3',
    title: 'Primeros auxilios',
    description: 'Botiquin y atencion de emergencias.',
    link:null,
    icon: RestroomIcon,
    cardClass: styles.utilityCard3,
  },
  {
    id: 'u4',
    title: "Agua potable",
    description: 'Puntos de agua disponibles',
    link:null,
    icon: RestroomIcon,
    cardClass: styles.utilityCard4,
  },
  {
    id: 'u5',
    title: 'Extintores y seguridad',
    description: 'Elementos de seguridad',
    link:null,
    icon: RestroomIcon,
    cardClass: styles.utilityCard5,
  },
] as const

export default function MapPage() {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)
  const announce = useVoiceAnnouncement()

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

      <div className={styles.mobileLayout}>
        <main className={styles.mobileMain}>
          <h1 className={styles.mobileTitle}>¿A donde quieres ir?</h1>

          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value)
                if (e.target.value) announce(`Curso seleccionado: ${e.target.value}`)
              }}
            >
              <option value="" disabled>
                selecciona por curso
              </option>
              {COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <h2 className={styles.mobileSubtitle}>
            selecciona el tipo de espacio que buscas
          </h2>

          <div className={styles.spaceGrid}>
            {SPACE_CARDS.map((column, colIndex) => (
              <div key={colIndex} className={styles.spaceColumn}>
                {column.map((space) => {
                  const Icon = space.icon
                  const isSelected = selectedSpace === space.label

                  return (
                    <button
                      key={space.id}
                      type="button"
                      className={`${styles.spaceCard} ${isSelected ? styles.spaceCardSelected : ''}`}
                      onClick={() => handleSpaceSelect(space.label)}
                    >
                      <Icon />
                      <span className={styles.spaceLabel}>{space.label}</span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          <button type="button" className={styles.planButton}>
            <span>Ver el plano del Centro</span>
            <ArrowRightIcon />
          </button>
        </main>
      </div>

      <div className={styles.desktopLayout}>
        <div className={styles.desktopContent}>
          <section className={styles.desktopLeft}>
            <h1 className={styles.desktopTitle}>¿A donde quieres ir?</h1>

            <h2 className={styles.desktopSectionTitle}>SECTORES PRINCIPALES</h2>

            <div className={styles.sectorGrid}>
              {SECTOR_CARDS.map((sector) => {
                //const Icon = sector.icon

                return (
                  <button
                    key={sector.id}
                    type="button"
                    className={`${styles.sectorCard} ${sector.cardClass}`}
                  >
                    <span className={styles.sectorCode}>{sector.code}</span>
                    <div className={styles.sectorIconWrap}>
                      <img src={sector.image} width="60%" />
                    </div>
                    <div className={styles.sectorFooter}>
                      <div className={styles.sectorTextGroup}>
                        <h3 className={styles.sectorName}>{sector.name}</h3>
                        <p className={styles.sectorDescription}>{sector.description}</p>
                      </div>
                      <span className={styles.sectorArrow} aria-hidden="true">
                        &gt;
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className={styles.utilityGrid}>
              {UTILITY_CARDS.map((utility) => {
                const Icon = utility.icon

                return (
                  <Link to ={utility.link} style={{ textDecoration: 'none' }} >
                  <div
                    key={utility.id}
                  
                    className={`${styles.utilityCard} ${utility.cardClass}`}
                  >
                    
            
          
                    <div className={styles.utilityTop}>
                    <div>
                      <Icon />
                      </div>
                      <h3 className={styles.utilityTitle}>{ utility.title}</h3>

                      
                    </div>
                    <div className={styles.utilityFooter}>
                      <p className={styles.utilityDescription}>{utility.description}</p>
                      <span className={styles.utilityArrow} aria-hidden="true">
                        &gt; 
                      </span>
                    </div>
                    
                  </div>

                  </Link>
                )
              })}
            </div>
          </section>

          <aside className={styles.desktopRight}>
            <div className={styles.floorPlanCard}>
              <h2 className={styles.floorPlanTitle}>PLANO GENERAL DEL ESTABLECIMIENTO</h2>
              <div className={styles.floorPlanImageSlot} aria-label="Plano del edificio">
              
                {mapaDelEdificio ? (
        <img
          src={mapaDelEdificio}
          alt="Mapa del edificio"
          width={"100%"} // Ajusta el ancho según tus necesidades
          height={"100%"} // Ajusta el alto según tus necesidades
        />
      ) : (
        <span className={styles.floorPlanPlaceholder}>Mapa del edificio</span>
      )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function WrenchIcon() {
  return (
    <svg className={styles.sectorIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.7 19.3 17.4 14l1.4-1.4 2.1 2.1 4.2-4.2 1.4 1.4-5.8 5.8zM4 20h9v-2H4v2zm0-4h6v-2H4v2zm0-4h6v-2H4v2zm10-6H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
      />
    </svg>
  )
}

function RestroomIcon() {
  return (
    <svg className={styles.utilityIcon} viewBox="0 0 24 24" aria-hidden="true"fill="none" stroke="#2C3E50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
  <path d="M12 4v4"></path>
  <path d="M9 12h6"></path>
  <path d="M12 16v4"></path>
    </svg>
  )
}

function ClassroomIcon() {
  return (
    <svg className={styles.spaceIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z"
      />
    </svg>
  )
}

function WorkshopIcon() {
  return (
    <svg className={styles.spaceIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.7 19.3 17.4 14l1.4-1.4 2.1 2.1 4.2-4.2 1.4 1.4-5.8 5.8zM4 20h9v-2H4v2zm0-4h6v-2H4v2zm0-4h6v-2H4v2zm10-6H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
      />
    </svg>
  )
}

function PlaygroundIcon() {
  return (
    <svg className={styles.spaceIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
      />
    </svg>
  )
}

function KitchenIcon() {
  return (
    <svg className={styles.spaceIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18 2.01 8 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-1.99-2-1.99zM16 20H8V4h8v16zm-4.5-9c.83 0 1.5-.67 1.5-1.5S12.33 8 11.5 8 10 8.67 10 9.5 10.67 11 11.5 11z"
      />
    </svg>
  )
}

function ComputerIcon() {
  return (
    <svg className={styles.spaceIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"
      />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg className={styles.spaceIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
      />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
      />
    </svg>
  )
}
