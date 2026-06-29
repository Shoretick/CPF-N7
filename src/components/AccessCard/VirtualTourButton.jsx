import React from 'react';
import './AccessSelection.css';

export const VirtualTourButton = ({ route, text = "Ir al Inicio" }) => {
  return (
    <a href={route} className="virtual-tour-btn">
      {text}
      <span className="btn-arrow">→</span>
    </a>
  );
};