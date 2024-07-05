import { MainPage } from './pages/mainPage';
import './App.css';
import ErrorBoundary from './errorBoundary';

export const App = () => {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
};
