import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import {
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Star } from "@mui/icons-material";
import { CustomContainer, theme } from "../../theme";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useHomeReviews from "../../features/home/useHomeReviews";
import { v4 as uuidv4 } from "uuid";
import Loader from "../reusable/loader";
import { useTheme } from "@emotion/react";

export default function Reviews() {
  const { isReviewLoading, homeReviews } = useHomeReviews();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const tablet = useMediaQuery("(max-width: 900px)");
  const laptop = useMediaQuery("(max-width: 1200px)");
  const modeTheme = useTheme();
  if (isReviewLoading) {
    return <Loader />;
  }

  const darkOrLight = modeTheme.palette.mode;

  return (
    <CustomContainer
    // display="grid"
    // gridTemplateColumns="repeat(6, 1fr)"
    // gap={4}
    >
      <CssBaseline />
      <Swiper
        // install Swiper modules
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
          overflowX: "clip",
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={tablet ? 1 : 2}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {homeReviews?.map((box) => (
          <SwiperSlide key={uuidv4()}>
            <Box
              gridColumn={tablet ? "span 6" : laptop ? "span 3" : "span 2"}
              sx={{
                maxWidth: "420px",
                padding: "20px",
                borderRadius: "10px",
                height: "auto",
                position: "relative",
                backgroundColor: "white",
                margin: "0 auto",
                // zIndex: "5000 !important",
                "&::after": {
                  content: "''",
                  position: "absolute",
                  top: "2rem",
                  left: "2rem",
                  width: "100%",
                  height: "100%",
                  backgroundColor: `${theme.palette.primary.main}`,
                  borderRadius: "1rem",
                  zIndex: -1,
                },
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                // "&:hover": {
                //   transform: "scale(1.03)",
                //   backgroundColor: "transparent",
                //   boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                //   zIndex: 1,
                // },

                // margin: {
                //   xs: "0 auto",
                //   sm: "0 auto",
                // },
              }}
            >
              <CardContent sx={{ zIndex: 1500 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{
                    marginTop: "0",
                    color: "black",
                  }}
                >
                  {box?.title}
                </Typography>

                <ReviewSubtitle>{box?.description.slice(0, 50)}</ReviewSubtitle>

                <Box sx={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  {Array.from({ length: box?.rating }).map((star) => (
                    <Star key={uuidv4()} sx={{ color: "#FFC107" }} />
                  ))}
                </Box>
                <Box sx={{ marginTop: "1rem" }}>
                  <Typography
                    sx={{
                      color: "black",
                    }}
                    variant="subtitle1"
                  >
                    {box?.userId?.first_name + " " + box?.userId.last_name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    {box.job}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "1rem" }}>
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    {box?.hotelId ? box?.hotelId?.name : box?.tourId?.name}
                  </Typography>
                </Box>
              </CardContent>
              <CardMedia
                sx={{ height: 200, borderRadius: "10px" }}
                image={box.hotelId ? box?.hotelId.photos[0] : box.tourId?.photo}
                title="green iguana"
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomContainer>
  );
}

function ReviewSubtitle({ children }) {
  const [viewMore, setViewMore] = useState(true);

  return (
    <Box
      sx={{
        transition: "all 1s linear",
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "17px",
          letterSpacing: "0em",
          textAlign: "left",
          marginTop: "2rem",
          color: "#111111",
        }}
        variant="body2"
        color="text.secondary"
      >
        {viewMore ? children.split(" ").slice(0, 50).join(" ") : children}
      </Typography>
      {/* <Typography
        variant="subtitle2"
        onClick={() => setViewMore((curr) => !curr)}
        sx={{
          textAlign: "right",
          cursor: "pointer",
          transition: "all 1s linear",
        }}
      >
        {viewMore ? "...Ətraflı" : "Daha az"}
      </Typography> */}
    </Box>
  );
}
