import { Button } from "@mui/material";
import { FlexBetween, SectionTitle } from "../../theme";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const SectionHeader = ({ secTitle, btn, link }) => {
  const theme = useTheme();
  return (
    <FlexBetween
      sx={{
        marginBottom: "2rem",
      }}
    >
      <SectionTitle>{secTitle}</SectionTitle>
      <Button>
        <Link
          style={{
            padding: "8px 16px 8px 16px",
            borderRadius: "4px",
            border: `1px solid ${theme.palette.primary.main}`,
            fontFamily: " Montserrat",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "17px",
            letterSpacing: "0em",
            textAlign: "left",
            color: theme.palette.mode === "dark" ? "white" : "#112211",
            textDecoration: "none",
            textTransform: "none",
          }}
          to={link}
        >
          {btn}
        </Link>
      </Button>
    </FlexBetween>
  );
};

export default SectionHeader;
