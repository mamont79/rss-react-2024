import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonUrlData } from '../../types/types';
import { getTotalPokemons } from '../../api/getPokemons';
import getOnePokemon from '../../api/getOnePokemon';

type PokemonState = {
  count: number;
  pokemonData: PokemonUrlData[];
  isLoading: boolean;
};

const initialState: PokemonState = {
  count: 0,
  pokemonData: [],
  isLoading: true,
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setTotalAmount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setPokemonData(state, action: PayloadAction<PokemonUrlData[]>) {
      state.pokemonData = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPokemonsAsync.fulfilled,
      (state, action: PayloadAction<PokemonUrlData[]>) => {
        state.pokemonData = [...action.payload];
        state.isLoading = false;
      }
    );
    builder.addCase(
      getOnePokemonAsync.fulfilled,
      (state, action: PayloadAction<PokemonUrlData[]>) => {
        state.pokemonData = [...action.payload];
        state.isLoading = false;
      }
    );
  },
});

export const getPokemonsAsync = createAsyncThunk<
  PokemonUrlData[],
  number,
  { rejectValue: string }
>('pokemons/getPokemonsAsync', async (currentPage: number, { dispatch }) => {
  const totalData = await getTotalPokemons(currentPage);
  dispatch(setTotalAmount(totalData.count));
  return totalData.results;
});

export const getOnePokemonAsync = createAsyncThunk<
  PokemonUrlData[],
  string,
  { rejectValue: string }
>('pokemons/getOnePokemonAsync', async (pokemon: string) => {
  const onePokemonData = await getOnePokemon(pokemon);
  const currentPokemon = [
    {
      name: onePokemonData.name,
      url: `https://pokeapi.co/api/v2/pokemon/${onePokemonData.id}/`,
    },
  ];
  return currentPokemon;
});

export const { setTotalAmount, setPokemonData } = pokemonSlice.actions;

export default pokemonSlice.reducer;
