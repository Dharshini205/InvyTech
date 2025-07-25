import React from 'react';
import './Card.css';

const Card = ({ icon, title }) => {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
