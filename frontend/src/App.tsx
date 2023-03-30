import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Login } from './components/login';
import { NotFound } from './components/not-found';
import { Websites } from './components/websites';
import { Links } from './components/links';

import './App.css';
import { withAuthenticator } from './components/authenticator';

const router = createBrowserRouter([
  {
    path: '/',
    element: withAuthenticator(<Login />),
    errorElement: <NotFound />,
  },
  {
    path: '/websites',
    element: withAuthenticator(<Websites />),
    errorElement: <NotFound />,
    children: [
      {
        path: ':id',
        element: withAuthenticator(<Links />),
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
