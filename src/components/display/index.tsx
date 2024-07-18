import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';
import { useCallback, useEffect, useState } from 'react';
import getOnePokemon from '../../api/getOnePokemon';
import getPokemons from '../../api/getPokemons';

export const DisplayCards = () => {
  const params = useParams<Record<string, string>>();
  const { page } = params;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pokemons, setPokemons] = useState<PokemonUrlData[]>([]);

  const setCurrentId = (url: string) => {
    const id = Number(url.split('/').reverse()[1]);
    return () => navigate(`/page/${page}/details/${id}`);
  };

  const handleSearch = useCallback(async () => {
    const param = searchParams.get('search');
    console.log(param);
    if (param) {
      const data = await getOnePokemon(param.toLowerCase());
      const searchedPokemon = [
        {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        },
      ];
      setPokemons(searchedPokemon);
    } else {
      const data = await getPokemons(Number(page));
      setPokemons(data);
    }
  }, [page, searchParams]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchParams]);

  return (
    <div className="display">
      {pokemons!.map((el: PokemonUrlData) => (
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
