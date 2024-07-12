import { MainPage } from './pages/mainPage';
import './App.css';
import ErrorBoundary from './errorBoundary';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorNotFoundPage } from './pages/errorPage/errorPage';

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/page/:page', element: <MainPage /> },
  { path: '*', element: <ErrorNotFoundPage /> },
]);

export const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
