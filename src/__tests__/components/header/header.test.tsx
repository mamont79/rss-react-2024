import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../../../components/header/index';
import { RootState } from '../../../store/store';

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
});

describe('Header Component', () => {
  it('renders input field', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header changeInput={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByPlaceholderText(/find your pokemon/i)
    ).toBeInTheDocument();
  });

  it('renders Search button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header changeInput={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('renders ThemeButton component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header changeInput={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/classic/i)).toBeInTheDocument(); // Assuming ThemeButton has text
  });

  it('renders FlyOut component if amount > 0', () => {
    const updatedState: RootState = {
      ...initialState,
      selected: {
        amount: 1,
        selectedData: [],
      },
    };

    const updatedStore = configureStore({
      reducer: {
        selected: (state = updatedState.selected) => state,
        pokemons: (state = updatedState.pokemons) => state,
        page: (state = updatedState.page) => state,
        pokemonsApi: (state = updatedState.pokemonsApi) => state,
      },
    });

    render(
      <Provider store={updatedStore}>
        <MemoryRouter>
          <Header changeInput={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/selected:/i)).toBeInTheDocument(); // Assuming FlyOut has text
  });
});
