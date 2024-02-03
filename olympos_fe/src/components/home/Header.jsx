import {
  Box,
  Stack,
  Typography,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import { useEffect, useMemo, useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { State } from "country-state-city";
import DateRangePicker from "../DateRangePicker";

import { CustomContainer, FlexBetween, theme } from "../../theme";
import ReusableButton from "../reusable/ReusableButton";
import { Link, NavLink, useSearchParams, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import FormSelections from "../reusable/FormSelections";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import az from "date-fns/locale/az";
import { getTime } from "../../helper/getTime";
import toast from "react-hot-toast";

const linkStyle = (isActive) => {
  return {
    color: "black",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };
};

const Header = ({ months, typeOfTours }) => {
  const navigate = useNavigate();
  const [params, setSearchParams] = useSearchParams();
  const location = useLocation();

  const timeRange = useSelector((store) => store.tour.timeRange);
  const selectedTourType = useSelector((store) => store.tour.type);

  const timeSTART = format(timeRange[0].startDate, "yyyy-MM-dd", {
    locale: az,
  });
  const timeEND = format(timeRange[0].endDate, "yyyy-MM-dd", { locale: az });
  const month = timeRange;
  // const { timeEND, timeSTART } = useMemo(() => getTime(timeRange), [timeRange]);

  const handleNavigate = () => {
    if (selectedTourType) {
      setSearchParams({
        // city: selectedTourType?.split(" ")[0],
        type: selectedTourType,
        month,
      });
      navigate(`/turlar?category=${selectedTourType}&start_date=${timeSTART}`);
    } else {
      toast.error("Tarix aralığı və kateqoriya seçin");
    }
  };

  const h1Variants = useMemo(() => {
    return {
      hidden: {
        x: -250,
      },
      visible: {
        x: 0,
        transition: { type: "spring", stiffness: 70 },
      },
    };
  }, []);

  return (
    <Stack sx={{ position: "relative", margin: "15px", height: "500px" }}>
      <CssBaseline />
      <img
        src="/public/assets/main-img.png"
        alt="main-img"
        width="100%"
        height="100%"
        style={{ objectFit: "cover", borderRadius: "5px" }}
      />
      {/* <Navbar /> */}
      <Box
        sx={{
          textAlign: "center",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
        }}
      >
        <Typography
          component={motion.p}
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 500 }}
          variant="p"
          sx={{
            fontSize: {
              xs: "16px",
              sm: "18px",
              md: "25px",
              lg: "30px",
              xl: "35px",
            },
          }}
        ></Typography>
        <Typography
          component={motion.h3}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1.8 }}
          variant="h1"
          sx={{
            fontSize: {
              xs: "30px",
              sm: "35px",
              md: "60px",
              lg: "80px",
              xl: "100px",
            },
          }}
        >
          OLYMPOS TRAVEL
        </Typography>
        <Typography
          component={motion.h1}
          variants={h1Variants}
          initial="hidden"
          animate="visible"
          variant="h3"
          sx={{
            fontSize: {
              xs: "20px",
              sm: "28px",
              md: "35px",
              lg: "40",
              xl: "50px",
            },
          }}
        >
          Xəyal etdiyiniz yerlərə səyahət edin!
        </Typography>
      </Box>
      <CustomContainer
        sx={{
          borderRadius: "20px",
          height: "250px",
          position: "absolute",
          bottom: "-125px",
          left: "50%",
          top: "500px",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px" + "!important",
          zIndex: 100,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: "2rem" }}>
          <Box
            sx={{
              borderRight: "1px solid grey",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              width: "100px",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            <NavLink style={linkStyle} to="/turlar">
              <FlightIcon />
              <Typography variant="subtitle1">Turlar</Typography>
            </NavLink>
          </Box>
          <Box
            sx={{
              marginLeft: "1.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              width: "100px",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            <NavLink style={linkStyle} to="/otellər">
              <HotelIcon />
              <Typography variant="subtitle1">Otellər</Typography>
            </NavLink>
          </Box>
        </Box>

        <FormSelections
          months={months}
          forType="tour"
          typeOfTours={typeOfTours}
          showSelectComponent
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "2rem" }}>
          <ReusableButton
            bgColor={theme.palette.primary.main}
            width={144}
            height={48}
            onClick={handleNavigate}
          >
            <TelegramIcon sx={{ marginRight: "0.2rem" }} />
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "17px",
                letterSpacing: "0em",
                textAlign: "left",
                textTransform: "capitalize",
              }}
            >
              Turlara bax
            </Typography>
          </ReusableButton>
        </Box>
      </CustomContainer>
    </Stack>
  );
};

export default Header;
