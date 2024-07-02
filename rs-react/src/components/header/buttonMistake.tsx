import React from 'react';

interface ButtonProps {}

interface ButtonState {
  buttonValue: string;
}

class ButtonMistake extends React.Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = { buttonValue: 'Mistake button' };
  }

  handleError = (): void => {
    this.setState({ buttonValue: 'got you' }, () => {
      throw new Error('Ok, ErrorBoundary works well :-)');
    });
  };

  render() {
    return <button onClick={this.handleError}>{this.state.buttonValue}</button>;
  }
}

export default ButtonMistake;
