import { MainPage } from './pages/mainPage';
import './App.css';
import ErrorBoundary from './errorBoundary';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ErrorNotFoundPage } from './pages/errorPage/errorPage';
import { DisplayCards } from './components/display';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPage />}>
      <Route path="page/:page" element={<DisplayCards />} />
      <Route path="*" element={<ErrorNotFoundPage />} />
    </Route>
  )
);

export const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
