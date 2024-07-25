import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemons/pokemonSlice';
import selectedReducer from './pokemons/selectedSlice';

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    selected: selectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
