import { PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';

type PokemonDataType = {
  pokemonData: PokemonUrlData[];
};

export const DisplayCards = ({ pokemonData }: PokemonDataType) => {
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
