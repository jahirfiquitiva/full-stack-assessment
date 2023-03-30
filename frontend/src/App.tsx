import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Login } from './components/login';
import { NotFound } from './components/not-found';
import { Websites } from './components/websites';
import { Links } from './components/links';

import { withAuthenticator } from './components/authenticator';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: withAuthenticator(<Login />),
    errorElement: <NotFound />,
  },
  {
    path: '/websites',
    element: withAuthenticator(<Websites />),
  },
  {
    path: '/websites/:id',
    element: withAuthenticator(<Links />),
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
