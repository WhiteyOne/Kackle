import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CreateServerModal from "../Servers/CreateDeleteServers/CreateServerModal/CreateServerModal";
import "./Navigation.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  const [showCreateServerModal, setShowCreateServerModal] = useState(false);

  const openServerModal = () => {
    setShowCreateServerModal(true);
  };

  const closeServerModal = () => {
    setShowCreateServerModal(false);
  };

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
      <button className="create-server-button" onClick={openServerModal}>
          Create A Server
        </button>
        {showCreateServerModal && (
          <CreateServerModal onClose={closeServerModal} />
        )}
      </div>
    </div>
  );
}
}

export default Navigation;