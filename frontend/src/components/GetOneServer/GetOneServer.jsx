import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllServersThunk } from "../../redux/servers";


import './GetOneServer.css';

function GetOneServer() {
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);
    const server = useSelector(state => state.server.byId[Number(serverId)]);
    const serversLoaded = useSelector(state => state.server.allServers.length > 0);

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

    if (!server) {
        return <div>Loading server...</div>;
    }

    return (
        <>
        <div className="g1-top-bar"></div>

        <div className="g1-content-wrapper">

        <div className="g1-left-bar">
                <div className="g1-server-icons">
                <div className="g1-icon-text">
                <h4>{server.name.slice(0, 2).toUpperCase()}</h4></div></div>

                <div className="g1-server-icons">
                </div>
               


                
                <div className="g1-server-icons">
                    Home Icon</div>
                <div>Account Icon</div>
                        </div>
               
        <div className="g1-server-column">
                <h2>{server.name}</h2>
                <div className="material-symbols-outlined"></div>
            </div>

            
        <div className="g1-channel-column">
                <h2>Your Channels</h2>
                <div className="channels">
                    {server.channels && server.channels.length > 0 ? (
                        <ul>
                            {server.channels.map(channel => (
                                <li key={channel.id}>{channel.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No channels found.</p>
                    )}
                </div>
            </div>
            </div>
</>


    );
}

export default GetOneServer;