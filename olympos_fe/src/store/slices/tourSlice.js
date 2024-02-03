import { createSlice } from "@reduxjs/toolkit";
import { addDays, parseISO } from "date-fns";

const initialState = {
  timeRange: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
    // {
    //   startDate: null,
    //   endDate: new Date(""),
    //   key: "selection",
    // },
  ],
  // timeRange: [
  //   {
  //     startDate: null,
  //     endDate: null,
  //     key: "selection",
  //   },
  // ],
  // timeRange: [],
  type: "",
  // city: null,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTime(state, action) {
      state.timeRange = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    // setCity(state, action) {
    //   state.city = action.payload;
    // },
  },
});

export const { setTime, setCity, setType } = tourSlice.actions;
export const tourReducer = tourSlice.reducer;
