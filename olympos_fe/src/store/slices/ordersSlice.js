import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";
// const user = useSelector((store) => store.user.user);

const initialState = {
  // orders: user?.user_orders?.push("salam"),
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      // state.orders = [...state.orders, ...action.payload];
      // const item = state.orders.find((x) => x.id === action.payload.id);
      // !item && [...state.orders, action.payload];
      // return [...state.orders, action.payload];
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((el) => el.id !== action.payload);
    },
  },
});

export const { addOrder, deleteOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
