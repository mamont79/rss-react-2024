import { createContext, ReactNode, useContext, useState } from 'react';
import { ThemeContextProps, THEMES, ThemeType } from './contextTypes';

export const ThemeContext = createContext<ThemeContextProps>({
  themeType: 'classic',
  theme: THEMES['classic'],
} as ThemeContextProps);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('classic');

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        theme: THEMES[currentTheme],
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
