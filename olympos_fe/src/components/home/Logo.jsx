import { useMediaQuery } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Logo = () => {
  const isHomePage = location.pathname === "/";
  const isMobile = useMediaQuery("(max-width: 600px)");


  function navLinkStyle(isActive) {
    return {
      color: isHomePage ? "white" : "black",
      textDecoration: "none",
    };
  }
  return (
    <div>
      <NavLink style={navLinkStyle} to="/">
        <img
          style={{ objectFit: "cover", width: isMobile ?  "50px" : "100px", height: isMobile ? "50px" : "100px" }}
          src="./public/Logo.jpeg"
          alt="logo"
        />
      </NavLink>
    </div>
  );
};

export default Logo;
