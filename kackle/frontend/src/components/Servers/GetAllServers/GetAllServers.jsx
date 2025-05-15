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

        [
            serversArray.length, dispatch
        ]
    );

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

export default GetAllServers;
