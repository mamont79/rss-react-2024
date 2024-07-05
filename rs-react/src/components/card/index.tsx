import React from 'react';
import { PokemonCardProps } from '../../types/types';
import './style.css';
import geOnePokemon from '../../api/getOnePokemon';
import { LoaderCard } from './loader';

type PokemonCardState = {
  pictureUrl: string;
  pokemonHeight: string;
  pokemonWeight: string;
  pokemonType: string;
  pokemonId: string;
  isLoading: boolean;
};

type PokemonStats = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export class PokemonCard extends React.Component<
  PokemonCardProps,
  PokemonCardState
> {
  constructor(props: PokemonCardProps) {
    super(props);
    this.state = {
      pictureUrl: '',
      pokemonHeight: '',
      pokemonWeight: '',
      pokemonType: '',
      pokemonId: '',
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const id = Number(this.props.pokemonsCard.url.split('/').reverse()[1]);
    const data = await geOnePokemon(id);
    if (data) {
      const types = data.types.map((type: PokemonStats) => type.type.name);
      this.setState({
        pictureUrl: data.sprites.front_default,
        pokemonHeight: data.height,
        pokemonWeight: data.weight,
        pokemonType: types.join(', '),
        pokemonId: `${id}`,
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <div className="pokemon-card">
        {this.state.isLoading ? (
          <LoaderCard />
        ) : (
          <>
            <p className="pokemon-name">{this.props.pokemonsCard.name}</p>
            <div className="img-wrapper">
              <div className="pokemon-id">{this.state.pokemonId}</div>
              <img src={this.state.pictureUrl} className="pokemon-img" />
            </div>
            <p className="pokemon-stats">Height: {this.state.pokemonHeight}</p>
            <p className="pokemon-stats">Weight: {this.state.pokemonWeight}</p>
            <p className="pokemon-stats">Type: {this.state.pokemonType}</p>
          </>
        )}
      </div>
    );
  }
}
