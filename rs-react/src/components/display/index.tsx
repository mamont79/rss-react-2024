import React from 'react';
import MainContext from '../../pages/mainPage/context';
import { MainContextType, PokemonUrlData } from '../../types/types';

export class Display extends React.Component {
  static contextType = MainContext;
  declare context: MainContextType;

  render() {
    const { data } = this.context;

    return (
      <>
        <div>Display</div>

        {data.map((el: PokemonUrlData) => (
          <div key={el.name}>
            <div>
              {el.name} -- {el.url}
            </div>
          </div>
        ))}
      </>
    );
  }
}
