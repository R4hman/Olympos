import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";

const linkStyle = {
  textDecoration: "none",
  fontSize: "18px",
  fontStyle: "italic",
  backgroundColor: `${theme.palette.primary.main}`,
  color: "white",
  padding: "0.5rem",
  borderRadius: "10px",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.3)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
};

const EmptyFavorite = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        height: "70vh",
      }}
    >
      <img
        style={{ width: "300px", height: "300px" }}
        src="./assets/favorites.png"
        alt="istək siyahısı"
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          İstək siyahısı boşdur. Zəhmət olmasa tur və ya otel seçin.
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <Link style={linkStyle} to="/turlar">
            Turlar
          </Link>
          <Link style={linkStyle} to="/otellər">
            Otellər
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default EmptyFavorite;
