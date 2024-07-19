import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from '../../../components/pagination/pagination';
import { makeArray } from '../../../components/pagination/arrayMaker';

jest.mock('../../../components/pagination/arrayMaker', () => ({
  makeArray: jest.fn(),
}));

jest.mock('../../../components/pagination/pageLink.tsx', () => ({
  PageLink: ({ page, isActive }: { page: number; isActive: boolean }) => (
    <div data-testid={`page-link-${page}`} className={isActive ? 'active' : ''}>
      {page}
    </div>
  ),
}));

describe('Pagination', () => {
  const changePage = jest.fn();

  beforeEach(() => {
    (makeArray as jest.Mock).mockReturnValue([1, 2, 3, 4, 5]);
  });

  it('renders the correct number of page links', () => {
    render(<Pagination currentPage={1} changePage={changePage} />);

    const pageLinks = screen.getAllByTestId(/page-link-/);
    expect(pageLinks).toHaveLength(5);
  });

  it('highlights the active page link', () => {
    render(<Pagination currentPage={3} changePage={changePage} />);

    const activePageLink = screen.getByTestId('page-link-3');
    expect(activePageLink).toHaveClass('active');
  });

  it('calls changePage with the correct page number when a page link is clicked', () => {
    render(<Pagination currentPage={1} changePage={changePage} />);

    const pageLink = screen.getByTestId('page-link-3');
    fireEvent.click(pageLink);

    expect(changePage).toHaveBeenCalledWith(3);
  });
});
