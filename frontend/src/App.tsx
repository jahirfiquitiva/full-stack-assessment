import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Login } from './components/login';
import { NotFound } from './components/not-found';
import { Websites } from './components/websites';
import { Links } from './components/links';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/websites',
    element: <Websites />,
    errorElement: <NotFound />,
    children: [
      {
        path: ':id',
        element: <Links />,
      },
    ],
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
      <Toaster containerClassName={'toast-container'} />
    </main>
  );
};

export default App;
