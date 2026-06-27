
import { useState } from 'react'
import { useVoiceAnnouncement } from '../context/AccessibilityContext'
import AccessibilityButton from '../components/AccessibilityButton'
import InteractiveMapNavbar from '../components/InteractiveMapNavbar'
import styles from './AccessDyR.module.css'


import ico1S4 from "../../recursos/llaveIcon.png"
import ico2S4 from "../../recursos/cocineroIcon.png"

import AccRamsay from "../../recursos/AccRamsay.jpg"
import AccDragones from "../../recursos/AccDragones.jpg"






const COURSES = Array.from({ length: 8 }, (_, i) => `Curso ${i + 1}`)



const SPACE_CARDS = [
  [
    { id: 'Baño Commun', label: 'Baño Comun', img1: AccRamsay, icon: ClassroomIcon  },
    { id: 'taller', label: 'Taller', icon: WorkshopIcon, img2: AccDragones } , 
  
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
 
] as const

const UTILITY_CARDS = [
  {
    id: 'u1',
    title: 'Baños',
    description: 'Baños para estudiantes',
    icon: RestroomIcon,
    image:ico1S4,
    cardClass: styles.utilityCard1,
  },
  {
    id: 'u2',
    title: 'Baño Accesible',
    description: 'baño adaptado para personas con discapacidad',
    icon: RestroomIcon,
    cardClass: styles.utilityCard2,
  },
  {
    id: 'u3',
    title: 'Primeros auxilios',
    description: 'Botiquin y atencion de emergencias.',
    icon: RestroomIcon,
    cardClass: styles.utilityCard3,
  },
  {
    id: 'u4',
    title: "Agua potable",
    description: 'Puntos de agua disponibles',
    icon: RestroomIcon,
    cardClass: styles.utilityCard4,
  },
  {
    id: 'u5',
    title: 'Extintores y seguridad',
    description: 'Elementos de seguridad',
    icon: RestroomIcon,
    cardClass: styles.utilityCard5,
  },
] as const

export default function AccessDyR () {
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
          <h1 className={styles.mobileTitle}>Seleccioná tu acceso</h1>

          <div className={styles.selectWrapper}>
            
          </div>


          <div className={styles.spaceGrid}>
            {SPACE_CARDS.map((column, colIndex) => (
              <div key={colIndex} className={styles.spaceColumn}>
                {column.map((space) => {
                 
                  const isSelected = selectedSpace === space.label

                  return (
                    <button
                      
                    
                      className={`${styles.spaceCard} ${isSelected ? styles.spaceCardSelected : ''}`}
                      onClick={() => handleSpaceSelect(space.label)}
                    >{ space.img1? 

                     <div className={styles.cont1}>
                      <div style={{width:"40%", backgroundColor:'blue'}}>
                        <img src=  {space.img1} alt="img" width="100%" height="100%" ></img>
                      </div>
                      <div style={{width:"45%", }}> 
                        <h2>Acceso Ramsay</h2>
                        <h4>calle Ramsay 2250</h4>
                        <div style={{width:"75%", backgroundColor:"#E2A900"}}>
                          <span >Este acceso está abierto</span>
                        <span>desde las 9 AM hasta 6 PM</span>
                        </div>
                        
                      </div>
                      <div style={{width:"15%"}}>
                       <input type="checkbox" id="mi-check" name="opcion"></input>
                      </div>

                      
                      
                    </div>


                    : 
                    <div className={styles.cont1} >
                      <div style={{width:"40%", backgroundColor:'blue'}}>
                        <img src=  {space.img2} alt="img" width="100%" height="100%" ></img>
                      </div>
                      <div style={{width:"45%", }}> 
                        <h2>Acceso Ramsay</h2>
                        <h4>calle Ramsay 2250</h4>
                        <div style={{width:"90%", backgroundColor:"#E2A900", borderRadius:"10%"}}>
                          <span >Este acceso está abierto desde las 9 AM hasta 6 PM</span>
                        <span></span>
                        </div>
                        
                      </div>
                      <div style={{width:"15%",margin:"4%"}}>
                       <input type="checkbox" id="mi-check" name="opcion"></input>
                      </div>

                      
                      
                    </div>
                  
                    }
                      
                      
                      
                    </button>
                  )
                })}
              </div>
            ))}
          </div>




          <button type="button" className={styles.planButton}>
            <span>Quiero ir acá</span>
            <ArrowRightIcon />
          </button>
        </main>
      </div>










      <div className={styles.desktopLayout}>
        <div className={styles.desktopContent}>
          <section className={styles.desktopLeft}>
            <h1 className={styles.desktopTitle}>Baño Común (Sanitarios Sector 3) </h1>

            <h2 className={styles.desktopSectionTitle}>Normas de Anticipación/Accesibilidad Cognitiva</h2>

         

         
          </section>

          <aside className={styles.desktopRight}>
            <div className={styles.floorPlanCard}>
            
              <div className={styles.floorPlanImageSlot} aria-label="Plano del edificio">

              <div className= {styles.contImg}>
                <img
                 src={AccRamsay}
                 alt="Mapa del edificio"
                 width={"100%"} // Ajusta el ancho según tus necesidades
                 height={"100%"} // Ajusta el alto según tus necesidades
                 style={{ borderRadius:"10%" }}
                  />
              </div>

               <div className= {styles.contText}>
              <h1 className={styles.floorPlanTitle1}>ANTES DE INGRESAR DEBE: </h1>
              <h2 className={styles.floorPlanTitle}><span>✅</span> Transitar por el pasillo de forma ordenada.</h2>
              <h2 className={styles.floorPlanTitle}><span>✅</span> Mantener la higiene del sector</h2>
              <h2 className={styles.floorPlanTitle}><span>✅</span> Respetar las indicaciones visuales y cartelería.</h2>
              <h2 className={styles.floorPlanTitle}><span>✅</span> Consultar al docente o bedel ante cualquier duda.</h2>
              
               </div>
        
       
       
              </div >
              <div  className={styles.contbotton}>
              <button type="button" className={styles.planButton1}>
              <span>Quiero ir acá</span>
              <ArrowRightIcon />
              </button>
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
    <svg className={styles.utilityIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.5 3C6.67 3 6 3.67 6 4.5S6.67 6 7.5 6 9 5.33 9 4.5 8.33 3 7.5 3zM16.5 3C15.67 3 15 3.67 15 4.5S15.67 6 16.5 6 18 5.33 18 4.5 17.33 3 16.5 3zM12 7c-1.66 0-3 1.34-3 3v1H7v10h2v-4h6v4h2V11h-2v-1c0-1.66-1.34-3-3-3zm-1 3h2v-1c0-.55-.45-1-1-1s-1 .45-1 1v1z"
      />
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
