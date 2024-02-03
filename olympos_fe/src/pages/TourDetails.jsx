import { NavLink, useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Loader from "../components/reusable/Loader";
import ErrorMessage from "../components/reusable/ErrorMessage";
import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  CustomContainer,
  FlexBetween,
  IframeWrapper,
  SectionTitle,
  theme,
} from "../theme";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBtn from "../components/reusable/FavoriteBtn";
import ReusableButton from "../components/reusable/ReusableButton";
import UserReviews from "../components/reusable/UserReviews";

import AdminModal from "../components/reusable/AdminModal";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { useMemo, useState } from "react";

import { useCreateOrder } from "../features/orders/useCreateOrder";
import { useWishlistBtn } from "../hooks/useWishlistBtn";
import { createTourOrderApi } from "../services/apiOrders";
import AddReviews from "../components/reusable/AddReviews";
import { getCookie } from "../helper/setCookie";
import { useSingleTour } from "../features/tours/useTours";

const navLinkStyle = () => {
  return {
    textDecoration: "none",
    color: "#112211",
  };
};

export const operationStyle = {
  padding: "5px",
  border: "1px solid black",
  background: "#ccc",
  color: "black",
  marginRight: "10px",
  userSelect: "none",
  cursor: "pointer",
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const TourDetails = () => {
  const [openBronModal, setOpenBronModal] = useState(false);
  const [bronCounter, setBronCounter] = useState(1);

  const params = useParams();
  const navigate = useNavigate();
  const { tourId } = params;
  const token = useMemo(() => getCookie("token"), []);
  const role = useMemo(() => getCookie("role"), []);

  const { data, isLoading, error } = useFetch(`${baseUrl}/tour/${tourId}`);
  // const { singleTour, singleTourLoading } = useSingleTour(
  //   `${baseUrl}/tour/${tourId}`
  // );

  const { isInFavorite, handleFavoriteClick } = useWishlistBtn(
    data,
    tourId,
    "tour"
  );

  const userInUserSlice = useSelector((state) => state.user.user);

  // if (singleTourLoading) {
  //   return;
  // }
  // console.log(
  //   "singleTour: " + Object.keys(singleTour),
  //   singleTour.message,
  //   data
  // );

  const handleOpenBronModal = (tour) => {
    if (userInUserSlice?.[0]?.first_name) {
      setOpenBronModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleOrder = (tour) => {
    const obj = {
      tourId,
      confirmed_person_count: bronCounter,
    };

    createTourOrderApi(obj).then((res) => {
      if (res.message === "Your selection has been reserved") {
        setBronCounter(1);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });

    setOpenBronModal(false);
  };

  const handleCounter = (operation) => {
    if (operation === "increment") {
      setBronCounter((prev) =>
        prev < data.person_count - data.confirmed_person_count ? prev + 1 : prev
      );
    } else {
      if (bronCounter > 1) {
        setBronCounter((prev) => prev - 1);
      }
    }
  };

  return (
    <Box>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && (
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
                Turlar
                <ChevronRightIcon />
              </Box>
            </NavLink>
            <Typography>{data?.name}</Typography>
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
                  {data?.name}
                </Typography>
              </Box>
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
                ₼ {data?.price}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <FavoriteBtn
                  onClick={(e) => handleFavoriteClick(e)}
                  favoriteClicked={isInFavorite}
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
                            color: "red",
                            fontSize: "20px",
                          }}
                          variant="body"
                        >
                          {data?.name}
                        </Typography>
                        <Typography
                          sx={{
                            ml: "1rem",
                          }}
                        >
                          boş yerlərin sayı:{" "}
                          {data?.person_count - data?.confirmed_person_count}
                        </Typography>
                      </FlexBetween>
                      <FlexBetween>
                        <Typography>Turun sayını daxil edin</Typography>
                        <Box>
                          <span
                            style={operationStyle}
                            onClick={() => handleCounter("increment")}
                          >
                            +
                          </span>
                          <span style={operationStyle}>{bronCounter}</span>
                          <span
                            style={operationStyle}
                            onClick={() => handleCounter("decrement")}
                          >
                            -
                          </span>
                        </Box>
                      </FlexBetween>
                      <ReusableButton
                        disabled={
                          data?.person_count - data?.confirmed_person_count <= 0
                        }
                        onClick={() => handleOrder(data)}
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
            sx={{ width: "100%", height: "550px" }}
            direction="row"
            spacing={1}
          >
            <Box sx={{ width: "100%", objectFit: "cover" }}>
              <img
                src={data?.photo}
                width="100%"
                height="100%"
                alt="main-img"
                style={{ objectFit: "cover" }}
              />
            </Box>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {data?.pictureURL?.slice(1, 5)?.map((item) => (
                <img width="316px" height="271px" key={item} src={item} />
              ))}
            </Box>
          </Stack>
          <Divider sx={{ margin: "3rem 0" }} />
          <Box sx={{}}>
            <SectionTitle>Məlumat</SectionTitle>
            <Typography sx={{ margin: "1rem 0" }} variant="body1">
              <IframeWrapper
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
            </Typography>
          </Box>

          <UserReviews reviews={data.reviews} />
          {token && role === "user" && (
            <AddReviews type="tour" id={data._id} editOrCreate="create" />
          )}

          {/* {data.position && <Map mapPosition={data.position} />} */}
          {/* <IframeWrapper dangerouslySetInnerHTML={{ __html: data.position }} /> */}
        </CustomContainer>
      )}
    </Box>
  );
};

export default TourDetails;
