import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allChannelsByServer } from "../../redux/channels";
import { NavLink, useParams } from "react-router-dom";
import { updateChannelThunk } from "../../redux/channels";
import CreateChannelModal from "../Channels/CreateChannelModal";
import DeleteChannelModal from "./DeleteChannelModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./GetAllChannels.css";

function GetAllChannels() {
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const channels = useSelector((state) => state.channels.allChannels);
  const channelsArray = channels ? Object.values(channels) : [];
  

  useEffect(() => {
    if (serverId) {
      dispatch(allChannelsByServer(serverId));
    } 
  }, [dispatch, serverId]);

  if (!channels) {
    return <div>Loading...</div>;
  }


  return (
    <div className="channel-column">
      <h2>Your Channels</h2>
      <div className="channels">
        <div className="create-channel-modal">
          <OpenModalButton
          buttonText="Create Channel"
          modalComponent={<CreateChannelModal serverId={serverId} />}
          />
        </div>  
        <div>
          <ul className="channel-list">
            {channelsArray.map((channel) => (
              <li key={channel.id} className="channel-item">
                <NavLink to={`/servers/${serverId}/channel/${channel.id}`}>
                  #{channel.name}
                </NavLink>
               <div className="delete-channel-modal">
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteChannelModal
                      serverId={serverId}
                      channelId={channel.id}
                    />
                  }
                />
                </div>
                <button
                  className="update-channel-button"
                  onClick={() => dispatch(updateChannelThunk(channel.id))}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default GetAllChannels;
