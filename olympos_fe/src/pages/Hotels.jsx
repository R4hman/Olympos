import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import FormSelections from "../components/reusable/FormSelections";
import { theme } from "../theme";
import format from "date-fns/format";
import ReusableButton from "../components/reusable/ReusableButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import HotelListing from "../components/hotels/HotelListing";
import useHotels from "../features/hotels/useHotels";
import Loader from "../components/reusable/Loader";

import { fetchHotelFilter } from "../services/apiHotels";
import az from "date-fns/locale/az";
import { is } from "date-fns/locale";

const HotelTest = () => {
  const [searchedList, setSearchedList] = useState([]);
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [newPrice, setNewPrice] = useState([0, 0]);

  const [checked, setChecked] = useState([]);
  const [sort, setSort] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [next, setNext] = useState(0);
  const { isHotelsLoading, hotels, error } = useHotels("user");
  const [dataToShow, setDataToShow] = useState([]);
  const [cities, setCities] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isMedium = useMediaQuery("(max-width: 900px)");

  const timeRange = useSelector((store) => store.hotel.timeRange);

  // const startDate = useMemo(() => {
  //
  //   format(timeRange[0].startDate, "yyyy-MM-dd");
  // }, [timeRange]);
  // const endDate = useMemo(() => {
  //   format(timeRange[0].endDate, "yyyy-MM-dd");
  // }, [timeRange]);
  const startDate = format(timeRange[0].startDate, "yyyy-MM-dd", {
    locale: az,
  });
  const endDate = format(timeRange[0].endDate, "yyyy-MM-dd", { locale: az });

  useEffect(() => {
    const minPrice = hotels
      ?.map((hotel) => {
        return hotel.price;
      })
      .sort((a, b) => a - b);

    // const minPrice = Math.min(5, 7);

    if (minPrice) {
      setPriceValue([minPrice[0], minPrice[minPrice.length - 1]]);
    }
  }, [hotels]);

  useEffect(() => {
    if (hotels && hotels.length) {
      setDataToShow(hotels);
    }
  }, [hotels]);

  useEffect(() => {
    fetchHotelFilter(location.search).then((res) => {
      setDataToShow(res);
    });
  }, [location.search]);

  const obj = {};
  if (city) {
    obj.city = city;
  }
  if (country) {
    obj.country = country;
  }
  // if (startDate) {
  //   obj.start_date = startDate;
  // }
  // if (endDate) {
  //   obj.end_date = endDate;
  // }

  obj.start_date = startDate;
  if (startDate !== endDate) {
    obj.end_date = endDate;
  } else {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Get YYYY-MM-DD format

    obj.start_date = formattedDate;
    if (formattedDate !== endDate) {
      obj.end_date = endDate;
    }
  }

  obj.minPrice = newPrice[0] && newPrice[0];
  obj.maxPrice = newPrice[1] && newPrice[1];
  if (checked.length) {
    obj.specifics = checked.join(",");
  }

  function handleSearchList() {
    setSearchParams(obj);
  }

  const handleClearFilter = () => {
    setSearchParams({});
    setSort("");
    setChecked([]);
    setCity(null);
    setCountry(null);
    setNext(0);

    toast.success("Filter təmizləndi");
  };

  useEffect(() => {
    const cities = hotels?.map((hotel) => {
      if (country) {
        if (hotel.country === country) {
          return hotel.city;
        }
      } else {
        return hotel.city;
      }
    });

    setCities(cities);
  }, [country, hotels]);

  const countries = useMemo(
    () => hotels?.map((hotel) => hotel.country),
    [hotels]
  );

  console.log("isHotelLoading", isHotelsLoading);

  if (isHotelsLoading) {
    return <Loader />;
  }

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const sortedData = dataToShow.sort((a, b) => {
    if (sort === "") {
      return;
    }
    if (sort === "low") {
      return a.price - b.price;
    }
    if (sort === "high") {
      return b.price - a.price;
    }
  });

  return (
    <Box>
      <Box
        sx={{
          width: "85%",
          backgroundColor: "white",
          margin: "2rem auto",
          padding: "0.1rem 0 1rem",
          borderRadius: "16px",
          boxShadow: "0px 4px 16px 0px #1122110D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: {
              xs: "flex",
            },
            marginTop: "10px",

            alignItems: "center",
            justifyContent: "center",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "column",
              lg: "row",
            },
          }}
        >
          <FormSelections
            city={city}
            setCity={setCity}
            cities={cities}
            countries={countries}
            country={country}
            setCountry={setCountry}
          />
          <ReusableButton
            isFull={isMedium ? true : false}
            height={53}
            onClick={handleSearchList}
            bgColor={theme.palette.primary.main}
          >
            <SearchIcon />
          </ReusableButton>
        </Box>
      </Box>
      <HotelListing
        searchedList={searchedList}
        setSearchedList={setSearchedList}
        priceValue={priceValue}
        setPriceValue={setPriceValue}
        checked={checked}
        setChecked={setChecked}
        // data={firstData}
        data={sortedData}
        // data={data.length > 0 ? data : firstData}
        isLoading={isHotelsLoading}
        error={error}
        handleClearFilter={handleClearFilter}
        handleSortChange={handleSortChange}
        sort={sort}
        next={next}
        setNext={setNext}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
      />
    </Box>
  );
};

export default HotelTest;
