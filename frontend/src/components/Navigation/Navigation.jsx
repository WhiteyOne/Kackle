import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import CreateServerModal from "../Servers/CreateDeleteServers/CreateServerModal/CreateServerModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./Navigation.css";

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
      <div className="create-server-modal">
        <OpenModalButton
          buttonText="Create Server"
          modalComponent={<CreateServerModal />}
        />
      </div>
    </div>
  );
}
}

export default Navigation;