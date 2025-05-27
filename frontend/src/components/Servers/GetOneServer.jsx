import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneServerThunk } from "../../redux/servers";
import DeleteServerModal from "./CreateDeleteServers/DeleteServerModal/DeleteServerModal";
import { allChannelsByServer } from "../../redux/channels";
import GetAllChannels from "../Channels/GetAllChannels";


function GetOneServer() {
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const server = useSelector(state => state.server.singleServer);
    const serversLoaded = useSelector(state => state.server.allServers.length > 0);
    const [showDeleteServerModal, setShowDeleteServerModal] = useState(false);
    // const [channelUpdate, setChannelUpdate] = useState(false);

    
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
        <div className="single-servers-page">
            <div className="nav">
                <div className="home-icon">Home Icon</div>
                <div className="account-div">Account Icon</div>
            </div>
            <div className="main-server-content">
                <div>
                    <h1 className="h1">channels</h1>
                    <div className="get-all-channels"><GetAllChannels /></div>
                </div>
            </div>
            <div className="server-column">
                <h2>{server.name}</h2>
                <div className="server-icon">Server Icon</div>
                <button className="delete-server-button" onClick={openDeleteServerModal}>
                    Delete Server
                </button>
            </div>
            <div className="smaller-div">Other Things</div>

            {showDeleteServerModal && (
                <DeleteServerModal
                    serverId={serverId}
                    onClose={closeDeleteServerModal}
                />
            )}
        </div>
    );
}

export default GetOneServer;
