import { useParams, useNavigate } from 'react-router-dom';
import { PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { LoaderCard } from '../card/loader';

export const DisplayCards = () => {
  const { pokemonData, isLoading } = useSelector(
    (state: RootState) => state.pokemons
  );

  const params = useParams<Record<string, string>>();
  const { page } = params;
  const navigate = useNavigate();

  const setCurrentId = (url: string) => {
    const id = Number(url.split('/').reverse()[1]);
    return () => navigate(`/page/${page}/details/${id}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement>,
    url: string
  ) => {
    if (!(event.target as HTMLElement).closest('input[type="checkbox"]')) {
      setCurrentId(url)();
    }
  };

  return (
    <div className="display">
      {isLoading ? (
        <LoaderCard />
      ) : (
        pokemonData.map((el: PokemonUrlData) => (
          <div
            key={el.name}
            onClick={(event) => handleCardClick(event, el.url)}
          >
            <PokemonCard
              pokemonsCard={{
                name: el.name,
                url: el.url,
              }}
              onCheckboxChange={handleChange}
            />
          </div>
        ))
      )}
    </div>
  );
};
