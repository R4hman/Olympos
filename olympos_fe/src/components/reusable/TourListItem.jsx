import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FlexBetween, RatingComponent, theme } from "../../theme";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBtn from "./FavoriteBtn";
import { useDispatch, useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";

import FmdGoodIcon from "@mui/icons-material/FmdGood";
import useUserWishlist from "../../features/wishlist/useUserWishlist";
import { useWishlistBtn } from "../../hooks/useWishlistBtn";
import { getCookie } from "../../helper/setCookie";
import getUserAverageRating from "../../helper/getUserAverageRating";
import { getStarRating } from "../../components/reusable/getStarRating";
import { useTheme } from "@emotion/react";

const LinkStyles = () => {
  return {
    TextDecoderation: "none",
  };
};

const TourListItem = ({ item, favorite, isFavorite, compareData }) => {
  const [heartIcon, setHeartIcon] = useState(false);
  const { wishlist, isWishlistLoading } = useUserWishlist();
  const token = getCookie("token");
  const role = getCookie("role");
  const modeTheme = useTheme();
  // eger isWishlist varsa demeli tourListItem wishlist sehifesindedir ve click ile wishliste salinib evvelceden
  const type = item?.photos ? "hotel" : "tour";
  // const itemId =
  //   token && role === "user" ? item?.[`${type}Id`]?._id : item?._id;
  const itemId = item?._id;

  const { isInFavorite, handleFavoriteClick } = useWishlistBtn(
    item,
    itemId,
    type
  );

  const ratingData = compareData?.find((el) => el._id === item?._id);

  let imageUrl;

  if (favorite) {
    if (item?.hotelId) {
      imageUrl = item?.hotelId.photos?.[0];
    } else if (item?.photos) {
      imageUrl = item?.photos[0];
    } else if (item?.tourId) {
      imageUrl = item?.tourId?.photo;
    } else if (item?.photo) {
      imageUrl = item?.photo;
    }
  } else {
    if (type === "tour") {
      imageUrl = item?.photo;
    } else {
      imageUrl = item?.photos[0];
    }
  }

  const isTablet = useMediaQuery("(max-width: 600px)");
  const path = isFavorite
    ? type === "tour"
      ? `/turlar/${item?._id}`
      : `/otellər/${item?._id}`
    : `${item?._id}`;

  return (
    <Link style={{ textDecoration: "none" }} to={path}>
      <Card
        sx={{
          // width: favorite || isTablet ? "300px" : null,
          width: {
            xs: "300px",
            sm: "565px",
            md: "800px",
          },
          height: {
            xs: "430px",
            sm: "250px",
          },
          display: "flex",
          alignItems: "center",

          flexDirection: isTablet ? "column" : "row",
          borderRadius: "12px",
          mb: "1.5rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: {
              xs: 300,
              sm: 250,
              md: 300,
            },
            height: {
              xs: 198.5,
              sm: 298.5,
              md: 298.5,
            },
            objectFit: "cover",
          }}
          image={imageUrl}
          alt="Live from space album cover"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "100%",
            padding: "1rem",
            height: "100%",
          }}
        >
          <CardContent sx={{ width: "100%", padding: "0" }}>
            <Box
              sx={{
                display: "flex",
                gap: "2rem",
                justifyContent: "space-between",
              }}
              direction="row"
            >
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "center",
                  flexDirection: "column",
                  gap: "21px",
                  flex: 5,
                }}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: {
                      xs: "14px",
                      sm: "20px",
                    },

                    fontWeight: 700,
                    lineHeight: "25px",
                    letterSpacing: "0em",
                    textAlign: "left",
                  }}
                  component="div"
                  variant="h5"
                >
                  {item?.name?.toLowerCase() ||
                    item?.hotelId?.name?.toLowerCase() ||
                    item?.tourId?.name?.toLowerCase()}
                </Typography>
                <Box component="div" variant="h5">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    {item?.location && (
                      <div>
                        <FmdGoodIcon sx={{ width: "18px" }} />
                        <Typography
                          sx={{
                            fontFamily: " Montserrat",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "15px",
                            letterSpacing: "0em",
                            textAlign: "left",
                          }}
                          // variant="body1"
                        >
                          {item?.location?.substring(0, 50)}
                        </Typography>
                      </div>
                    )}
                    {item.tour_day && (
                      <div>
                        {getStarRating(
                          getUserAverageRating(ratingData?.reviews)
                        )}
                      </div>
                    )}
                  </Box>
                </Box>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: "center",
                    display: {
                      xs: "none",
                      sm: "flex",
                    },
                  }}
                >
                  <RatingComponent
                    color={
                      modeTheme.palette.mode === "dark" ? "white" : "black"
                    }
                  >
                    {getUserAverageRating(ratingData?.reviews) || 0}
                  </RatingComponent>
                  <Typography>{item.reviews.length} rəy</Typography>
                </Stack>
              </Box>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  display: "flex",
                  flex: 2,
                  padding: 0,
                  margin: 0,
                  textAlign: "right",
                  justifyContent: "center",
                  fontSize: "22px",
                  color: `${theme.palette.primary.pink}`,
                }}
              >
                {/* ₼ {item?.price} */}

                {item?.tour_day ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span>₼ {item?.price}</span>
                    <span>{item?.tour_day} gün</span>
                    <span style={{ fontSize: "18px" }}>
                      {item?.tour_date.slice(0, 10)}
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span>₼ {item?.price}</span>

                    <span style={{ fontSize: "14px" }}>
                      {item?.start_date.slice(0, 10)}/
                      {item?.end_date.slice(5, 10)}
                    </span>
                  </div>
                )}
              </Typography>
            </Box>
          </CardContent>

          <Stack direction="row" spacing={2} sx={{ mt: "0.5rem" }}>
            <FavoriteBtn
              onClick={(e) => handleFavoriteClick(e)}
              favoriteClicked={isInFavorite}
              id={item?._id}
            />
            <Button
              sx={{
                backgroundColor: `${theme.palette.primary.main}`,
                borderRadius: "4px",
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "17px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "black",
                textTransform: "capitalize",
                // width: favorite ? "50%" : "100%",
                width: "100%",

                "&:hover": { backgroundColor: `${theme.palette.primary.main}` },
              }}
            >
              Ətraflı
            </Button>
          </Stack>
        </Box>
      </Card>
    </Link>
    // </Link>
  );
};

export default TourListItem;
