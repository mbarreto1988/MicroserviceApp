import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginService } from "../../services/LoginService";
import { useLocation } from "react-router-dom";
import Button from "../../components/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const authRequired = query.get("auth") === "required";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const loginRequest = { Email: email, Password: password };
    const error = await LoginService(loginRequest);

    if (error) {
      setErrorMsg(error);
    } else {
      const now = new Date();
      const expiration = now.getTime() + 10 * 60 * 1000;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("sessionExpiresAt", expiration.toString());
      localStorage.setItem("user", JSON.stringify(email));
      navigate("/wellcome");
    }
  };

  return (
    <div className="login">
      <h2 className="login__title">Login</h2>
      {authRequired && (
        <div className="login__info">You must log in to access that page..</div>
      )}
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            className="login__input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login__field">
          <label className="login__label" htmlFor="password">
            Password
          </label>
          <input
            className="login__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && <div className="login__error">{errorMsg}</div>}
        <Button
          ButtonType="submit"
          ButtonClassName="login__button"
          ButtonText="Login"
        />
      </form>
      <div className="login__register-link">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
