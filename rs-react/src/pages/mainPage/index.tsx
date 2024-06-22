import React from 'react';
import { Header } from '../../components/header';
import { Display } from '../../components/display';
import MainContext from './context';
import { MainContextType, PokemonUrlData } from '../../types/types';

export class MainPage extends React.Component<{}, MainContextType> {
  constructor(props: {}) {
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
        <div>
          <Header />

          <Display />
        </div>
      </MainContext.Provider>
    );
  }
}
