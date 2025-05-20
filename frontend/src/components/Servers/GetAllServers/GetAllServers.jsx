import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllServersThunk } from "../../redux/Thunks/servers";
import "../GetOneServer"
import "./GetAllServers.css";
// import update button
// import delete button
 
  

function GetAllServers() {
    
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    // const {pathName} = useLocation();
    const sessionUser = useSelector((state) => state.session.user);
    const servers = useSelector((state) => state.server);
    // const allServers = useSelector(state => state.server.allServers);
    
    const serversArray = Object.values(servers||{})

    console.log(servers)


    useEffect(() => {

        if (!serversArray.length) {
            dispatch(getAllServersThunk());
        }
    },
        [dispatch, serversArray.length]
    );

    useEffect(() => {
        if (!sessionUser) {
            navigateTo('/')
        }
    }, 
        [sessionUser, navigateTo]
    );



  return (
    <div>

        <div className="h1-div">
            <h1 className="h1-heading"> 
                Servers Here o_O  
            </h1>
        </div>

        <div className="server-box">

            <div className="row-div1">     
                <h2 className="h2-servers-heading">
                    Servers
                </h2>  
                <div className="server-icons"> 
                    <p>
                        Server Icons
                    </p>   
                </div>
            </div>

            <div className="row-div2">
                <div className="server-icons"> 
                    <p>
                        Server Icons
                    </p>
                </div>
            </div>

            <div className="row-div3">
                <div className="server-icons"> 
                    <p>
                        Server Icons
                    </p>
                </div>
            </div>

            <ul>
                {serversArray.map(server => (
                    <li key={server.id} className="server-icons">
                        <Link to={`/servers/${server.id}`}>
                            {server.name}
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
        
    </div>
  );
}

export default GetAllServers;
