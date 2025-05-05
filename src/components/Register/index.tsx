/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/RegisterServices";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser({
        registerName: name,
        registerEmail: email,
        registerPasswordHash: password
      });

      navigate("/login");
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="register">
      <h2 className="register__title">Register</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__field">
          <label className="register__label" htmlFor="name">
            Name
          </label>
          <input
            className="register__input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="register__field">
          <label className="register__label" htmlFor="email">
            Email
          </label>
          <input
            className="register__input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="register__field">
          <label className="register__label" htmlFor="password">
            Password
          </label>
          <input
            className="register__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="register__error">{error}</p>}
        <button className="register__button" type="submit">
          Register
        </button>
      </form>
      <div className="register__login-link">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
