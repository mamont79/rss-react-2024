import { useEffect, useState } from 'react';
import getOnePokemon from '../../api/getOnePokemon';
import { DetailedProps, PokemonDetailedType, StatsType } from './types';
import { LoaderCard } from '../card/loader';
import './style.css';

export const DetailedCard = ({
  changeActive,
  destroyPokemon,
  pokemonId,
}: DetailedProps) => {
  const [pokemon, setPokemon] = useState<PokemonDetailedType | null>();
  const [state, setState] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (pokemonId) {
        const data = await getOnePokemon(pokemonId);
        
        setPokemon(data);
        setState(false);
      }
    };
    fetchData();
  }, [pokemonId]);

  const onCloseCard = () => {
    changeActive!(false);
    destroyPokemon!(null);
  };

  return (
    <div className="detailed-card">
      {state ? (
        <LoaderCard />
      ) : (
        <>
          <p className="detailed-title">
            Detailes for {pokemon?.name.toUpperCase()}:
          </p>
          <img src={pokemon?.sprites.front_default} className="pokemon-img" />
          <p className="stat">Height: {pokemon?.height}</p>
          <p className="stat">Weight: {pokemon?.weight}</p>
          <p className="stat">Base exp: {pokemon?.base_experience}</p>
          {pokemon?.stats.map((stat: StatsType) => (
            <p className="stat" key={stat.stat.name}>
              {stat.stat.name} : {stat.base_stat}
            </p>
          ))}
          <div onClick={onCloseCard} className="detailed-close">
            Close X
          </div>
        </>
      )}
    </div>
  );
};
