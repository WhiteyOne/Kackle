import { getAllServersThunk } from "../../redux/servers";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./GetAllServers.css";
import { useEffect } from "react";
// import update button
// import delete button



function GetServers() {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const servers = useSelector((state) => state.server);
    const allServers = useSelector(state => state.server.allServers);

    useEffect(() => {
        if (servers.allServers.length === 0){
            dispatch(getAllServersThunk());
        }
    }, [dispatch, servers.allServers.length]);
       

    useEffect(
        function(){

            if (!sessionUser){
                navigateTo('/')
            }
        }
    );



  return (
    <div className="everything">
        <span className="h1">
            <h1>This will be a Server O_0</h1>
        </span>
        

        <div className="home-icon"> Home Icon
            <div className="smaller-div">Other Things</div>
        </div>
        <div className="server-icon"> Server Icon
            <div className="channels">Channels</div>
        </div>
        <div className="account-div">Account Icon</div>
          <h2>Your Servers</h2>
      <ul>
        {allServers.map(server => (
          <li key={server.id} className="server-item">
             <Link to={`/servers/${server.id}`}>
              {server.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default GetServers;
