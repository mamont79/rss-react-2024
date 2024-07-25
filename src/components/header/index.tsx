import React, { useEffect, useState } from 'react';
import './style.css';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { LS_ITEM } from '../../constants/constants';
import { useParams, useSearchParams } from 'react-router-dom';
import { ThemeButton } from './themeButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  getOnePokemonAsync,
  getPokemonsAsync,
} from '../../store/pokemons/pokemonSlice';
import { FlyOut } from './flyOut';

interface HeaderProps {
  changeInput(input: string): void;
}

export const Header = ({ changeInput }: HeaderProps) => {
  const [inputValue, setInputValue] = useLocalStorage(LS_ITEM);
  const [valueInInput, setValueInInput] = useState('');
  const [, setSearchParams] = useSearchParams();
  const { amount } = useSelector((state: RootState) => state.selected);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<Record<string, string>>();
  const { page } = params;

  useEffect(() => {
    let start = true;
    if (start) {
      setValueInInput(inputValue);
      start = false;
      if (inputValue) setSearchParams({ search: inputValue });
      if (!inputValue) setSearchParams({});
    }
  }, [inputValue, setSearchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValueInInput(newValue);
  };

  const handleEnterPress = (event: React.KeyboardEvent) => {
    const keyPress = event.key;
    if (keyPress === 'Enter') onSearch();
  };

  const onSearch = async () => {
    setInputValue(valueInInput);
    if (valueInInput) {
      setSearchParams({ search: valueInInput });
      await dispatch(getOnePokemonAsync(valueInInput));
    }
    if (!valueInInput) {
      setSearchParams({});
      await dispatch(getPokemonsAsync(Number(page)));
    }
    changeInput(valueInInput);
  };

  return (
    <header className="header">
      <div className="search-wrapper">
        <ThemeButton />
        <input
          className="search-input"
          value={valueInInput || ''}
          onChange={handleInputChange}
          onKeyUp={handleEnterPress}
          placeholder="Find your pokemon"
        />
        <button onClick={onSearch} className="search-button">
          Search
        </button>
        <div className="flyout-wrapper">{amount > 0 ? <FlyOut /> : ''}</div>
      </div>
    </header>
  );
};
