import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CreateServerModal from "../Servers/CreateDeleteServers/CreateServerModal/CreateServerModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./Navigation.css";


function Navigation() {
 
  return (
    <div className="navbar">
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
        <NavLink to="/servers">Servers</NavLink>
      </li>
    </ul>

    <div className="create-server-modal">
    <OpenModalButton
    buttonText="Create Server"
    modalComponent={<CreateServerModal />}/>
    </div>
    </div>
  );
}

export default Navigation;