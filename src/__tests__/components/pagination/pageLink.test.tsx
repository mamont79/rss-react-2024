import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PageLink } from '../../../components/pagination/pageLink';

describe('PageLink component', () => {
  it('renders page number and applies active class if isActive is true', () => {
    render(<PageLink page={1} isActive={true} />);

    expect(screen.getByText('1')).toBeInTheDocument();

    const pageLinkElement = screen.getByText('1');
    expect(pageLinkElement).toHaveClass('page-number');
    expect(pageLinkElement).toHaveClass('active');
  });

  it('renders page number without active class if isActive is false', () => {
    render(<PageLink page={2} isActive={false} />);

    expect(screen.getByText('2')).toBeInTheDocument();

    const pageLinkElement = screen.getByText('2');
    expect(pageLinkElement).toHaveClass('page-number');
    expect(pageLinkElement).not.toHaveClass('active');
  });
});
