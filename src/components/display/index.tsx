import { useParams, useNavigate } from 'react-router-dom';
import { PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const DisplayCards = () => {
  const pokemonsData = useSelector(
    (state: RootState) => state.pokemons.pokemonData
  );

  const params = useParams<Record<string, string>>();
  const { page } = params;
  const navigate = useNavigate();

  const setCurrentId = (url: string) => {
    const id = Number(url.split('/').reverse()[1]);
    return () => navigate(`/page/${page}/details/${id}`);
  };

  return (
    <div className="display">
      {pokemonsData.map((el: PokemonUrlData) => (
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
