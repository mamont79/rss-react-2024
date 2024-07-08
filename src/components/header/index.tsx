import React, { useContext, useEffect } from 'react';
import { MainContextType } from '../../types/types';
import MainContext from '../../pages/context';
import ErrorBoundary from '../../errorBoundary';
import ButtonMistake from './buttonMistake';
import './style.css';
import getOnePokemon from '../../api/getOnePokemon';
import getPokemons from '../../api/getPokemons';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { lsItem } from '../../constants/constants';

export const Header: React.FC = () => {
  const context = useContext(MainContext) as MainContextType;
  const [inputValue, setInputValue] = useLocalStorage(lsItem);

  useEffect(() => {
    handleSearchClick();
    console.log('it me');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleEnterPress = (event: React.KeyboardEvent) => {
    const keyPress = event.key;
    if (keyPress === 'Enter') handleSearchClick();
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
          value={inputValue || ''}
          onChange={handleInputChange}
          onKeyUp={handleEnterPress}
          placeholder="Find your pokemon"
        />
        <button onClick={handleSearchClick} className="search-button">
          Search
        </button>
      </div>
    </header>
  );
};
