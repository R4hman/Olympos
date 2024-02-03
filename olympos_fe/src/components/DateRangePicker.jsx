import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DateRange } from "react-date-range";

import format from "date-fns/format";
import { addDays } from "date-fns";
import { az } from "date-fns/locale";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Box, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../store/slices/hotelSlice";
import { setTime as setTourTime } from "../store/slices/tourSlice";
import { getTime } from "../helper/getTime";

const isStyleEnabled = false;

const DateRangePicker = ({ type }) => {
  const dispatch = useDispatch();
  const timeRange = useSelector((store) =>
    type === "tour" ? store.tour.timeRange : store.hotel.timeRange
  );
  // open close
  const [open, setOpen] = useState(false);

  //helper funksiya
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { time } = useMemo(() => getTime(timeRange), [timeRange]);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleTimeChange = (e) => {
    const set = type === "tour" ? setTourTime : setTime;
    dispatch(set([e.selection]));
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <Box
      className={
        isStyleEnabled ? "css-1koo2zv-MuiInputBase-root-MuiInput-root" : ""
      }
      sx={{
        display: "inline-block",
        position: "relative",
        width: {
          xs: "300px",
          sm: "400px",
        },
        "&.css-1koo2zv-MuiInputBase-root-MuiInput-root": {
          borderBottom: "5px solid red ",
        },
        // "&:MuiInput-root:before": {
        //   borderBottom: "5px solid red ",
        // },
        // "&:.css-1koo2zv-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
        //   {
        //     borderBottom: "5px solid red ",
        //   },
        // "&.css-1koo2zv-MuiInputBase-root-MuiInput-root": {
        //   "&:hover": {
        //     borderBottom: "5px solid red ",
        //   },
        // },
      }}
    >
      <Input
        placeholder={time || "Tarix seç"}
        readOnly
        // color="danger"
        sx={{
          fontSize: "16px",
          padding: {
            xs: "11px 50px 11px 50px",
            sm: "11px 80px 11px 80px",
          },

          borderRadius: "3px",
          border: "1px solid #D3D3D3",
          color: "black !important",
          opacity: 1,
          width: "100%",
          minWidth: 0,
          textAlign: "center",
          "& .MuiInputBase-input": {
            padding: {
              xs: null,
              sm: "4px 30px 4px",
            },
          },
        }}
        onClick={() => setOpen((open) => !open)}
      />

      <Box
        ref={refOne}
        sx={{
          position: "absolute",
          left: {
            xs: "54.5%",
            sm: "68%",
          },
          transform: "translateX(-50%)",
          top: "70px",
          zIndex: "999",
          overflow: "hidden",
          width: "120%",
        }}
      >
        {open && (
          <DateRange
            format="yyyy-MM-dd HH:mm:ss"
            timeFor
            locale={az}
            // onChange={(e) => dispatch(setTime([e.selection]))}
            onChange={handleTimeChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={timeRange}
            months={1}
            direction="horizontal"
            sx={{
              position: "absolute",
              left: "30%",
              transform: "translateX(-50%)",
              top: "40px",
              border: "1px solid #ccc",
              zIndex: "999",
              overflow: "hidden",
              width: "500px",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DateRangePicker;
