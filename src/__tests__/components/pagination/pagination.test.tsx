import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from '../../../components/pagination/pagination';

describe('Pagination', () => {
  const changePage = jest.fn();

  it('renders the correct number of page links when initNumber is less than lowMiddle', () => {
    render(<Pagination currentPage={3} changePage={changePage} />);

    const pageLinks = screen.getAllByTestId(/page-link-/);
    expect(pageLinks).toHaveLength(9);
    expect(screen.getByTestId('page-link-3')).toHaveClass('active');
  });

  it('renders the correct number of page links when initNumber is greater than lastMiddle', () => {
    render(<Pagination currentPage={63} changePage={changePage} />);

    const pageLinks = screen.getAllByTestId(/page-link-/);
    expect(pageLinks).toHaveLength(9);
    expect(screen.getByTestId('page-link-63')).toHaveClass('active');
  });

  it('renders the correct number of page links when initNumber is in the middle', () => {
    render(<Pagination currentPage={30} changePage={changePage} />);

    const pageLinks = screen.getAllByTestId(/page-link-/);
    expect(pageLinks).toHaveLength(9);
    expect(screen.getByTestId('page-link-30')).toHaveClass('active');
  });

  it('calls changePage with the correct page number when a page link is clicked', () => {
    render(<Pagination currentPage={1} changePage={changePage} />);

    const pageLink = screen.getByTestId('page-link-3');
    fireEvent.click(pageLink);

    expect(changePage).toHaveBeenCalledWith(3);
  });
});
