import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import TourListItem from "./TourListItem";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { FlexBetween } from "../../theme";
import ReusableButton from "./ReusableButton";
import SortByPrice from "../SortByPrice";
import { useTheme } from "@emotion/react";

const TourList = ({
  data,
  isLoading,
  error,
  length,
  handleClearFilter,
  handleSortChange,
  sort,
  type,
  compareData,
}) => {
  const isDesktop = useMediaQuery("(max-width:1350px)");
  const modeTheme = useTheme();

  const btnColor = modeTheme.palette.mode === "dark" ? "white" : "black";

  return (
    <Box
      sx={{
        // display: isDesktop ? "flex" : null,
        // alignItems: isDesktop ? "center" : null,
        // flexDirection: isDesktop ? "column" : null,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "auto",
      }}
    >
      <FlexBetween
        sx={{
          mb: "1rem",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Typography variant="subtitle1">
          Axtarışa uyğun {length} tur tapıldı
        </Typography>
        <ReusableButton color={btnColor} onClick={handleClearFilter}>
          Filtrləri təmizlə
        </ReusableButton>
        <SortByPrice handleSortChange={handleSortChange} sort={sort} />
      </FlexBetween>
      <Box
        sx={
          {
            // margin: "0 auto",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }
        }
      >
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
        {!isLoading &&
          !error &&
          data.length > 0 &&
          data?.map((item) => {
            return (
              <TourListItem
                key={item._id}
                type={type}
                item={item}
                compareData={compareData}
              />
            );
          })}
        {data.length === 0 && "No Tour has found"}
      </Box>
    </Box>
  );
};

export default TourList;
