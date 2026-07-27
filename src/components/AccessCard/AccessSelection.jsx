import React from 'react';
import { AccessCard } from './AccessCard';
import { VirtualTourButton } from './VirtualTourButton';
import './AccessSelection.css';
import image1 from "../../../recursos/ENTRADA DRAGONES.png"
import image2 from "../../../recursos/ENTRADA RAMSEY.png"

export const AccessSelection = () => {
  // Datos simulados (reemplaza las imágenes con tus rutas locales o URLs)
  const accesses = [
    {
      id: 1,
      title: "Acceso Ramsay",
      address: "Ramsay 2250 Entre calles Mendoza y Blanco Encalada",
      image: image2, // Reemplaza por tu imagen de Ramsay
      scheduleText: "🕒 08:00 a 18:00",
      route: "/accesor360", // <-- Coloca tu ruta aquí
      isChecked: true
    },
    {
      id: 2,
      title: "Acceso Dragones",
      address: "Dragones 2201 Esquina Mendoza",
      image: image1, // Reemplaza por tu imagen de Dragones
      scheduleText: "🕒 08:00 a 22:00",
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