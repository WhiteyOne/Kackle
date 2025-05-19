import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllServersThunk } from "../../redux/servers";

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
        <div className="all-servers-page">
            <div className="nav">
                <div className="home-icon">Home Icon</div>
                <div className="account-div">Account Icon</div>
            </div>
            <div className="main-server-content">
                <div>
                    <h1 className="h1">Ho Why Is You Here o_O</h1>
                </div>
            </div>
            <div className="server-column">
                <h2>{server.name}</h2>
                <div className="server-icon">Server Icon</div>
            </div>
            <div className="channel-column">
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
            <div className="smaller-div">Other Things</div>
        </div>
    );
}

export default GetOneServer;
