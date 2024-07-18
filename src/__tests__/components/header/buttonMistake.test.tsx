import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonMistake from '../../../components/header/buttonMistake';

describe('ButtonMistake component', () => {
  it('renders button with initial value and class', () => {
    render(<ButtonMistake />);

    const buttonElement = screen.getByText('Mistake');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('mistake-button');
  });
});
