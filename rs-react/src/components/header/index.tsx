import React from 'react';
import getPokemons from '../../api/getPokemons';
import { MainContextType } from '../../types/types';
import MainContext from '../../pages/mainPage/context';
import ErrorBoundary from '../../errorBoundary';
import ButtonMistake from './buttonMistake';

interface HeaderProps {}

export class Header extends React.Component<HeaderProps> {
  static contextType = MainContext;
  declare context: MainContextType;

  placeholderValue: string;

  constructor(props: HeaderProps) {
    super(props);
    this.placeholderValue = 'Find your pokemon';
  }

  handleInputChange = async () => {
    const data = await getPokemons();
    this.context.updateData(data);
  };

  handleLocalStorage = () => {};

  setPlaceholder = () => {
    return 'this';
  };

  render() {
    return (
      <header>
        <input
          onChange={this.handleLocalStorage}
          placeholder={this.placeholderValue}
        />
        <button onClick={this.handleInputChange}>Get pokemons</button>

        <ErrorBoundary>
          <ButtonMistake />
        </ErrorBoundary>
      </header>
    );
  }
}
