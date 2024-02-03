import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const FooterRegionList = ({ destination }) => {
  return (
    <ListItem disablePadding disableGutters>
      <ListItemButton>
        <Link
          style={{ color: "black", textDecoration: "none" }}
          to={destination.url}
          target="blank"
        >
          <ListItemText primary={destination.name} />
        </Link>
      </ListItemButton>
    </ListItem>
  );
};

export default FooterRegionList;
