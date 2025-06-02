import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { getChannelThunk } from "../../redux/channels";
import { ChannelMessages } from ".";



function GetOneChannel({ serverId, channelId }) {
  
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
      <>
      <div className="g1-message-header">
      <div className="g1-message-channel-title">{channel.name}</div>
      
 </div>
   
        <ChannelMessages channelId={channelId} />
   
   
    


     
    </>
  );
}
export default GetOneChannel;
