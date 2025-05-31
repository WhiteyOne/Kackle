import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import SignupFormModal from "../Modals/SignupFormModal";
import LoginFormModal from "../Modals/LoginFormModal"
import "./ProfileButton.css"


function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button className="sess-button" onClick={toggleMenu}>
        <img src="https://statcdn.fandango.com/MPX/image/NBCU_Fandango/118/487/thumb_1B8D339C-2060-4DB3-84D3-549A437A382B.jpg" />
     {/* other options:  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9MPgkuUPb_4ibU3OJ-SbD7WVNqLfUb2jaPA&s
     https://cdn.dribbble.com/userupload/6648444/file/still-5d607a9e7e99233a1220a3edd51ef636.gif?resize=400x0
     https://image.spreadshirtmedia.net/image-server/v1/compositions/T127A1PA5161PT21X6Y4D152822804W2021H2527/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/laughing-mouth-cartoon-small-buttons.jpg
     https://ih1.redbubble.net/image.5552987136.5721/ur,pin_large_front,square,600x600.jpg
     https://media.istockphoto.com/id/528415533/vector/emoticon-with-tears-of-joy.jpg?s=612x612&w=0&k=20&c=zt919iGd1ZSJ2kFU0g676iVKLamUXMSjMD2s-NkV8_c=
     https://ih1.redbubble.net/image.2007221642.3347/ur,pin_large_front,square,600x600.jpg
     */}
     
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
