import { PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';

type PokemonDataType = {
  pokemonData?: PokemonUrlData[];
  getCurrentId?(pokemonId: number): void;
};

export const DisplayCards = ({
  pokemonData,
  getCurrentId,
}: PokemonDataType) => {
  const setCurrentId = (url: string) => {
    const id = Number(url.split('/').reverse()[1]);
    return () => getCurrentId!(id);
  };

  return (
    <div className="display">
      {pokemonData!.map((el: PokemonUrlData) => (
        <div key={el.name} onClick={setCurrentId(el.url)}>
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
