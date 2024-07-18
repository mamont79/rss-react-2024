import { createContext } from 'react';

type ThemeContext = 'classic' | 'golden';

export const themeContext = createContext<ThemeContext>('classic');
