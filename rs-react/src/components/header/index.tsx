import React from 'react';
import getPokemons from '../../api/getPokemons';

export class Header extends React.Component {
  render() {
    return (
      <>
        <div />
        <button onClick={getPokemons}>Get pokemons</button>
      </>
    );
  }
}
