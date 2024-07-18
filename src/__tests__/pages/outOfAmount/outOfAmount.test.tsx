import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { OutOfAmount } from '../../../pages/outOfAmount/outOfAmount';

describe('OutOfAmount component', () => {
  it('renders the out-of-amount messages and link', () => {
    render(
      <MemoryRouter>
        <OutOfAmount />
      </MemoryRouter>
    );

    expect(screen.getByText("It's out of our possibility")).toBeInTheDocument();
    expect(screen.getByText('Our pokemons are over')).toBeInTheDocument();
    expect(
      screen.getByText('Last pokemons you can find at')
    ).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: /Page 66/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/page/66');
  });
});
