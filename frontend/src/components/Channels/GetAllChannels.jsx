import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allChannelsByServer } from "../../redux/channels";
import { NavLink, useParams } from "react-router-dom";
import UpdateChannelModal from '../Modals/UpdateChannelModal'
import DeleteChannelModal from "../Modals/DeleteChannelModal";
import OpenModalButton from "../Modals/OpenModalButton";



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
       <div className="channels">
        
        <div>
          <div className="channel-list">
            {channelsArray.map((channel) => (
              <div key={channel.id} className="channel-item">
                
                <NavLink className="channel-title" to={`/servers/${serverId}/channel/${channel.id}`}>
                  #{channel.name}
                </NavLink>
                <div className="de-button-wrapper">
               <div className="delete-edit-buttons">
                <OpenModalButton
                  buttonText="Delete"
                   className="modal-button menu-style"
                     modalComponent={
                    <DeleteChannelModal
                      className="modal-button menu-style"
                      serverId={serverId}
                      channelId={channel.id}
                    />
                  }
                />
                </div>
             <OpenModalButton
             buttonText="Edit"
              className="modal-button menu-style"
               modalComponent={
               <UpdateChannelModal
                 serverId={serverId}
                 channel={channel}
               />
              }
               />
               </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default GetAllChannels;
