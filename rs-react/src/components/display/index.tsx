import React from 'react';
import MainContext from '../../pages/mainPage/context';
import { MainContextType, PokemonUrlData } from '../../types/types';
import { PokemonCard } from '../card';
import './style.css';
import getPokemons from '../../api/getPokemons';

export class Display extends React.Component {
  static contextType = MainContext;
  declare context: MainContextType;

  componentDidMount = async () => {
    const data = await getPokemons();
    this.context.updateData(data);
  };

  render() {
    const { data } = this.context;

    return (
      <div className="display">
        {data.map((el: PokemonUrlData) => (
          <div key={el.name}>
            <PokemonCard
              key={Number(el.url.split('/').reverse()[1])}
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
