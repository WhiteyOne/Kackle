import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allChannelsByServer } from "../../redux/channels";
import { NavLink, useParams } from "react-router-dom";
import { deleteChannelThunk, updateChannelThunk } from "../../redux/channels";
import CreateChannelModal from "../Channels/CreateChannelModal";
import "./GetAllChannels.css";

function GetAllChannels() {
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const channels = useSelector((state) => state.channels.allChannels);
  const channelsArray = channels ? Object.values(channels) : [];
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  useEffect(() => {
    if (serverId) {
      dispatch(allChannelsByServer(serverId));
    } 
  }, [dispatch, serverId]);

  if (!channels || channelsArray.length === 0) {
    return <div>Loading...</div>;
  }

  const openCreateChannelModal = () => {
    setShowCreateChannelModal(true);
  };
  const closeCreateChannelModal = () => {
    setShowCreateChannelModal(false);
  };

  return (
    <div className="channel-column">
      <h2>Your Channels</h2>
      <div className="channels">
        <button
          className="create-channel-button"
          onClick={openCreateChannelModal}
        >
          Create Channel
        </button>
        <div>
          <ul className="channel-list">
            {channelsArray.map((channel) => (
              <li key={channel.id} className="channel-item">
                <NavLink to={`/servers/${serverId}/channel/${channel.id}`}>
                  #{channel.name}
                </NavLink>
                <button
                  className="delete-channel-button"
                  onClick={() => dispatch(deleteChannelThunk(channel.id))}
                >
                  Delete Channel
                </button>
                <button
                  className="update-channel-button"
                  onClick={() => dispatch(updateChannelThunk(channel.id))}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
          {showCreateChannelModal && (
            <CreateChannelModal
              onClose={closeCreateChannelModal}
              serverId={serverId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GetAllChannels;
