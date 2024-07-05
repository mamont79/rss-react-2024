import React from 'react';
import { MainContextType } from '../types/types';

const MainContext = React.createContext<MainContextType | null>(null);

export default MainContext;
