import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoaderCard } from '../../../components/card/loader';

describe('LoaderCard component', () => {
  it('renders loading message and image', () => {
    render(<LoaderCard />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const imageElement = screen.getByAltText('pokeball loader');
    expect(imageElement).toBeInTheDocument();
  });
});
