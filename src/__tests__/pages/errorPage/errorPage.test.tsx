import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorNotFoundPage } from '../../../pages/errorPage/errorPage';

test('renders error not found page', () => {
  const { getByText } = render(<ErrorNotFoundPage />);

  expect(getByText('Sorry')).toBeInTheDocument();
  expect(getByText('This page was not found')).toBeInTheDocument();
  expect(getByText('Do you want to go back?')).toBeInTheDocument();
});
