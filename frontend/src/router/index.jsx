import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { GetAllServersPage, GetOneServerPage, LoginFormPage, SignupFormPage } from '../components/Pages';
import { GetAllChannels, GetOneChannel } from '../components/Channels';




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
        element: <GetAllServersPage />,
      },
      {
        path: "/servers/:serverId",
        element: <GetOneServerPage />,
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