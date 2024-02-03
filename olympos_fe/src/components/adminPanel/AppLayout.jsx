import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../home/Logo";
import { Button } from "@mui/material";
import { deleteCookie } from "../../helper/setCookie";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { useTheme } from "@emotion/react";
const drawerWidth = 240;

export default function AppLayout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    deleteCookie(["token", "role", "name"]);
    window.location.reload();
    dispatch(logout());
  };

  const theme = useTheme();

  const navLinkStyle = () => {
    return {
      color: theme.palette.mode === "dark" ? "white" : "black",
      textDecoration: "none",
      fontSize: "22px",
      width: "100%",
    };
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin panel
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            // backgroundColor: "red",
            width: "100%",
            height: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
        </Box>
        <Toolbar />
        {/* <Divider /> */}
        <List>
          {[
            { name: "Sifarişlər", url: "orders" },
            { name: "Turlar", url: "admin-tours" },
            { name: "Otellər", url: "admin-hotels" },
            { name: "İstifadəçilər", url: "admin-users" },
            { name: "Rəylər", url: "admin-reviews" },
            { name: "Kateqori&Spesifikasiya", url: "admin-tur-category" },
          ].map((text, index) => (
            <ListItem key={text.name} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                {/* <ListItemText primary={text} /> */}
                <NavLink style={navLinkStyle} to={text.url}>
                  {text.name}
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={handleLogout}>Çıxış</Button>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",

          maxWidth: "100%",
          overflowX: "hidden",
          p: 1,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
