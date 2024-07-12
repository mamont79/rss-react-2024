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
import { useNavigate, useParams } from 'react-router-dom';
import { OutOfAmount } from '../outOfAmount/outOfAmount';

export const MainPage: React.FC = () => {
  const { page } = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const pageFromParams = page ? parseInt(page, 10) : 1;
  const maxPage = 66;
  const [inputValue, setInputValue] = useLocalStorage(lsItem);
  const [pokemonData, setPokemonData] = useState<PokemonUrlData[]>([]);
  const [currentPage, setCurrentPage] = useState(pageFromParams);

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
      const data = await getPokemons(Number(page));
      console.log(data);
      setPokemonData(data);
    }
  }, [inputValue, page]);

  const handleInput = (input: string) => {
    setInputValue(input);
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
    navigate(`/page/${page}`);
  };

  useEffect(() => {
    handleSearchClick();
  }, [handleSearchClick, inputValue]);

  return (
    <div className="wrapper">
      <Header changeInput={handleInput} />
      <Pagination currentPage={currentPage} changePage={handleCurrentPage} />
      {Number(page) <= maxPage ? (
        <DisplayCards pokemonData={pokemonData} />
      ) : (
        <OutOfAmount />
      )}
    </div>
  );
};
