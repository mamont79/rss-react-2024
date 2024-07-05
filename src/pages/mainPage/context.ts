import React from 'react';
import { MainContextType } from '../../types/types';

const MainContext = React.createContext<MainContextType | undefined>(undefined);

export default MainContext;
