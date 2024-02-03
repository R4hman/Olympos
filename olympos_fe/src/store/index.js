import { configureStore } from "@reduxjs/toolkit";
import { tourReducer } from "./slices/tourSlice";
import { hotelReducer } from "./slices/hotelSlice";
import { favoriteReducer } from "./slices/favoritesSlice";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { orderReducer } from "./slices/ordersSlice";

const persistConfig = {
  key: ["favorite", "order", "user"],
  version: 1,
  storage,
  blacklist: ["tour", "hotel"],
};

const reducer = combineReducers({
  tour: tourReducer,
  favorite: favoriteReducer,
  user: userReducer,
  hotel: hotelReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
