import React from 'react';
import { Header } from '../../components/header';
import { Display } from '../../components/display';

export class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Display />
      </div>
    );
  }
}
