import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
     <div className="login-wrapper">
      <div className="title-style">Kackle</div>
      <div className="form-text">Sign Up</div>
      {errors.server && <p>{errors.server}</p>}
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
        <div className="login-item">
        {errors.email && <p>{errors.email}</p>}
        </div>
        <label className="form-text">
          Username
          <input
            className="form-box"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
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
         <div className="login-item">
        <label className="form-text">
          Confirm Password
          <input
            className="form-box"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        </div>
        <div className="login-item">
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" className="login-button">Sign Up</button>
        </div>
      </form>
            </div>
    </>
  );
}

export default SignupFormPage;
