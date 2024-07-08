import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../../pages/context';
import { MainContextType, PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';

export const DisplayCards: React.FC = () => {
  const context = useContext(MainContext) as MainContextType;
  const [pokemonData, setPokemonData] = useState<PokemonUrlData[]>([]);

  useEffect(() => {
    setPokemonData(context.data);
    console.log(context.data);
  }, [context.data]);

  return (
    <div className="display">
      {pokemonData.map((el: PokemonUrlData) => (
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
