import React from 'react';
import './style.css';

type ButtonState = {
  buttonValue: string;
};

class ButtonMistake extends React.Component<unknown, ButtonState> {
  constructor(props: unknown) {
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
