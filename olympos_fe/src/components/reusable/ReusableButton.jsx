import { useTheme } from "@emotion/react";
import { Button, useMediaQuery } from "@mui/material";
import { theme } from "../../theme";

const ReusableButton = ({
  link,
  children,
  color = "black",
  bgColor,
  onClick,
  width,
  height,
  size,
  disabled,
  isFull,
  type,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const modeTheme = useTheme();

  return (
    <Button
      disabled={disabled}
      href={link}
      onClick={onClick}
      sx={{
        // width: {
        //   xs: "100%",
        //   sm: "100%",
        //   // md: `${width}`,
        // },
        width:
          type === "prevNextBtn" ? width : isMobile || isFull ? "100%" : width,
        height: height + "px",
        backgroundColor: bgColor,
        padding: "8px 16px",
        fontSize: size,
        fontWeight: 600,

        color: color ? color : `${theme.palette.primary.main}`,
        textTransform: "none",

        "&:hover": {
          backgroundColor: bgColor,
          transform: "scale(1.05)",
          transition: "all 0.3s linear",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default ReusableButton;
