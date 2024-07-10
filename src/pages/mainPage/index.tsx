import React, { useEffect, useCallback, useState } from 'react';
import { Header } from '../../components/header';
import { DisplayCards } from '../../components/display';
import './style.css';
import getOnePokemon from '../../api/getOnePokemon';
import getPokemons from '../../api/getPokemons';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { lsItem } from '../../constants/constants';
import { PokemonUrlData } from '../../types/types';

export const MainPage: React.FC = () => {
  const [inputValue, setInputValue] = useLocalStorage(lsItem);
  const [pokemonData, setPokemonData] = useState<PokemonUrlData[]>([]);

  const handleSearchClick = useCallback(async () => {
    if (inputValue) {
      const data = await getOnePokemon(inputValue.toLowerCase());
      console.log(data);
      const searchedPokemon = [
        {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        },
      ];
      setPokemonData(searchedPokemon);
    } else {
      const data = await getPokemons();
      console.log(data);
      setPokemonData(data);
    }
  }, [inputValue]);

  useEffect(() => {
    console.log(inputValue);
    handleSearchClick();
  }, [handleSearchClick, inputValue]);

  const handleInput = (input: string) => {
    setInputValue(input);
  };

  return (
    <div className="wrapper">
      <Header changeInput={handleInput} />
      <DisplayCards pokemonData={pokemonData} />
    </div>
  );
};
