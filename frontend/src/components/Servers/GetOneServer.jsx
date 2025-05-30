import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneServerThunk } from "../../redux/servers";
import { allChannelsByServer } from "../../redux/channels";
import GetAllChannels  from '../Channels/GetAllChannels';
import DeleteServerModal from "./CreateDeleteServers/DeleteServerModal/DeleteServerModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateServerModal from "./CreateDeleteServers/UpdateServerModal";

function GetOneServer() {
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const server = useSelector(state => state.server.singleServer);



    
    useEffect(() => {
            dispatch(getOneServerThunk(serverId));
            dispatch(allChannelsByServer(serverId));
        
    }, [dispatch, serverId]);

    useEffect(() => {
        if (!sessionUser) {
            navigateTo('/');
        }
    }, [sessionUser, navigateTo]);


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
                    <div className="get-all-channels"><GetAllChannels/></div>
                </div>
            </div>
            <div className="server-column">
                <h2>{server.name}</h2>
                <div className="server-icon">Server Icon</div>
                <div className="delete-server-modal">
                    <OpenModalButton
                        buttonText="Delete Server"
                        modalComponent={<DeleteServerModal serverId={server.id} />}
                    />
                    </div>
                    <div className="delete-server-modal">
                    <OpenModalButton
                        buttonText="Update Server"
                        modalComponent={<UpdateServerModal serverId={server.id} />}
                    />
                    </div>
            </div>
            <div className="smaller-div">Other Things</div>

            
        </div>
    );
}

export default GetOneServer;
