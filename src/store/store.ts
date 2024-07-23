import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemons/pokemonSlice';

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
