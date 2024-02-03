import { Box, Divider, Typography, Slider, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FlexBetween, theme } from "../../theme";
import { useEffect, useState } from "react";

const Filters = ({ priceValue, setNewPrice, newPrice }) => {
  const handleChange = (event, newValue) => {
    setNewPrice(newValue);
  };

  useEffect(() => {
    setNewPrice(priceValue);
  }, [priceValue]);

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: "0.5rem",

          fontFamily: "Montserrat",
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: "24px",
          letterSpacing: "0em",
          textAlign: "left",
        }}
      >
        Filtrlər
      </Typography>
      <Stack>
        <FlexBetween>
          <Typography variant="subtitle1">Qiymət aralığı</Typography>
          <KeyboardArrowDownIcon />
        </FlexBetween>
        <Box>
          <Slider
            // getAriaLabel={() => "Temperature range"}
            value={newPrice}
            onChange={handleChange}
            valueLabelDisplay="auto"
            //   getAriaValueText={valuetext}
            min={priceValue[0]}
            max={priceValue[1]}
            sx={{
              "&.MuiSlider-root": {
                color: `${theme.palette.primary.main}`,
              },
            }}
          />
          <FlexBetween>
            <Typography variant="subtitle2">₼ {newPrice[0]}</Typography>
            <Typography variant="subtitle2">₼ {newPrice[1]}</Typography>
          </FlexBetween>
        </Box>
      </Stack>
      <Divider sx={{ padding: "0.5rem" }} />
    </Box>
  );
};

export default Filters;
