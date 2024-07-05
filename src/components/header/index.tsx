import React from 'react';
import { MainContextType } from '../../types/types';
import MainContext from '../../pages/mainPage/context';
import ErrorBoundary from '../../errorBoundary';
import ButtonMistake from './buttonMistake';
import './style.css';
import getOnePokemon from '../../api/getOnePokemon';
import getPokemons from '../../api/getPokemons';
import { lsItem } from '../../constants/constants';

type HeaderState = {
  inputValue: string;
};

export class Header extends React.Component<unknown, HeaderState> {
  static contextType = MainContext;
  declare context: MainContextType;

  placeholderValue: string;

  constructor(props: unknown) {
    super(props);
    this.placeholderValue = 'Find your pokemon';
    this.state = {
      inputValue: '',
    };
  }

  componentDidMount() {
    const savedSearchPokemon = localStorage.getItem(lsItem);
    if (savedSearchPokemon) {
      this.setState({ inputValue: savedSearchPokemon });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    this.setState({ inputValue: newValue });
    localStorage.setItem('searchPokemon', newValue);
  };

  handleSearchClick = async () => {
    if (this.state.inputValue) {
      const data = await getOnePokemon(this.state.inputValue.toLowerCase());
      this.context.updateData([
        {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        },
      ]);
    } else {
      const data = await getPokemons();
      this.context.updateData(data);
    }
  };

  render() {
    return (
      <header className="header">
        <div className="search-wrapper">
          <ErrorBoundary>
            <ButtonMistake />
          </ErrorBoundary>
          <input
            className="search-input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder={this.placeholderValue}
          />
          <button onClick={this.handleSearchClick} className="search-button">
            Search
          </button>
        </div>
      </header>
    );
  }
}
