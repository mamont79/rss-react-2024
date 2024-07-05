import React, { useState } from 'react';
import { Header } from '../../components/header';
import { DisplayCards } from '../../components/display';
import MainContext from '../context';
import { MainContextType, PokemonUrlData } from '../../types/types';
import './style.css';

export const MainPage: React.FC = () => {
  const [data, setData] = useState<Array<PokemonUrlData>>([]);

  const updateData = (newData: Array<PokemonUrlData>) => {
    setData(newData);
  };

  const contextValue: MainContextType = {
    data,
    updateData,
  };

  return (
    <MainContext.Provider value={contextValue}>
      <div className="wrapper">
        <Header />
        <DisplayCards />
      </div>
    </MainContext.Provider>
  );
};
