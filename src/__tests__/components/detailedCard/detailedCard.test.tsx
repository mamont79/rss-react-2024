import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DetailedCard } from '../../../components/detailedCard/detailedCard';
import getOnePokemon from '../../../api/getOnePokemon';

jest.mock('../../../api/getOnePokemon');

const mockGetOnePokemon = getOnePokemon as jest.MockedFunction<
  typeof getOnePokemon
>;

const mockPokemon = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  sprites: {
    front_default: 'pikachu.png',
  },
  stats: [
    {
      stat: { name: 'speed' },
      base_stat: 90,
    },
  ],
};

describe('DetailedCard component', () => {
  beforeEach(async () => {
    await act(async () => {
      mockGetOnePokemon.mockResolvedValue(mockPokemon);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/pikachu']}>
        <Routes>
          <Route
            path="/page/:page/details/:details"
            element={<DetailedCard />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders pokemon details after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/pikachu']}>
        <Routes>
          <Route
            path="/page/:page/details/:details"
            element={<DetailedCard />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(mockGetOnePokemon).toHaveBeenCalledWith('pikachu')
    );

    expect(screen.getByText('Detailes for PIKACHU:')).toBeInTheDocument();
    expect(screen.getByText('Height: 4')).toBeInTheDocument();
    expect(screen.getByText('Weight: 60')).toBeInTheDocument();
    expect(screen.getByText('Base exp: 112')).toBeInTheDocument();
    expect(screen.getByText('speed : 90')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'pikachu.png');
  });

  it('navigates back when close button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/pikachu']}>
        <Routes>
          <Route
            path="/page/:page/details/:details"
            element={<DetailedCard />}
          />
          <Route path="/page/1" element={<div>Page 1</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(mockGetOnePokemon).toHaveBeenCalledWith('pikachu')
    );

    fireEvent.click(screen.getByText('Close X'));

    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });
});
