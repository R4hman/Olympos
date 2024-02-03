import { createSlice } from "@reduxjs/toolkit";
import { fetchUserWishlist } from "../../services/apiWishlist";

// export const fetchInitialFavorites = () => async (dispatch) => {
//   try {
//     fetchUserWishlist().then((res) => dispatch(setData(res)));
//   } catch (error) {
//     // Handle errors
//     console.error("Error fetching favorites:", error);
//   }
// };

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    //initial olaraq databaseden cekir
    // setData(state, action) {
    //   state.favorites = action.payload;
    // },
    setFavorites(state, action) {
      const item = state.favorites.find((x) => x._id === action.payload._id);
      !item && state.favorites.push(action.payload);
    },
    deleteFavorites(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item._id !== action.payload
      );
    },
    clearFavorites(state) {
      state.favorites = [];
    },
    setIsClicked(state, action) {
      const item = state.favorites.find((f) => +f._id === +action.payload);
      if (item) {
        item.isInFavorite = !item.isInFavorite;
      }
    },
  },
});

export const {
  setFavorites,
  deleteFavorites,
  clearFavorites,
  setIsClicked,
  setData,
} = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;

export const getTotalCartPrice = (state) => {
  state.favorite.favorite.reduce((acc, cur) => acc + cur.price, 0);
};
