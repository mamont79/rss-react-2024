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
import { DetailedCard } from '../../components/detailedCard/detailedCard';

export const MainPage: React.FC = () => {
  const { page } = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const pageFromParams = page ? parseInt(page, 10) : 1;
  const maxPage = 66;
  const [inputValue, setInputValue] = useLocalStorage(lsItem);
  const [pokemonData, setPokemonData] = useState<PokemonUrlData[]>([]);
  const [currentPage, setCurrentPage] = useState(pageFromParams);
  const [isActive, changeIsActive] = useState(false);
  const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null);

  const handleSearchClick = useCallback(async () => {
    if (inputValue) {
      const data = await getOnePokemon(inputValue.toLowerCase());
      const searchedPokemon = [
        {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        },
      ];
      setPokemonData(searchedPokemon);
    } else {
      const data = await getPokemons(Number(page));
      setPokemonData(data);
    }
  }, [inputValue, page]);

  const handleInput = (input: string) => {
    setInputValue(input);
  };

  const handleActivDetailedCard = (status: boolean) => {
    changeIsActive(status);
  };

  const setCurrentPokemon = (pokemonId: number) => {
    setCurrentPokemonId(pokemonId);
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
    navigate(`/page/${page}`);
  };

  const handleMainSectionClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    changeIsActive(false);
  };

  useEffect(() => {
    changeIsActive(currentPokemonId ? true : false);
    handleSearchClick();
  }, [handleSearchClick, inputValue, currentPokemonId]);

  return (
    <div className="wrapper">
      <Header changeInput={handleInput} />
      <Pagination currentPage={currentPage} changePage={handleCurrentPage} />
      <main className="main-wrapper">
        <div className='sub-wrapper' onClick={handleMainSectionClick}>
          {Number(page) <= maxPage ? (
            <DisplayCards
              pokemonData={pokemonData}
              getCurrentId={setCurrentPokemon}
            />
          ) : (
            <OutOfAmount />
          )}
        </div>
        {isActive ? (
          <DetailedCard
            changeActive={handleActivDetailedCard}
            destroyPokemon={setCurrentPokemon}
            pokemonId={currentPokemonId}
          />
        ) : null}
      </main>
    </div>
  );
};
