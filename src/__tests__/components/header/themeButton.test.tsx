import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../../context/context';
import { ThemeButton } from '../../../components/header/themeButton';
import { useLocalStorage } from '../../../customHooks/useLocalStorage';

jest.mock('../../../customHooks/useLocalStorage', () => ({
  useLocalStorage: jest.fn(),
}));

describe('ThemeButton', () => {
  const setLsTheme = jest.fn();

  beforeEach(() => {
    (useLocalStorage as jest.Mock).mockReturnValue(['classic', setLsTheme]);
  });

  it('renders with the current theme and toggles the theme on click', () => {
    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('classic');

    fireEvent.click(button);

    expect(button).toHaveTextContent('golden');
    expect(setLsTheme).toHaveBeenCalledWith('golden');

    fireEvent.click(button);

    expect(button).toHaveTextContent('classic');
    expect(setLsTheme).toHaveBeenCalledWith('classic');
  });
});
