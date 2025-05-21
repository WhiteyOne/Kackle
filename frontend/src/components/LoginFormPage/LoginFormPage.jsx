import { useEffect, useState } from "react";
import { thunkLogin } from "../../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const [logged, setLogged] = useState(sessionUser);

  // useEffect(() => {
  //   const loggedIn = () => {
  //     if(sessionUser){
      
  //     }
  //   }
    
  // }, [logged, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
 
 


    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
        
      
    );

   

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate('/servers')
      
    }
  };

  return (
    <>
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
