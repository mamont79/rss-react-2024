import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DisplayCards } from '../../../components/display/index';

// import { PokemonUrlData } from '../../../types/types';

// const mockPokemons: PokemonUrlData[] = [
//   { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
//   { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
// ];

describe('DisplayCards Component', () => {
  it('should display loading state', () => {
    render(
      <MemoryRouter>
        <DisplayCards />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should display pokemons when data is available', () => {
    render(
      <MemoryRouter>
        <DisplayCards />
      </MemoryRouter>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });
});
