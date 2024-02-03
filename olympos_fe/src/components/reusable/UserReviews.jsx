import {
  Avatar,
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlexBetween, SectionTitle, theme } from "../../theme";
import FlagIcon from "@mui/icons-material/Flag";
import ReviewPagination from "./ReviewPagination";
import StarRateIcon from "@mui/icons-material/StarRate";
import { getDataByRange } from "../../helper/getDataByRange";
import { useSelector } from "react-redux";
import AdminModal from "../../components/reusable/AdminModal";
import AddReviews from "./AddReviews";
import { deleteUserReview } from "../../services/apiUsers";
import { getCookie } from "../../helper/setCookie";
import { useLocation, useNavigate } from "react-router-dom";
import getUserAverageRating from "../../helper/getUserAverageRating";
import { getStarRating } from "../../components/reusable/getStarRating";
let uuid = self.crypto.randomUUID();
const perPage = 3;
// eslint-disable-next-line react/display-name
const UserReviews = ({ reviews, singleHotel, setCrudEventHappened }) => {
  const token = useMemo(() => {
    return getCookie("token");
  }, []);
  const role = useMemo(() => {
    return getCookie("role");
  }, []);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editVal, setEditVal] = useState(null);

  const user = useSelector((state) => state.user.user);

  // per page showing data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const btnCount = useMemo(() =>
    Math.ceil(reviews?.length / perPage, [reviews, perPage])
  );

  // let averageReview = useMemo(() => {
  //   return reviews?.reduce(
  //     (acc, review, i, arr) => acc + review?.rating / arr.length,
  //     0
  //   );
  // }, [reviews]);
  let averageReview = useMemo(() => {
    return getUserAverageRating(reviews)?.toFixed(1);
  }, [reviews]);

  if (!reviews?.length) {
    return;
  }

  function handleOpenReviewEdit(review) {
    setEditVal(review);
    setModalOpen(true);
  }
  function handleDeleteReview(id) {
    deleteUserReview(id).then((res) => {
      navigate(0);
    });
  }

  const range = (page - 1) * perPage;
  const data = getDataByRange(reviews, range, range + perPage);

  // const btnCount = Math.ceil(reviews?.length / perPage);

  return (
    <Box
      sx={{
        display: "flex",
        // alignItems: "center",
        gap: "1.5rem",
        flexDirection: "column",
        mt: "3rem",
        // width: "600px",
      }}
    >
      <SectionTitle>Rəylər</SectionTitle>
      <Box
        sx={{
          fontSize: "50px",
          fontWeight: 700,
          lineHeight: "63px",
          letterSpacing: "0em",
          textAlign: "left",
        }}
      >
        {averageReview}
      </Box>
      <Box sx={{ pt: "0" }}>
        <Divider sx={{}} />
        {data?.map((review, i) => (
          <Box key={review.name + i}>
            <Box
              sx={{
                display: "flex",
                alignItems: {
                  xs: "flex-start",
                  md: "center",
                },
                justifyContent: "space-between",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                // gap: "1rem",
                position: "relative",
                padding: "1.5rem 0",
              }}
              key={review?.name}
            >
              <FlagIcon
                sx={{ position: "absolute", right: "0", top: "10px" }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: "1",
                  gap: "1rem",
                  // backgroundColor: "green",
                }}
              >
                <Avatar
                  sx={{ objectFit: "cover" }}
                  alt="Remy Sharp"
                  src={review.userId?.profile_photo}
                />
                <Stack direction="column">
                  <FlexBetween>
                    <Stack direction="row" spacing={2}>
                      <Typography>{getStarRating(review.rating)}</Typography>
                      <Typography>
                        {review?.userId?.first_name +
                          " " +
                          review?.userId?.last_name}
                      </Typography>
                    </Stack>
                  </FlexBetween>
                  <Typography>{review?.description}</Typography>
                </Stack>
              </Box>
              {/* {user[0]?._id === review?.userId?._id && ( */}
              <Stack
                sx={{
                  width: "100%",
                  display: "flex",
                  flex: 1,
                  // backgroundColor: "red",
                  justifyContent: "end",
                  alignItems: "flex-end",
                  mr: "1.5rem",
                  // backgroundColor: "red",
                }}
              >
                {role === "user" && user[0]?._id === review?.userId?._id && (
                  <>
                    <Button onClick={() => handleOpenReviewEdit(review)}>
                      Düzəliş et
                    </Button>
                    <Button onClick={() => handleDeleteReview(review._id)}>
                      Sil
                    </Button>
                  </>
                )}
                {/* {token?.length && role === "admin" && (
                  <>
                    <Button onClick={() => handleOpenReviewEdit(review)}>
                    Düzəliş et
                    </Button>
                    <Button onClick={() => handleDeleteReview(review._id)}>
                    Sil
                    </Button>
                  </>
                )} */}
              </Stack>
              {/* )} */}
              {modalOpen && (
                <AdminModal openOrClose={modalOpen} setShowInput={setModalOpen}>
                  <AddReviews
                    setCrudEventHappened={setCrudEventHappened}
                    type="hotel"
                    editOrCreate="edit"
                    id={review._id}
                    staleEditVal={editVal}
                  />
                </AdminModal>
              )}
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
      <ReviewPagination page={page} setPage={setPage} btnCount={btnCount} />
    </Box>
  );
};

export default UserReviews;
