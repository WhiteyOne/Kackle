import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Splash/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetServers from '../components/Servers/GetAllServers';
import Layout from './Layout';

import GetAllChannels from '../components/Channels/GetAllChannels';
import GetOneChannel from '../components/Channels/GetOneChannel';
import GetOneServer from '../components/Servers/GetOneServer';

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
        path: "/servers/:serverId/channel",
        element: <GetAllChannels />,
      },
      {
        path: "/servers/:serverId/channel/:channelId",
        element: <GetOneChannel />,
      }
    ],
  },
]);