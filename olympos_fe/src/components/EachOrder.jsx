import { Box, Button, Typography } from "@mui/material";
import React from "react";

const EachOrder = ({ item }) => {
  return (
    <Box
      key={item.city + i}
      sx={{
        backgroundColor: "#ccc",
        padding: "1rem",
        mb: "1rem ",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>
        {item.user?.first_name || item.user} adlı istifadəçi{" "}
        {item.orderDate.split("T")[0]} tarixində {item.count} ədəd {item.city}{" "}
        turunu sifariş etdi
      </Typography>
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button
          sx={{
            backgroundColor: "#59A96A",
            color: "white",
            textTransform: "capitalize",

            "&:hover": {
              backgroundColor: "#59A96A",
            },
          }}
          onClick={() => handleSubmitTour(item.id)}
        >
          Təsdiqlə
        </Button>
        <Button
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: "white",
            textTransform: "capitalize",

            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={() => handleSubmitTour(item.id)}
        >
          Düzəliş et
        </Button>
        <Button
          sx={{
            backgroundColor: theme.palette.error.main,
            color: "white",
            textTransform: "capitalize",

            "&:hover": {
              backgroundColor: theme.palette.error.main,
            },
          }}
          onClick={() => handleCancelOrder(item.id)}
        >
          Ləğv et
        </Button>
      </Box>
    </Box>
  );
};

export default EachOrder;
