import { memo, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { deleteCookie, getCookie } from "../../helper/setCookie";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { useTheme } from "@emotion/react";

const UserMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const role = getCookie("role");
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const modeTheme = useTheme();
  const isDarkMode = modeTheme.palette.mode === "dark";

  let username;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // deleteCookie(["token", "role", "name"]);
    // navigate("/");
  };

  const handleLogout = () => {
    deleteCookie(["token", "role", "name"]);
    window.location.reload();
    dispatch(logout());
  };

  if (role === "admin") {
    username = "admin";
  } else if (role === "user") {
    username = user?.first_name;
  }
  // username = user?.first_name || "admindzd";

  function navLinkStyle(isActive) {
    return {
      color: theme.palette.mode === "dark" ? "white" : "black",
      textDecoration: "none",
    };
  }

  const theme = useTheme();

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color:
            isDarkMode && !isHomePage
              ? "black"
              : !isDarkMode
              ? "black"
              : "white",
          textTransform: "capitalize",
        }}
      >
        {username}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        {user === "Admin" ? (
          <MenuItem onClick={handleClose}>
            <NavLink style={navLinkStyle} to="/admin-panel">
              Dashboard
            </NavLink>
          </MenuItem>
        ) : (
          <MenuItem>
            <NavLink style={navLinkStyle} to="/account">
              Profil
            </NavLink>
          </MenuItem>
        )}
        <MenuItem onClick={() => handleLogout()}>Çıxış</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
