import React, { useEffect, useMemo, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, IconButton } from "@mui/material";
import { theme } from "../../theme";
import { useSelector } from "react-redux";
import { getCookie } from "../../helper/setCookie";
import useUserWishlist from "../../features/wishlist/useUserWishlist";

const FavoriteBtn = ({ favoriteClicked, onClick }) => {
  const role = useMemo(() => getCookie("role"), []);
  return (
    <IconButton
      disabled={role === "admin"}
      className="favorite-btn"
      onClick={onClick}
      sx={{
        width: "48px",
        height: "48px",
        borderRadius: "4px",
        border: `1px solid ${theme.palette.primary.main}`,
      }}
    >
      {favoriteClicked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteBtn;
