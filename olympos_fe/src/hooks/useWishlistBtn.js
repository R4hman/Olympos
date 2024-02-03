import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavorites,
  setFavorites,
  setIsClicked,
} from "../store/slices/favoritesSlice";
import { toast } from "react-hot-toast";
import { getCookie } from "../helper/setCookie";
import { useEffect, useMemo, useState } from "react";
import useUserWishlist from "../features/wishlist/useUserWishlist";
import useCreateWishlist from "../features/wishlist/useCreateWishlist";
import useDeleteWishlist from "../features/wishlist/useDeleteUser";
import { useLocation } from "react-router-dom";

export const useWishlistBtn = (item, id, type) => {
  const [isInFavorite, setIsInFavorite] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.favorite.favorites);
  const user = useSelector((store) => store.user.user);
  const { wishlist, isWishlistLoading } = useUserWishlist();
  const { isWishlistCreating, createUserWishlist } = useCreateWishlist();
  const { wishlistDeleteLoading, deleteUserWishlist } = useDeleteWishlist();
  const token = useMemo(() => getCookie("token"), []);
  const role = useMemo(() => getCookie("role"), []);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (
      !isWishlistLoading &&
      user.length &&
      role === "user" &&
      token &&
      wishlist.length
    ) {
      // const isExistInWishlist = wishlist.find((list) => list._id === id);
      const isExistInWishlist = wishlist?.find(
        (list) => list?.[`${type}Id`]?._id === id
      );
      setIsInFavorite(!!isExistInWishlist);
    } else {
      const isExistInFavorites = favorites.find((favor) => favor._id === id);
      setIsInFavorite(!!isExistInFavorites);
    }
  }, [
    favorites,
    id,
    isWishlistLoading,
    role,
    token,
    user.length,
    wishlist,
    type,
    // pathname,
  ]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();

    if (user.length && role === "user" && token && !isWishlistLoading) {
      // const existEl = wishlist?.find((list) => list._id === id);
      const existEl = wishlist?.filter(
        (list) => list?.[`${type}Id`]?._id === id
      );

      if (existEl.length) {
        deleteUserWishlist(id);
        // deleteWishlist(id);
        toast.success("İstək siyahısından çıxarıldı");
        setIsInFavorite(false);
      } else {
        const obj = { [`${type}Id`]: id };
        createUserWishlist(obj);
        // createWishlist(obj);
        setIsInFavorite(true);

        toast.success("İstək siyahısına əlavə edildi");
      }
    } else {
      const existEl = favorites.find((el) => el._id === id);

      if (existEl) {
        dispatch(deleteFavorites(item._id));
        toast.success("İstək siyahısından çıxarıldı");
        // setIsInFavorite(false);
      } else {
        dispatch(setFavorites(item));
        setIsInFavorite(true);

        toast.success("İstək siyahısına əlavə edildi");
      }
      dispatch(setIsClicked(item._id));
    }
  };

  return { isInFavorite, handleFavoriteClick };
};
