import { allServers } from "../../../redux/Thunks/GetAllServers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./GetAllServers.css";
import { useEffect } from "react";
// import update button
// import delete button
 
 

function GetAllServers() {

    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    // const {pathName} = useLocation();
    const sessionUser = useSelector((state) => state.session.user);
    const servers = useSelector((state) => state.serversReducer);
    
    const serversArray = Object.values(servers||{})

 
    useEffect(
        function() {
            if (!serversArray.length) {
                dispatch(allServers())
            }
        },
         [serversArray.length, dispatch]
            

       
    );

    useEffect(
        function(){
            if (!sessionUser){
                navigateTo('/')
            }
        }, [sessionUser, navigateTo]
    );



  return (

    <div className="all-servers-page">

        <div className="nav">
            <div className="home-icon"> 
                Home Icon
            </div>
            <div className="account-div">
                Account Icon
            </div>
        </div>

        <div className="main-server-content">
            <div>
                <h1 className="h1"> 
                    Server Page o_O
                </h1>
            </div>
        </div>

        <div className="server-column">
            <h2>Your Servers</h2>            
            <div className="server-icon"> 
                Server Icon
            </div>
        </div>

        <div className="channel-column">
            <h2>Your Channels</h2>
            <div className="channels">
                Channels
            </div>
        </div>

        
            <div className="smaller-div">Other Things</div>
        
    </div>

  );
}

export default GetAllServers;
