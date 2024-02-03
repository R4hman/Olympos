import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TourListItem from "../components/reusable/TourListItem";
import { CustomContainer, theme } from "../theme";
import useUserWishlist from "../features/wishlist/useUserWishlist";
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "../helper/setCookie";
import Loader from "../components/reusable/Loader";

import useTours from "../features/tours/useTours";
import useHotels from "../features/hotels/useHotels";
import EmptyFavorite from "../components/reusable/EmptyFavorite";

const FavoriteTours = () => {
  let favs = useSelector((store) => store.favorite.favorites);
  const user = useSelector((store) => store.user.user);
  const [favorites, setFavorites] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const token = useMemo(() => getCookie("token"), []);
  const role = useMemo(() => getCookie("role"), []);

  const [allDataTogether, setAllDataTogether] = useState([]);

  const {
    wishlist,
    isWishlistLoading,
    isError,
    error: wishlistError,
  } = useUserWishlist();
  const { isToursLoading, tours } = useTours("user");
  const { isHotelsLoading, hotels } = useHotels("user");

  // useEffect(() => {
  //   const fetchData = async () => {
  //
  //     try {
  //       const [tours, hotels] = await Promise.all([
  //         fetchClientSideToursApi(),
  //         fetchClientSideHotel(),
  //       ]);

  //       setAllDataTogether((prev) => [...prev, ...tours, ...hotels]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [wishlist]);
  useEffect(() => {
    if (!isToursLoading && !isHotelsLoading) {
      setAllDataTogether((prev) => [...prev, ...tours, ...hotels]);
    }
  }, [hotels, isHotelsLoading, tours, isToursLoading]);

  useEffect(() => {
    if (user.length && token && role === "user") {
      if (isWishlistLoading) {
        return;
      }

      if (
        setAllDataTogether?.length &&
        !isWishlistLoading &&
        Array.isArray(wishlist)
      ) {
        const arr = allDataTogether?.filter((obj1) => {
          return wishlist?.some(
            (obj2) =>
              obj2?.[obj2.hotelId ? "hotelId" : "tourId"]?._id === obj1._id
          );
        });

        setFavorites(arr);
      }
    } else {
      setFavorites(favs);
    }
  }, [token, role, user, favs, wishlist, isWishlistLoading, allDataTogether]);

  if (isWishlistLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{wishlistError.message}</div>;
  }

  return (
    <Box>
      <CustomContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "center",
              md: "flex-start",
            },
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {wishlist && favorites.length ? (
            favorites?.map((item) => (
              <TourListItem
                isFavorite={true}
                favorite
                key={item._id}
                item={item}
                compareData={tours}
              />
            ))
          ) : (
            <EmptyFavorite />
          )}
        </Box>
      </CustomContainer>
    </Box>
  );
};

export default FavoriteTours;
