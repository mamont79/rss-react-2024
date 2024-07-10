import React, { useEffect, useState } from 'react';
import ErrorBoundary from '../../errorBoundary';
import ButtonMistake from './buttonMistake';
import './style.css';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { lsItem } from '../../constants/constants';

interface HeaderProps {
  changeInput(input: string): void;
}

export const Header = ({ changeInput }: HeaderProps) => {
  const [inputValue, setInputValue] = useLocalStorage(lsItem);
  const [valueInInput, setValueInInput] = useState('');

  useEffect(() => {
    let start = true;
    if (start) {
      setValueInInput(inputValue);
      start = false;
    }
    changeInput(inputValue);
  }, [changeInput, inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValueInInput(newValue);
  };

  const handleEnterPress = (event: React.KeyboardEvent) => {
    const keyPress = event.key;
    if (keyPress === 'Enter') onSearch();
  };

  const onSearch = () => {
    setInputValue(valueInInput);
    changeInput(inputValue);
  };

  return (
    <header className="header">
      <div className="search-wrapper">
        <ErrorBoundary>
          <ButtonMistake />
        </ErrorBoundary>
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
      </div>
    </header>
  );
};
