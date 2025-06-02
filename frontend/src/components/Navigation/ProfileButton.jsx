import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate('/');
  };

  return (
  <>
    <button 
      onClick={logout}
    >
       <img 
        className="profile-image" 
        src="/laughmoji.png">
        </img>
       </button>
  </>
);
}

export default ProfileButton;