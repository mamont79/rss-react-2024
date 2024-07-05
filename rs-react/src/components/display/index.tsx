import React from 'react';
import MainContext from '../../pages/mainPage/context';
import { MainContextType, PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';
import getPokemons from '../../api/getPokemons';
import getOnePokemon from '../../api/getOnePokemon';
import { lsItem } from '../../constants/constants';

export class DisplayCards extends React.Component {
  static contextType = MainContext;
  declare context: MainContextType;

  componentDidMount = async () => {
    const savedSearchPokemon = localStorage.getItem(lsItem);
    if (savedSearchPokemon) {
      const data = await getOnePokemon(savedSearchPokemon.toLowerCase());
      this.context.updateData([
        {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        },
      ]);
    } else {
      const data = await getPokemons();
      this.context.updateData(data);
    }
  };

  render() {
    const { data } = this.context;

    return (
      <div className="display">
        {data.map((el: PokemonUrlData) => (
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
  }
}
