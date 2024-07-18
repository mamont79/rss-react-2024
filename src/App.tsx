import { MainPage, PageWrapper } from './pages/mainPage';
import './App.css';
import ErrorBoundary from './errorBoundary';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ErrorNotFoundPage } from './pages/errorPage/errorPage';
import { DetailedCard } from './components/detailedCard/detailedCard';
import { DisplayCards } from './components/display';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPage />}>
      <Route path="page/:page" element={<PageWrapper />}>
        <Route path="" element={<DisplayCards />} />
        <Route path="details/:details" element={<DetailedCard />} />
      </Route>
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
