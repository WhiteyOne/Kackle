import { NavLink, useLocation, useParams } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CreateServerModal from "../Modals/CreateServerModal";
import OpenModalButton from "../Modals/OpenModalButton";
import { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import CreateChannelModal from "../Modals/CreateChannelModal";
// import DeleteChannelModal from "../Modals/DeleteChannelModal";
import { getChannelThunk } from "../../redux/channels";



function Navigation() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.session.user);
  // const { channels } = useSelector((state) => state.channels.allChannels);
  // const { server } = useSelector(state => state.server.singleServer);
  const { serverId } = useParams();
  const [isServers, setIsServers] = useState(false);

 


  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/servers") {
      setIsServers(true);
      dispatch(getChannelThunk(serverId));
    } else setIsServers(false);
  }, [location, dispatch, serverId]);

  if (user) {
    return (
      <div className="navbar">
        
        <ProfileButton />

        <div className="button-row">
          {!isServers && (
            <div>
              <NavLink to="./servers">
                <button className="modal-button">Servers</button>
              </NavLink>
            </div>
          )}
          <div>
            <OpenModalButton
              buttonText="Create Server"
              className="modal-button"
              modalComponent={<CreateServerModal />}
            />
          </div>

          <OpenModalButton
            buttonText="Create Channel"
            className="modal-button"
            modalComponent={<CreateChannelModal serverId={serverId} />}
          />
        </div>

        {/* <OpenModalButton
          buttonText="Delete Channel"
          className="modal-button"
          modalComponent={
            <DeleteChannelModal serverId={serverId} channelId={channelId} />
          }
        /> */}
 
      </div>
    );
  }
}

export default Navigation;
