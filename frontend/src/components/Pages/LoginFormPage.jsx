import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { thunkLogin } from "../../redux/session";



function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/servers" replace={true} />;


  const handleDemoButton = async (e)=>{
    e.preventDefault();
    dispatch(thunkLogin({ email: "demo@aa.io", password: 'password'}))
    setEmail();
    setPassword();
  }


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
      navigate("/servers");
    }
  };



  return (
    <>
      <div className="login-container">
      <div className="login-wrapper">
      <div className="title-style">Kackle</div>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-item">
        <label className="form-text">
          Email
          <input
            className="form-box"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="login-item">
        <label className="form-text">
          Password
          <input
            className="form-box"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit" className="submit-button">Log In</button>
      </form>
                
      <div className="button-wrapper">
      <NavLink to="/signup"><button className="form-button">Sign Up</button></NavLink>
      <button className="form-button" onClick={handleDemoButton}>Demo User</button> 
      
      </div>
      </div>
      </div>
      
    </>

  );
}

export default LoginFormPage;