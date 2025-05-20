import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Splash/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetAllServers from '../components/Servers/GetAllServers';
import GetOneServer from '../components/GetOneServer'
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
     
      { 
        path: "/",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/servers",
        element: <GetAllServers />,
      },
      {
        path: "/servers/:serverId",
        element: <GetOneServer />,
      },
    ],
  },
]);