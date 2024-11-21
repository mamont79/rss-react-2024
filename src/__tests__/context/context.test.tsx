import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from '../../context/context';

const TestComponent = () => {
  const { themeType, theme, setCurrentTheme } = useTheme();

  return (
    <div>
      <div data-testid="themeType">{themeType}</div>
      <div
        data-testid="background"
        style={{ background: theme['--background'] }}
      >
        Background
      </div>
      <div data-testid="color" style={{ color: theme['--color'] }}>
        Text Color
      </div>
      <button onClick={() => setCurrentTheme('golden')}>Golden Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('provides the default theme values', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('themeType')).toHaveTextContent('classic');
    expect(screen.getByTestId('background')).toHaveStyle('background: #ffcb05');
    expect(screen.getByTestId('color')).toHaveStyle('color: #213547');
  });

  it('allows the theme to be changed', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Golden Theme'));

    expect(screen.getByTestId('themeType')).toHaveTextContent('golden');
    expect(screen.getByTestId('background')).toHaveStyle('background: #f6724e');
    expect(screen.getByTestId('color')).toHaveStyle('color: #ffffff');
  });
});
