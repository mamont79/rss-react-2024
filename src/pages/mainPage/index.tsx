import React, { useEffect, useCallback, useState } from 'react';
import { Header } from '../../components/header';
import { DisplayCards } from '../../components/display';
import './style.css';
import getOnePokemon from '../../api/getOnePokemon';
import getPokemons from '../../api/getPokemons';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { lsItem } from '../../constants/constants';
import { PokemonUrlData } from '../../types/types';
import { Pagination } from '../../components/pagination/pagination';

export const MainPage: React.FC = () => {
  const [inputValue, setInputValue] = useLocalStorage(lsItem);
  const [pokemonData, setPokemonData] = useState<PokemonUrlData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
      const data = await getPokemons(currentPage);
      console.log(data);
      setPokemonData(data);
    }
  }, [inputValue, currentPage]);

  useEffect(() => {
    console.log(inputValue);
    handleSearchClick();
  }, [handleSearchClick, inputValue]);

  const handleInput = (input: string) => {
    setInputValue(input);
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="wrapper">
      <Header changeInput={handleInput} />
      <Pagination currentPage={currentPage} changePage={handleCurrentPage} />
      <DisplayCards pokemonData={pokemonData} />
    </div>
  );
};
