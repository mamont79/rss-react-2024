import React, { useEffect, useState } from 'react';
import './style.css';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { LS_ITEM } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';
import { ThemeButton } from './themeButton';

interface HeaderProps {
  changeInput(input: string): void;
}

export const Header = ({ changeInput }: HeaderProps) => {
  const [inputValue, setInputValue] = useLocalStorage(LS_ITEM);
  const [valueInInput, setValueInInput] = useState('');
  const [, setSearchParams] = useSearchParams();

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

  const onSearch = () => {
    setInputValue(valueInInput);
    if (valueInInput) setSearchParams({ search: valueInInput });
    if (!valueInInput) setSearchParams({});
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
      </div>
    </header>
  );
};
