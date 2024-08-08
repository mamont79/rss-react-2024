import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainPage } from './pages/mainPage/MainPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ReactHookForm } from './pages/reactHookForm/ReactHookForm';
import { UncontrolledForm } from './pages/uncontrolledForm/UncontrolledForm';
import { Provider } from 'react-redux';
import { store } from './store/store';

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/react-form', element: <ReactHookForm /> },
  { path: '/uncontrolled', element: <UncontrolledForm /> },
  { path: '/*', element: <NotFoundPage /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
