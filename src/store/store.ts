import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemons/pokemonSlice';
import selectedReducer from './pokemons/selectedSlice';
import pageReducer from './pokemons/pageSlice';
import { pokemonsApi } from '../api/pokemonsApi';

export const store = configureStore({
  reducer: {
    page: pageReducer,
    pokemons: pokemonReducer,
    selected: selectedReducer,
    [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonsApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
