import { Dispatch, SetStateAction } from 'react';

export type ThemeType = 'classic' | 'golden';

enum Color {
  RED = '#ff0000',
  GOLD = '#f8c213',
  WHITE = '#ffffff',
  YELLOW = '#ffcb05',
  BLACK = '#2c1616',
  GOLDBACK = '#f6724e',
  GREY = '#213547',
  DARK_YELLOW = '#fcdc25',
  DARK_GOLD = '#b8860b',
  LIGHT_RED = '#fd5710',
  LIGHT_ORANGE = '#fc952e',
}

export type Theme = {
  '--primary': Color;
  '--secondary': Color;
  '--background': Color;
  '--color': Color;
  '--wrapper': Color;
  '--gradstart': Color;
  '--gradend': Color;
};

export type ThemeContextProps = {
  themeType: ThemeType;
  theme: Theme;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
};

export const THEMES: Record<ThemeType, Theme> = {
  classic: {
    '--primary': Color.RED,
    '--secondary': Color.GOLD,
    '--background': Color.YELLOW,
    '--color': Color.GREY,
    '--wrapper': Color.WHITE,
    '--gradstart': Color.LIGHT_RED,
    '--gradend': Color.LIGHT_ORANGE,
  },
  golden: {
    '--primary': Color.GOLD,
    '--secondary': Color.RED,
    '--background': Color.GOLDBACK,
    '--color': Color.WHITE,
    '--wrapper': Color.BLACK,
    '--gradstart': Color.DARK_GOLD,
    '--gradend': Color.DARK_YELLOW,
  },
};
