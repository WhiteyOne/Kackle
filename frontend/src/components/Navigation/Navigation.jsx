import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CreateServerModal from "../Servers/CreateDeleteServers/CreateServerModal/CreateServerModal";
import "./Navigation.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";



function Navigation() {
  const user = useSelector((store) => store.session.user);

  
  if(user){

  return (
    <div className="navbar">
      <div className="login-button">
        <ProfileButton />
      </div>
      <div>
        <NavLink to="/servers"><button className="servers-button">Servers</button></NavLink>
      </div>
      <div>
     <OpenModalButton
     buttonText="Create Server"
     modalComponent={<CreateServerModal />}
     className="create-server-button"
     />
      </div>
    </div>
  );
}
}

export default Navigation;