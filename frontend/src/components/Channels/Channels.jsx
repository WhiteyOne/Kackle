import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllServersThunk } from "../../redux/servers";
import { getChannelThunk } from "../../redux/channels";

function GetOneServerChannel() {
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const server = useSelector(state => state.server.byId[Number(serverId)]);
    const serversLoaded = useSelector(state => state.server.allServers.length > 0);
    // const channel = useSelector((state) => state.channel);
    const allChannels = useSelector(state => state.channel.allChannels);

    useEffect(() => {
        if (!serversLoaded) {
            dispatch(getAllServersThunk());
        }
    }, [dispatch, serversLoaded])


    useEffect(() => {
        if (server) {
            dispatch(getChannelThunk(server.id));
        }
    }, [dispatch, server]);


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
                    <h1 className="h1">servers</h1>
                </div>
            </div>
            <div className="server-column">
                <h2>{server.name}</h2>
                <div className="server-icon">Server Icon</div>
            </div>
            <div className="channel-column">
                <h2>Your Channels</h2>
                <div className="channels">
                <ul>
  {allChannels.map(channel => (
    <li key={channel.id}>
      <Link to={`/server/${server.id}/channel/${channel.id}`}>
        {channel.name}
      </Link>
    </li>
  ))}
</ul>
                   
                </div>
            </div>
            <div className="smaller-div">Other Things</div>
        </div>
    );
}

export default GetOneServerChannel;
