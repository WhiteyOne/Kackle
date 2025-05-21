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
    <div>
        <div className="wrapper">
        <div className="h1-div">
            <h1 className="h1-heading"> 
                Servers Here o_O  
            </h1>
        </div>

        <div className="server-box">
            <h2 className="h2-servers-heading">
                    Servers for { sessionUser.first_name }
                </h2>
            {/* <div className="row-div1">     
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
                </div> */}


            <ul className="no-dot">
                {allServers.map(server => (
                    <li key={server.id} className="row-wrapper">
                      <div className="row-div1">
                        <Link to={`/servers/${server.id}`}>
                            
                            <div className="inner-wrapper">
                            <div className="server-icons">
                            <h1 className="icon-text">{server.name.slice(0, 2).toUpperCase()}</h1>
                            </div>
                            <div className="server-info">
                            <h4 className="server-title">{server.name}</h4>
                            <div className="user-count">10 kacklers</div>
                            </div>
                            </div>

                            
                        </Link>
                        </div>
                    </li>
                ))}
            </ul>

            {/* </div> */}
        </div>
        
    </div>
    </div>
  );
}

 
export default GetServers;


