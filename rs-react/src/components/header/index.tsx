import React from 'react';
import getPokemons from '../../api/getPokemons';
import { MainContextType } from '../../types/types';
import MainContext from '../../pages/mainPage/context';

export class Header extends React.Component {
  static contextType = MainContext;
  declare context: MainContextType;

  handleInputChange = async () => {
    const data = await getPokemons();
    this.context.updateData(data);
  };

  render() {
    return (
      <header>
        <div />
        <button onClick={this.handleInputChange}>Get pokemons</button>
      </header>
    );
  }
}

// event: ChangeEvent<HTMLInputElement>
