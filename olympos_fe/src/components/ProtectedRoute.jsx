import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../helper/setCookie";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = getCookie("token");
  const role = getCookie("role");

  useEffect(() => {
    if (token && token.length && role === "admin") {
      navigate("/admin-panel/orders");
    } else if (token && role === "user") {
      // deleteCookie(["token", "role", "name"]);

      navigate("/account");
    } else {
      navigate("/login");
      deleteCookie(["token", "role", "name"]);
    }
  }, [role, token]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
