import React from 'react';
import { Header } from '../../components/header';
import { Display } from '../../components/display';
import MainContext from './context';
import { MainContextType, PokemonUrlData } from '../../types/types';
import './style.css';

export class MainPage extends React.Component<unknown, MainContextType> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      data: [],
      updateData: this.updateData,
    };
  }

  updateData = (newData: Array<PokemonUrlData>) => {
    this.setState({ data: newData });
  };

  render() {
    return (
      <MainContext.Provider value={this.state}>
        <div className="wrapper">
          <Header />

          <Display />
        </div>
      </MainContext.Provider>
    );
  }
}
