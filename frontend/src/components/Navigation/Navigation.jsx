import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() { 
  return (
    <ul>
      <div className="nav-bar">

        <li className="account-nav">
          <ProfileButton /> 
        </li>

       <li className="home-nav">
          <NavLink to="/">Home</NavLink>
        </li>

        <li className="server-nav">
          <NavLink to="/servers">Servers</NavLink>
        </li>

      </div>
    </ul>
  );
}

export default Navigation;
