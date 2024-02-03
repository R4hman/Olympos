import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helper/setCookie";

const ProtectedAdminPanel = ({ children }) => {
  const navigate = useNavigate();
  const token = getCookie("token");
  const role = getCookie("role");

  useEffect(() => {
    if (token && token.length && role === "admin") {
      navigate("/admin-panel");
    }
  }, [role, token]);
  return <div>{children}</div>;
};

export default ProtectedAdminPanel;
