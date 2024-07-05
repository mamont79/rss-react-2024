import React from 'react';
import './style.css';

interface ButtonProps {}

interface ButtonState {
  buttonValue: string;
}

class ButtonMistake extends React.Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = { buttonValue: 'Mistake' };
  }

  handleError = (): void => {
    this.setState({ buttonValue: 'error' }, () => {
      throw new Error('Ok, ErrorBoundary works well :-)');
    });
  };

  render() {
    return (
      <button onClick={this.handleError} className="mistake-button">
        {this.state.buttonValue}
      </button>
    );
  }
}

export default ButtonMistake;
