import { useEffect, useState } from "react";
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
  const [openEditBox, setOpenEditBox] = useState(false)
  const [inputBox, setInputBox] = useState()
  
  useEffect(() => {
    if (serverId) {
      dispatch(allChannelsByServer(serverId));
    }
  }, [dispatch, serverId]);
  
  if (!channels) {
    return <div>Loading...</div>;
  }
  const handleSubmit = (serverId, channelId, newChannelName) => {
    console.log(inputBox)
    e.preventDefault();
    setOpenEditBox(!openEditBox)
    dispatch(updateChannelThunk(serverId, channelId, newChannelName))
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
                <NavLink to={`/server/${serverId}/channel/${channel.id}`}>
                  #{channel.name}
                </NavLink>
                <div className={openEditBox ? 'edit-channel-card' : 'hidden'}>

                  <form
                    onSubmit={() => handleSubmit(serverId, channel.id, inputBox)}
                  >
                    <input
                      type="text"
                      placeholder={`${channel.name}`}
                      value={inputBox}
                      onChange={(e) => setInputBox(e.target.value)}
                    />
                    <button type="submit">ready to giggle?</button>
                  </form>
                </div>
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
                  onClick={() => setOpenEditBox(!openEditBox)}
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
