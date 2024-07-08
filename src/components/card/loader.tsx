import React from 'react';
import './style.css';

export const LoaderCard: React.FC = () => {
  return (
    <div className="loader">
      <div>Loading...</div>
      <img src="/pokeball_loader.png" className="pokeball-loader" />
    </div>
  );
};