import React, { useContext, useEffect } from 'react';
import MainContext from '../../pages/context';
import { MainContextType, PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';
import getPokemons from '../../api/getPokemons';
import getOnePokemon from '../../api/getOnePokemon';
import { lsItem } from '../../constants/constants';

export const DisplayCards: React.FC = () => {
  const context = useContext(MainContext) as MainContextType;
  const { data } = context;

  useEffect(() => {
    fetchPokemons();
  });

  const fetchPokemons = async () => {
    const savedSearchPokemon = localStorage.getItem(lsItem);
    if (savedSearchPokemon) {
      const data = await getOnePokemon(savedSearchPokemon.toLowerCase());
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
    <div className="display">
      {data.map((el: PokemonUrlData) => (
        <div key={el.name}>
          <PokemonCard
            pokemonsCard={{
              name: el.name,
              url: el.url,
            }}
          />
        </div>
      ))}
    </div>
  );
};
