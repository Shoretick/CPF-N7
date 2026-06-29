import React from 'react';
import './AccessSelection.css'; // Compartirán el mismo archivo de estilos

export const AccessCard = ({ image, title, address, route, scheduleText, isChecked }) => {
  return (
    <a href={route} className="access-card-link">
      <div className={`access-card ${isChecked ? 'selected' : ''}`}>
        <div className="card-image-container">
          <img src={image} alt={title} className="card-image" />
        </div>
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{title}</h3>
            <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`}></div>
          </div>
          <p className="card-address">{address}</p>
          
          {scheduleText && (
            <div className="schedule-badge">
              {scheduleText}
            </div>
          )}
        </div>
      </div>
    </a>
  );
};