import { createSlice } from "@reduxjs/toolkit";
import { addDays } from "date-fns";

const initialState = {
  timeRange: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ],
  city: undefined,
  country: undefined,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setTime(state, action) {
      state.timeRange = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setCountry(state, action) {
      state.country = action.payload;
    },
  },
});

export const { setTime, setCity } = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
