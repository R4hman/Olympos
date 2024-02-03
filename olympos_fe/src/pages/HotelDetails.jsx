import { NavLink, useNavigate, useParams } from "react-router-dom";

import Loader from "../components/reusable/Loader";
import ErrorMessage from "../components/reusable/ErrorMessage";
import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  CustomContainer,
  FlexBetween,
  IframeWrapper,
  RatingComponent,
  SectionTitle,
  theme,
} from "../theme";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBtn from "../components/reusable/FavoriteBtn";
import ReusableButton from "../components/reusable/ReusableButton";
import UserReviews from "../components/reusable/UserReviews";

import { baseUrl } from "./Tours";
import { useSingleHotel } from "../features/hotels/useHotels";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AdminModal from "../components/reusable/AdminModal";

import { useWishlistBtn } from "../hooks/useWishlistBtn";
import { createHotelOrderApi } from "../services/apiOrders";

import LightBoxGallery from "../components/LightBoxGallery";
import { getCookie } from "../helper/setCookie";
import useUserWishlist from "../features/wishlist/useUserWishlist";
import AddReviews from "../components/reusable/AddReviews";
import getUserAverageRating from "../helper/getUserAverageRating";

const navLinkStyle = () => {
  return {
    textDecoration: "none",
    color: "#112211",
  };
};

const HotelDetailTest = () => {
  const [openBronModal, setOpenBronModal] = useState(false);
  const [bronCounter, setBronCounter] = useState(1);
  const [crudEventHappened, setCrudEventHappened] = useState(false);
  const { isWishlistLoading } = useUserWishlist();

  const token = useMemo(() => getCookie("token"), []);
  const role = useMemo(() => getCookie("role"), []);
  const navigate = useNavigate();
  const params = useParams();
  const { hotelId } = params;

  const { singleHotelLoading, singleHotel, error } = useSingleHotel(
    `${baseUrl}/hotels/single/${hotelId}`
  );
  const { isInFavorite, handleFavoriteClick } = useWishlistBtn(
    singleHotel,
    hotelId,
    "hotel"
  );

  useEffect(() => {}, [crudEventHappened]);

  const userInUserSlice = useSelector((state) => state.user.user);

  if (singleHotelLoading || isWishlistLoading) {
    return <Loader />;
  }

  const handleOpenBronModal = (tour) => {
    if (userInUserSlice?.[0]?.first_name) {
      setOpenBronModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleOrder = (hotel) => {
    const obj = {
      hotelId,
      confirmed_person_count: bronCounter,
    };

    createHotelOrderApi(obj).then((res) => {
      if (res.message === "Your selection has been reserved") {
        setBronCounter(1);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });

    setOpenBronModal(false);
  };

  return (
    <Box>
      {singleHotelLoading && <Loader />}
      {error && <ErrorMessage />}
      {!singleHotelLoading && !error && (
        <CustomContainer>
          <Box sx={{ display: " flex", alignItems: "center", gap: "0.7rem" }}>
            <NavLink to="/" style={navLinkStyle}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontFamily: "Montserrat",
                  fontSize: "17px",
                  fontWeight: 500,
                  lineHeight: "17px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  textDecoration: "none",
                  color: theme.palette.primary.pink,
                }}
              >
                Ana səhifə
                <ChevronRightIcon />
              </Box>
            </NavLink>
            <NavLink style={navLinkStyle} to="/turlar">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontFamily: "Montserrat",
                  fontSize: "17px",
                  fontWeight: 500,
                  lineHeight: "17px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  textDecoration: "none",
                  color: theme.palette.primary.pink,
                }}
              >
                Otellər
                <ChevronRightIcon />
              </Box>
            </NavLink>
            <Typography>{singleHotel?.name}</Typography>
          </Box>
          <FlexBetween sx={{ margin: "1rem 0" }}>
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: {
                      xs: "16px",
                      sm: "20px",
                      md: "24px",
                    },

                    fontWeight: 700,
                    lineHeight: "30px",
                    letterSpacing: "0em",
                    textAlign: "left",
                  }}
                >
                  {singleHotel.name}
                </Typography>
              </Box>

              <RatingComponent>
                {getUserAverageRating(singleHotel?.reviews)}
              </RatingComponent>
            </Stack>
            <Stack spacing={2}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.primary.pink,
                  fontFamily: "Montserrat",
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "29px",
                  letterSpacing: "0em",
                  textAlign: "right",
                }}
              >
                ₼ {singleHotel.price}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <FavoriteBtn
                  id={singleHotel?._id}
                  onClick={(e) => handleFavoriteClick(e)}
                  favoriteClicked={isInFavorite}
                  // isExist={favoriteIsExist}
                />

                <ReusableButton
                  disabled={role === "admin"}
                  onClick={handleOpenBronModal}
                  bgColor={theme.palette.primary.main}
                  width={150}
                  height={48}
                  size="14px"
                >
                  Bron et
                </ReusableButton>
                {openBronModal && (
                  <AdminModal
                    openOrClose={openBronModal}
                    setShowInput={setOpenBronModal}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <FlexBetween>
                        <Typography
                          sx={{
                            textAlign: "center",
                            width: "100%",
                            color: "red",
                            fontSize: "20px",
                          }}
                          variant="body"
                        >
                          {singleHotel?.name}
                        </Typography>
                      </FlexBetween>

                      <ReusableButton
                        onClick={() => handleOrder(singleHotel)}
                        bgColor={theme.palette.primary.main}
                        sx={{}}
                      >
                        Rezerv et
                      </ReusableButton>
                    </Box>
                  </AdminModal>
                )}
              </Box>
            </Stack>
          </FlexBetween>
          <Stack
            sx={{ width: "100%", height: "100%" }}
            direction="row"
            spacing={1}
          >
            <LightBoxGallery photos={singleHotel?.photos} />
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {singleHotel?.pictureURL?.slice(1, 5)?.map((item) => (
                <img width="316px" height="271px" key={item} src={item} />
              ))}
            </Box>
          </Stack>
          <Divider sx={{ margin: "3rem 0" }} />
          <Box sx={{}}>
            <SectionTitle>Məlumat</SectionTitle>
            <Typography sx={{ margin: "1rem 0" }} variant="body1">
              {/* {singleHotel?.description} */}
              <IframeWrapper
                dangerouslySetInnerHTML={{ __html: singleHotel?.description }}
              />
            </Typography>
          </Box>
          <UserReviews
            setCrudEventHappened={setCrudEventHappened}
            singleHotel={singleHotel}
            reviews={singleHotel.reviews}
          />

          {token && role === "user" && (
            <AddReviews
              setCrudEventHappened={setCrudEventHappened}
              type="hotel"
              id={singleHotel._id}
              editOrCreate="create"
            />
          )}
          <Box
            sx={{
              width: "100%",
              // backgroundColor: "red",
            }}
          >
            <IframeWrapper
              dangerouslySetInnerHTML={{ __html: singleHotel?.map }}
            />
            {/* <StringToHtml style={{ width: "100%" }} str={singleHotel.map} /> */}
          </Box>
        </CustomContainer>
      )}
    </Box>
  );
};

export default HotelDetailTest;
