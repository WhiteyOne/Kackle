import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LoginSplash from '../components/Splash/LoginSplash';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginSplash />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);