import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CreateServerModal from "../Servers/CreateDeleteServers/CreateServerModal/CreateServerModal";
import "./Navigation.css";
import { useState } from "react";

function Navigation() {
  const [showCreateServerModal, setShowCreateServerModal] = useState(false)

  const openServerModal = () => {
    setShowCreateServerModal(true)
  }

  const closeServerModal = () => {
    setShowCreateServerModal(false)
  }
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

    <button className="create-server-button" onClick={openServerModal}>
    +
    </button>
    {showCreateServerModal && (
      <CreateServerModal onClose={closeServerModal}/>
    )}
    </div>
  );
}

export default Navigation;