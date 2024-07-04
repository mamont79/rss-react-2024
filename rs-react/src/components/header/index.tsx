import React from 'react';
import { MainContextType } from '../../types/types';
import MainContext from '../../pages/mainPage/context';
import ErrorBoundary from '../../errorBoundary';
import ButtonMistake from './buttonMistake';
import './style.css';
import getOnePokemon from '../../api/getOnePokemon';

interface HeaderProps {}

interface HeaderState {
  inputValue: string;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  static contextType = MainContext;
  declare context: MainContextType;

  placeholderValue: string;

  constructor(props: HeaderProps) {
    super(props);
    this.placeholderValue = 'Find your pokemon';
    this.state = {
      inputValue: '',
    };
  }

  componentDidMount() {
    const savedSearchPokemon = localStorage.getItem('searchPokemon');
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
    const data = await getOnePokemon(this.state.inputValue);
    console.log(data);
    // this.context.updateData(data);
  };

  render() {
    return (
      <header className="header">
        <input
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder={this.placeholderValue}
        />
        <button onClick={this.handleSearchClick}>Search</button>
        <ErrorBoundary>
          <ButtonMistake />
        </ErrorBoundary>
      </header>
    );
  }
}
