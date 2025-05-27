import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneServerThunk } from "../../redux/servers";
import GetAllChannels  from '../Channels/GetAllChannels';
import DeleteServerModal from "./CreateDeleteServers/DeleteServerModal/DeleteServerModal";
import { allChannelsByServer } from "../../redux/channels";
import './GetOneServer.css';


function GetOneServer() {
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const server = useSelector(state => state.server.singleServer);
    const serversLoaded = useSelector(state => state.server.allServers.length > 0);
    const [showDeleteServerModal, setShowDeleteServerModal] = useState(false);
    // const [showChannel, setShowChannel] = useState(false);
  

    
    useEffect(() => {
        if (serversLoaded) {
            dispatch(getOneServerThunk(serverId));
            dispatch(allChannelsByServer(serverId));
        }
    }, [dispatch, serversLoaded, serverId]);

    useEffect(() => {
        if (!sessionUser) {
            navigateTo('/');
        }
    }, [sessionUser, navigateTo]);

    const openDeleteServerModal = () => {
        setShowDeleteServerModal(true);
    }
    const closeDeleteServerModal = () => {
        setShowDeleteServerModal(false);
    }

    if (!server) {
        return <div>Loading server...</div>;
    }

    return (
        <div className="g1-content-wrapper">
            <div className="g1-left-bar"><div className="server-icon">Server Icon</div></div>

            <div className="g1-server-column">
 <h2>{server.name}</h2> 
 
 
 
 '
<button className="delete-server-button" onClick={openDeleteServerModal}>Delete Server
                </button>            {showDeleteServerModal && (
                <DeleteServerModal
                    serverId={serverId}
                    onClose={closeDeleteServerModal}
                />
            )}
          
            
            
              
                
                
                    
   
            


            <h1 className="h1">channels</h1>
                    <div className="get-all-channels"><GetAllChannels/></div>
</div>
                <div className="g1-channel-column"></div>
        </div>
    );
}

export default GetOneServer;
