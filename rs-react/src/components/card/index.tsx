import React from 'react';
import { PokemonCardProps } from '../../types/types';
import './style.css';
import geOnePokemon from '../../api/getOnePokemon';

type PokemonCardState = { pictureUrl: string };

export class PokemonCard extends React.Component<
  PokemonCardProps,
  PokemonCardState
> {
  constructor(props: PokemonCardProps) {
    super(props);
    this.state = {
      pictureUrl: '',
    };
  }

  componentDidMount = async () => {
    const id = Number(this.props.pokemonsCard.url.split('/').reverse()[1]);
    const data = await geOnePokemon(id);
    console.log(data);
    const cardData = `${id}`;
    this.setState({ pictureUrl: cardData });
  };

  getOne = async () => {
    const data = await geOnePokemon(1);
    console.log(data);
  };

  render() {
    return (
      <div className="card">
        <button onClick={this.getOne}>get one</button>
        <p>{this.props.pokemonsCard.name}</p>
        <p>{this.props.pokemonsCard.url}</p>
        <p>{this.state.pictureUrl}</p>
      </div>
    );
  }
}
