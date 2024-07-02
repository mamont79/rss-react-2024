import React from 'react';
import { MainPage } from './pages/mainPage';
import './App.css';
import ErrorBoundary from './errorBoundary';

export class App extends React.Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <MainPage />
        </ErrorBoundary>
      </>
    );
  }
}
