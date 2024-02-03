/* eslint-disable react/prop-types */
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import { memo, useMemo } from "react";

const AuthUser = ({ user, isMobile }) => {
  function navLinkStyle(isActive) {
    return {
      color: "black",
      textDecoration: "none",
    };
  }

  return (
    <Stack direction="row" spacing={2}>
      {!isMobile && (
        <Divider orientation="vertical" variant="middle" flexItem />
      )}
      <Box sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
        <Avatar src={user?.profile_photo} />
        <UserMenu user={user?.user ? user.user : user} />
      </Box>
    </Stack>
  );
};

export default AuthUser;
