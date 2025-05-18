import { getAllServersThunk } from "../../redux/servers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./GetAllServers.css";
import { useEffect } from "react";
// import update button
// import delete button



function GetServers() {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    // const {pathName} = useLocation();
    const sessionUser = useSelector((state) => state.session.user);
    const servers = useSelector((state) => state.server);
    // const serversArray = Object.values(servers||{})

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
    </div>

  );
}

export default GetServers;
