import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
       <li>
        <ProfileButton />
      </li>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/servers">Servers</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
