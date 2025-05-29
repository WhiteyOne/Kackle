import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Splash/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';

import Layout from './Layout';

import { GetAllServers, GetOneServer } from '../components/Servers';
import GetAllChannels from '../components/Channels/GetAllChannels';
import { GetOneChannel } from '../components/Channels';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
     
      {
        path: "/",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/servers",
        element: <GetAllServers />,
      },
      {
        path: "/servers/:serverId",
        element: <GetOneServer/>,
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