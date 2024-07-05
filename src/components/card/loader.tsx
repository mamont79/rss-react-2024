import React from 'react';
import './style.css';

export class LoaderCard extends React.Component {
  render() {
    return (
      <div className="loader">
        <div>Loading...</div>
        <img src="/pokeball_loader.png" className="pokeball-loader" />
      </div>
    );
  }
}
