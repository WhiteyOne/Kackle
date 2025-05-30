import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getChannelThunk } from "../../redux/channels";
import DeleteChannelModal from "./DeleteChannelModal";
import GetMessages from "../ChannelMessages/ChannelMessages";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './GetOneChannel';

function GetOneChannel() {
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const channel = useSelector((state) => state.channels.singleChannel);

 


  useEffect(() => {
    dispatch(getChannelThunk(serverId, channelId));
  }, [dispatch, serverId, channelId]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

 
  if (!channel) {
    return <div>Loading channel...</div>;
  }
  return (
    <div className="one-channel-wrapper">
      <div>
        <h3 className="h1">{channel.name}</h3>
      </div>
      <div className="channel-messages">
        <h4>Messages:</h4>
        <GetMessages />
        <div>
          <h1 className="h1">channels</h1>
        </div>
      </div>
      <div className="channel-column">
        <h2>{channel.name}</h2>
       <div className="delete-channel-modal">
          <OpenModalButton
            buttonText="Delete Channel"
            modalComponent={
              <DeleteChannelModal serverId={serverId} channelId={channelId} />
            }
          />
        </div>
       </div>
      </div>
  );
}
export default GetOneChannel;
