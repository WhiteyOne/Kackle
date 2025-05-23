import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Splash/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetServers from '../components/Servers/GetAllServers';
import Layout from './Layout';
import GetOneServer from '../components/Servers/getOneServer';

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
        element: <GetServers />,
      },
      {
        path: "/servers/:serverId",
        element: <GetOneServer />,
      },
    ],
  },
]);