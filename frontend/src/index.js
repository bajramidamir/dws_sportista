import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ManagerReqPage from './pages/ManagerReqPage';

import AdminPage from './pages/AdminPage';
import ManagerPage from './pages/ManagerPage';
import UserPage from './pages/UserPage';


const router = createBrowserRouter([
  {path: '/',
    element: <HomePage/>
  },
  {path: '/login',
    element: <LoginPage/>
  },
  {path: '/signup',
    element: <SignupPage/>
  },
  {path: '/postanimenadzer',
  element: <ManagerReqPage/>

  }  /*ovdje trebamo povezati AdminPage, ManagerPage i UserPage */,
  {
    path: '/admin',
    element: <AdminPage/>
  },
  {
    path: '/manager',
    element: <ManagerPage/>
  },
  {
    path: '/user',
    element: <UserPage/>

  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
