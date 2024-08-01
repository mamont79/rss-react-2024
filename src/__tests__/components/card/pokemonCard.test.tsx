import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PokemonCard } from '../../../components/card/index';
import { RootState } from '../../../store/store';
import getOnePokemon from '../../../api/getOnePokemon';

jest.mock('../../../api/getOnePokemon');

const initialState: RootState = {
  selected: {
    amount: 0,
    selectedData: [],
  },
  pokemons: {
    count: 0,
    pokemonData: [],
    isLoading: false,
  },
  page: {
    value: 1,
  },
  pokemonsApi: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      reducerPath: 'pokemonsApi',
      online: true,
      focused: true,
      middlewareRegistered: true,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      keepUnusedDataFor: 60,
      invalidationBehavior: 'delayed',
    },
  },
};

const store = configureStore({
  reducer: {
    selected: (state = initialState.selected) => state,
    pokemons: (state = initialState.pokemons) => state,
    page: (state = initialState.page) => state,
    pokemonsApi: (state = initialState.pokemonsApi) => state,
  },
  preloadedState: initialState,
});

const mockPokemonData = {
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon/25/',
};

const mockApiResponse = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
};

describe('PokemonCard Component', () => {
  beforeEach(() => {
    (getOnePokemon as jest.Mock).mockResolvedValue(mockApiResponse);
  });

  it('renders loading state initially', () => {
    render(
      <Provider store={store}>
        <PokemonCard
          pokemonsCard={mockPokemonData}
          onCheckboxChange={() => {}}
        />
      </Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders pokemon data after loading', async () => {
    render(
      <Provider store={store}>
        <PokemonCard
          pokemonsCard={mockPokemonData}
          onCheckboxChange={() => {}}
        />
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 60/i)).toBeInTheDocument();
    expect(screen.getByText(/type: electric/i)).toBeInTheDocument();
  });

  it('toggles checkbox and updates the selected state', async () => {
    const onCheckboxChange = jest.fn();

    render(
      <Provider store={store}>
        <PokemonCard
          pokemonsCard={mockPokemonData}
          onCheckboxChange={onCheckboxChange}
        />
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
    );

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(onCheckboxChange).toHaveBeenCalled();
    expect(store.getState().selected.selectedData).toHaveLength(0);

    fireEvent.click(checkbox);
    expect(onCheckboxChange).toHaveBeenCalled();
    expect(store.getState().selected.selectedData).toHaveLength(0);
  });
});
