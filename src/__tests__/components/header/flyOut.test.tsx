import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { FlyOut } from '../../../components/header/flyOut';
import { convertToCSV } from '../../../components/header/converToCsv';
import { resetAll } from '../../../store/pokemons/selectedSlice';
import { RootState } from '../../../store/store';

jest.mock('../../../components/header/converToCsv', () => ({
  convertToCSV: jest.fn(),
}));

jest.spyOn(console, 'error').mockImplementation((message) => {
  if (typeof message === 'string' && message.includes('act(...)')) {
    return;
  }
  console.error(message);
});

const mockStore = configureStore<RootState>();

describe('FlyOut', () => {
  let store: MockStoreEnhanced<RootState>;

  const initialState: RootState = {
    selected: {
      amount: 3,
      selectedData: [
        {
          id: '1',
          name: 'Bulbasaur',
          url: 'some.url',
          height: '5',
          weight: '10',
          type: 'Grass+Poison',
        },
        {
          id: '2',
          name: 'Bulbasaur',
          url: 'some.url',
          height: '5',
          weight: '10',
          type: 'Grass+Poison',
        },
        {
          id: '3',
          name: 'Bulbasaur',
          url: 'some.url',
          height: '5',
          weight: '10',
          type: 'Grass+Poison',
        },
      ],
    },
    page: { value: 1 },
    pokemons: {
      count: 0,
      pokemonData: [],
      isLoading: false,
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

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders the correct amount of selected items', () => {
    render(
      <Provider store={store}>
        <FlyOut />
      </Provider>
    );

    expect(screen.getByText(/Selected: 3/i)).toBeInTheDocument();
  });

  it('dispatches resetAll action when Unselect All button is clicked', () => {
    render(
      <Provider store={store}>
        <FlyOut />
      </Provider>
    );
    expect(screen.getByText(/Unselect All/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Unselect All/i));

    const actions = store.getActions();
    expect(actions).toContainEqual(resetAll());
  });

  it('creates a download link with correct CSV content when Download button is clicked', () => {
    const mockCsvUrl = 'blob:http://example.com/123456';
    (convertToCSV as jest.Mock).mockReturnValue(mockCsvUrl);

    render(
      <Provider store={store}>
        <FlyOut />
      </Provider>
    );

    const downloadLink = screen.getByText(/Download/i).closest('a');
    expect(downloadLink).toHaveAttribute('href', mockCsvUrl);
    expect(downloadLink).toHaveAttribute('download', '3_pokemons.csv');
  });
});
