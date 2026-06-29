import React from 'react';
import { AccessCard } from './AccessCard';
import { VirtualTourButton } from './VirtualTourButton';
import './AccessSelection.css';
import image1 from "../../../recursos/AccDragones.jpg"
import image2 from "../../../recursos/AccRamsay.jpg"

export const AccessSelection = () => {
  // Datos simulados (reemplaza las imágenes con tus rutas locales o URLs)
  const accesses = [
    {
      id: 1,
      title: "Acceso Ramsay",
      address: "Calle Ramsay 2250",
      image: image2, // Reemplaza por tu imagen de Ramsay
      scheduleText: "Este acceso está abierto desde 9 AM hasta 6 PM",
      route: "/accesor360", // <-- Coloca tu ruta aquí
      isChecked: true
    },
    {
      id: 2,
      title: "Acceso Dragones",
      address: "Calle Dragones 2201",
      image: image1, // Reemplaza por tu imagen de Dragones
      route: "/accesod360", // <-- Coloca tu ruta aquí
      isChecked: false
    }
  ];

  return (
    <div className="mobile-container">
      <h2 className="main-title">Seleccioná tu acceso</h2>
      
      <div className="cards-space">
        {accesses.map((access) => (
          <AccessCard
            key={access.id}
            title={access.title}
            address={access.address}
            image={access.image}
            scheduleText={access.scheduleText}
            route={access.route}
            isChecked={access.isChecked}
          />
        ))}
      </div>

      <div className="button-space">
        <VirtualTourButton route="/Inicio" /> {/* <-- Coloca tu ruta aquí */}
      </div>
    </div>
  );
};

export default AccessSelection;