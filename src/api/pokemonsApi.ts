import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { API_LINK } from '../constants/constants';
import { PokemonUrlData } from '../types/types';

type PokemonState = {
  count: number;
  results: PokemonUrlData[];
};

const pokemonsPerPage = 20;

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_LINK }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonState, string>({
      query: (page: string) =>
        `?offset=${Number(page) * 20 - 20}&limit=${pokemonsPerPage}`,
    }),
    getPokemonByName: builder.query<PokemonState, string>({
      query: (page: string) =>
        `?offset=${Number(page) * 20 - 20}&limit=${pokemonsPerPage}`,
    }),
  }),
});

type UseGetPokemonsQueryType = (page: string) => {
  data?: PokemonState;
  error?: FetchBaseQueryError;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
};

export const { useGetPokemonsQuery } = pokemonsApi as {
  useGetPokemonsQuery: UseGetPokemonsQueryType;
};
