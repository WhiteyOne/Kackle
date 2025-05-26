import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Splash/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetServers from '../components/Servers/GetAllServers';
import Layout from './Layout';
import GetOneServer from '../components/Servers/getOneServer';
import GetOneChannel from '../components/Channels/GetOneChannel';
import GetAllChannels from '../components/Channels/getAllChannels';

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
      {
        path: "/server/:serverId/channel",
        element: <GetAllChannels />,
      },
      {
        path: "/server/:serverId/channel/:channelId",
        element: <GetOneChannel />,
      }
    ],
  },
]);