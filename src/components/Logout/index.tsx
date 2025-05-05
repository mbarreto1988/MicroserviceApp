import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem("user") || '""');

    if (userEmail) {
      setUserName(userEmail.split("@")[0]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("sessionExpiresAt");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="logout-container">
      {userName && (
        <span className="logout-container__username">{userName}</span>
      )}
      <i
        className="fa-solid fa-right-from-bracket logout-container__logout-icon"
        onClick={handleLogout}
      ></i>
    </div>
  );
};

export default Logout;
