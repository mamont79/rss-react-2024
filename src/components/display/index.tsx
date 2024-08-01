import { useParams, useNavigate } from 'react-router-dom';
import { PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { LoaderCard } from '../card/loader';
import { useGetPokemonsQuery } from '../../api/pokemonsApi';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { LS_ITEM } from '../../constants/constants';

export const DisplayCards = () => {
  const [inputValue] = useLocalStorage(LS_ITEM);

  const params = useParams<Record<string, string>>();
  const { page } = params;
  const navigate = useNavigate();
  const { pokemonData, isLoading } = useSelector(
    (state: RootState) => state.pokemons
  );
  const { data } = useGetPokemonsQuery(page || '1');
  console.log(data);

  let infoData: PokemonUrlData[];

  if (inputValue || !data) infoData = pokemonData;
  if (!inputValue && data) infoData = data.results;

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
        infoData!.map((el: PokemonUrlData) => (
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
