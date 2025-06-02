import { getAllServersThunk } from "../../redux/servers";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";


function GetAllServersPage() {
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
        }, [sessionUser, navigateTo]
    );

    if (!sessionUser) return null

     return (
      <>
      <Helmet>
        <title>Kackle | Servers</title>
      </Helmet>
    <div className="g-all-wrapper">
       <div className="row-wrapper">
        <span className="h1">
            <h1 className="h1-heading">Choose your Kackle Server O_0</h1>
        </span>

          <h2 className="h2-servers-heading">Servers for {sessionUser.first_name} {sessionUser.last_name}</h2>
     
              
        {allServers.map(server => (
          <div key={server.id} id="no-dot">
             <Link to={`/servers/${server.id}`}>

              
              <div className="row-div1">

              <div className="server-icons">
              <h1 className="icon-text">{server.name.slice(0, 2).toUpperCase()}</h1>
              <div className="icon-text">
              </div></div>
              <div className="server-info">{server.name}
              </div>
              <div className="user-count">
              
              </div>

            </div>
            </Link>
          </div>
        ))}    
    </div>
</div>
</>
  );
}

export default GetAllServersPage;
