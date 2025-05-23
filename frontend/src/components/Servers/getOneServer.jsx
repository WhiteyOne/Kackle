import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateChannelModal from "../Channels/CreateChannelModal";
import DeleteServerModal from "./CreateDeleteServers/DeleteServerModal/DeleteServerModal";
import { getAllServersThunk } from "../../redux/servers";


function GetOneServer() {
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);
    const server = useSelector(state => state.server.byId[Number(serverId)]);
    const serversLoaded = useSelector(state => state.server.allServers.length > 0);
    const [showDeleteServerModal, setShowDeleteServerModal] = useState(false);
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

    useEffect(() => {
        if (!serversLoaded) {
            dispatch(getAllServersThunk());
        }
    }, [dispatch, serversLoaded]);

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
    const openCreateChannelModal = () => {
        setShowCreateChannelModal(true);
    }
    const closeCreateChannelModal = () => {
        setShowCreateChannelModal(false);
    }

    if (!server) {
        return <div>Loading server...</div>;
    }

    return (
        <div className="all-servers-page">
            <div className="nav">
                <div className="home-icon">Home Icon</div>
                <div className="account-div">Account Icon</div>
            </div>
            <div className="main-server-content">
                <div>
                    <h1 className="h1">servers</h1>
                </div>
            </div>
            <div className="server-column">
                <h2>{server.name}</h2>
                <div className="server-icon">Server Icon</div>
                <button className="delete-server-button" onClick={openDeleteServerModal}>
                    Delete Server
                </button>
            </div>
            <div className="channel-column">
                <h2>Your Channels</h2>
                <div className="channels">
                    <button className="create-channel-button" onClick={openCreateChannelModal}>
                        Create Channel
                    </button>
                    {server.channels && server.channels.length > 0 ? (
                        <ul>
                            {server.channels.map(channel => (
                                <li key={channel.id}>{channel.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No channels found. Click &aposCreate&apos to create one!</p>
                    )}
                </div>
            </div>
            <div className="smaller-div">Other Things</div>

            {showDeleteServerModal && (
                <DeleteServerModal
                    serverId={serverId}
                    onClose={closeDeleteServerModal}
                />
            )}
            {showCreateChannelModal && (
                <CreateChannelModal
                    serverId={serverId}
                    onClose={closeCreateChannelModal}
                />
            )}
        </div>
    );
}

export default GetOneServer;
