import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { FlyOut } from '../../../components/header/flyOut';
import { convertToCSV } from '../../../components/header/converToCsv';
import { RootState } from '../../../store/store';
import { resetAll } from '../../../store/pokemons/selectedSlice';

jest.mock('../../../components/header/converToCsv', () => ({
  convertToCSV: jest.fn(),
}));

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
    pokemons: {
      count: 0,
      pokemonData: [],
      isLoading: false,
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

    fireEvent.click(screen.getByText(/Unselect All/i));

    const actions = store.getActions();
    expect(actions).toEqual([resetAll()]);
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
