import styled from "@emotion/styled";
import { Box, Typography, createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#8dd3bb",
      light: "#CDEAE1",
      body: "#fafbfc",
      pink: "#FF8682",
      gold: "#FAAF00",
    },
  },
});

export const FlexBetween = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const CustomContainer = styled(Box)({
  // backgroundColor: "blue",
  width: "85%",
  margin: "0 auto",
  padding: "1rem 0",
});

export const RatingComponent = styled(Typography)({
  margin: 0,
  // fontFamily: "Roboto","Helvetica","Arial",sans-serif,
  fontWeight: 400,
  lineHeight: 1.75,
  letterSpacing: "0.00938em",
  // color: `black`,
  fontSize: "1.2rem",
  width: "40px",
  height: "32px",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.primary.main}`,
  textAlign: "center",
});

export const SectionTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: "25px",
  letterSpacing: "0em",
  textAlign: "left",
  // margin: "1rem 0",
});

export const IframeWrapper = styled(Typography)({
  width: "100%",
  "& iframe": {
    width: "100%",
  },
});
