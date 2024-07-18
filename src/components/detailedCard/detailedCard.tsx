import { useEffect, useState } from 'react';
import getOnePokemon from '../../api/getOnePokemon';
import { PokemonDetailedType, StatsType } from './types';
import { LoaderCard } from '../card/loader';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';

export const DetailedCard = () => {
  const params = useParams<Record<string, string>>();
  const { page, details } = params;
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<PokemonDetailedType | null>();
  const [state, setState] = useState<boolean>(true);

  useEffect(() => {
    console.log(details);
    const fetchData = async () => {
      if (details) {
        const data = await getOnePokemon(details);

        setPokemon(data);
        setState(false);
      }
    };
    fetchData();
  }, [details]);

  const onCloseCard = () => {
    navigate(`/page/${page}`);
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
