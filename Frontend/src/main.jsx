import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './index.css';

import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World!</div>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
