import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneServerThunk } from "../../redux/servers";
import { allChannelsByServer } from "../../redux/channels";
import DeleteChannelModal from '../Modals/DeleteChannelModal';
import OpenModalButton from "../Modals/OpenModalButton";
import UpdateChannelModal from '../Modals/UpdateChannelModal';
import { Helmet } from "react-helmet";
import { GetOneChannel } from "../Channels";




function GetOneServerPage() {
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const server = useSelector(state => state.server.singleServer);
    const [selectedChannelId, setSelectedChannelId] = useState(null);
    const channels = useSelector((state) => state.channels.allChannels);
    const channelsArray = channels ? Object.values(channels) : [];
    
    const handleChannelClick = (channelId) => {
        setSelectedChannelId(channelId);
    };

    
    useEffect(() => {
            dispatch(getOneServerThunk(serverId));
            dispatch(allChannelsByServer(serverId));
                     
    }, [dispatch, serverId]);

    useEffect(() => {
        if (!sessionUser) {
            navigateTo('/');
        }
    }, [sessionUser, navigateTo]);

  console.log(typeof(serverId), serverId, typeof(selectedChannelId), selectedChannelId);
    

    if (!server) {
        
        return <div>Loading server...</div>;
        
    }

     return (
       <>
       <Helmet>
           <title>Kackle | {server.name}</title>
       </Helmet>
       <div className="g1-content-wrapper">
           <div className="g1-left-nav">
               <div className="g1-server-icon">Home Icon</div>
               <div className="g1-server-icon">Account Icon</div>
           </div>
           <div className="g1-server-column">
               <div className="button-separator">
                   <div className="g1-server-title">{server.name}</div>

                   <div className="channels-list">
                       {channelsArray.map(channel => (
                           <div key={channel.id}>
                               <div onClick={() => handleChannelClick(channel.id)} className={"channel-title"}>
                                   # {channel.name}
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
                               <OpenModalButton
                                   buttonText="Edit"
                                   modalComponent={
                                       <UpdateChannelModal
                                           serverId={serverId}
                                           channel={channel}
                                       />
                                   }
                               />
                           </div>
                       ))}
                   </div>
               </div>
           </div>
           
           <div className="g1-channel-column">
            <div className="g1-message-wrapper">

       
               {selectedChannelId && (
                   <GetOneChannel serverId={serverId} channelId={selectedChannelId} />
               )}
           </div>
                </div>
       </div>
      
       </>
   );
}

export default GetOneServerPage;
