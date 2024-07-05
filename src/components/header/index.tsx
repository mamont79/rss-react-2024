import React, { useState, useEffect, useContext } from 'react';
import { MainContextType } from '../../types/types';
import MainContext from '../../pages/context';
import ErrorBoundary from '../../errorBoundary';
import ButtonMistake from './buttonMistake';
import './style.css';
import getOnePokemon from '../../api/getOnePokemon';
import getPokemons from '../../api/getPokemons';
import { lsItem } from '../../constants/constants';

export const Header: React.FC = () => {
  const context = useContext(MainContext) as MainContextType;
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const savedSearchPokemon = localStorage.getItem(lsItem);
    if (savedSearchPokemon) {
      setInputValue(savedSearchPokemon);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    localStorage.setItem(lsItem, newValue);
  };

  const handleSearchClick = async () => {
    if (inputValue) {
      const data = await getOnePokemon(inputValue.toLowerCase());
      context.updateData([
        {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        },
      ]);
    } else {
      const data = await getPokemons();
      context.updateData(data);
    }
  };

  return (
    <header className="header">
      <div className="search-wrapper">
        <ErrorBoundary>
          <ButtonMistake />
        </ErrorBoundary>
        <input
          className="search-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Find your pokemon"
        />
        <button onClick={handleSearchClick} className="search-button">
          Search
        </button>
      </div>
    </header>
  );
};
