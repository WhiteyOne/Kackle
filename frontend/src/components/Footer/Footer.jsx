import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";





function Footer () {

const user = useSelector((store) => store.session.user);
const [isLoaded, setIsLoaded] = useState(false);


const dispatch = useDispatch();
const navigate = useNavigate();


// useEffect() { 
const logout = (e) => {
    e.preventDefault();
    setIsLoaded(true);
    dispatch(thunkLogout()) 
    navigate('/');
  };

useEffect(() => {
    if(isLoaded){
        navigate('/')
    }
})

//  }


  if(!isLoaded && user){
    
    return (
        <>
        <button className="login-logout-button" onClick={logout}>Log Out</button>
        </>
    ) 
    
} 
  }

  export default Footer;


