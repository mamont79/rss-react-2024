import React, { useState, useEffect } from 'react';
import { PokemonCardProps } from '../../types/types';
import './style.css';
import getOnePokemon from '../../api/getOnePokemon';
import { LoaderCard } from './loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSelected,
  removeFromSelected,
} from '../../store/pokemons/selectedSlice';
import { RootState } from '../../store/store';

type PokemonStats = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonCardState = {
  pictureUrl: string;
  pokemonHeight: string;
  pokemonWeight: string;
  pokemonType: string;
  pokemonId: string;
  isLoading: boolean;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemonsCard,
  onCheckboxChange,
}) => {
  const { selectedData } = useSelector((state: RootState) => state.selected);
  const dispatch = useDispatch();
  const [state, setState] = useState<PokemonCardState>({
    pictureUrl: '',
    pokemonHeight: '',
    pokemonWeight: '',
    pokemonType: '',
    pokemonId: '',
    isLoading: true,
  });
  const [isChecked, setIsChecked] = useState<boolean | undefined>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsChecked(!isChecked);
    onCheckboxChange(event);
    const currentPokemon = [
      {
        name: pokemonsCard.name,
        url: pokemonsCard.url,
      },
    ];
    if (isChecked) {
      dispatch(removeFromSelected(currentPokemon));
    } else {
      dispatch(addSelected(currentPokemon));
    }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const id = Number(pokemonsCard.url.split('/').reverse()[1]);
      const data = await getOnePokemon(id);
      if (data) {
        const types = data.types.map((type: PokemonStats) => type.type.name);
        setState({
          pictureUrl: data.sprites.front_default,
          pokemonHeight: data.height,
          pokemonWeight: data.weight,
          pokemonType: types.join(', '),
          pokemonId: `${id}`,
          isLoading: false,
        });
      }
    };
    const selectCheck = selectedData.findIndex(
      (item) => item.name === pokemonsCard.name
    );
    if (selectCheck >= 0) setIsChecked(true);
    fetchPokemon();
  }, [pokemonsCard.name, pokemonsCard.url, selectedData]);

  return (
    <div className="pokemon-card">
      {state.isLoading ? (
        <LoaderCard />
      ) : (
        <>
          <p className="pokemon-name">{pokemonsCard.name}</p>
          <div className="img-wrapper">
            <div className="pokemon-id">{state.pokemonId}</div>
            <img src={state.pictureUrl} className="pokemon-img" />
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChange}
              className="select-pokemon"
            />
          </div>
          <p className="pokemon-stats">Height: {state.pokemonHeight}</p>
          <p className="pokemon-stats">Weight: {state.pokemonWeight}</p>
          <p className="pokemon-stats">Type: {state.pokemonType}</p>
        </>
      )}
    </div>
  );
};
