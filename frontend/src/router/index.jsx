import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Splash/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetServers from '../components/Servers/GetAllServers';
import Layout from './Layout';
import GetOneServer from '../components/GetOneServer/getOneServer';
import GetMessages from '../components/ChannelMessages/ChannelMessages';


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
        path: "/server/:serverId",
        element: <GetOneServer />,
      },
      {
        path:"server/:serverId/channel/:channelId/messages",
        element: <GetMessages />
      }
    ],
  },
]);