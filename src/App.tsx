import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainPage } from './pages/mainPage/MainPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ReactHookForm } from './pages/reactHookForm/ReactHookForm';
import { UncontrolledForm } from './pages/uncontrolledForm/UncontrolledForm';

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/react-form', element: <ReactHookForm /> },
  { path: '/uncontrolled', element: <UncontrolledForm /> },
  { path: '/*', element: <NotFoundPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
