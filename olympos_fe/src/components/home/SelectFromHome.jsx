import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomContainer, FlexBetween } from "../../theme";
import { Link } from "react-router-dom";
import ReusableButton from "../reusable/ReusableButton";
import SectionHeader from "../reusable/SectionHeader";
import { useTheme } from "@emotion/react";

const SelectFromHome = ({ data, title, link }) => {
  const theme = useTheme();
  return (
    <CustomContainer
      sx={{
        padding:
          title === "Turlar"
            ? "12rem 0rem 0 1rem !important"
            : "5rem 0rem 0 1rem !important",
      }}
    >
      <SectionHeader secTitle={title} link={link} btn={"Daha çox"} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        {data?.map((item, i) => (
          <Link
            style={{
              textDecoration: "none",
              color: "#112211",
            }}
            key={i + 103565666 + i * 556 + i + 46}
            to={
              title === "Turlar"
                ? "turlar/" + `${item._id}`
                : "otellər/" + `${item._id}`
            }
          >
            <Box
              sx={{
                width: 293,
                height: 122,
                boxShadow: "0px 4px 16px 0px #1122110D",
                borderRadius: "16px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <img
                width={90}
                style={{ objectFit: "cover" }}
                height={90}
                src={item.photo || item.photos[0]}
              />
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                  variant="h5"
                >
                  {item.name}
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </CustomContainer>
  );
};

export default SelectFromHome;
