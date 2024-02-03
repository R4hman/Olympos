import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import TourListing from "../components/tours/TourListing";

import FormSelections from "../components/reusable/FormSelections";
import { theme } from "../theme";
import ReusableButton from "../components/reusable/ReusableButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../store/slices/tourSlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useTours from "../features/tours/useTours";
import Loader from "../components/reusable/Loader";
import { fetchTourFilter } from "../services/apiTours";
import { format } from "date-fns";
import az from "date-fns/locale/az";

export const baseUrl = import.meta.env.VITE_BASE_URL;

const Tours = ({ months, typeOfTours }) => {
  const [priceValue, setPriceValue] = useState([0, 0]);
  // priceRange slider-de min max deyerleri ucundu ve bir defe alandan sonra hec vaxt deyismir amma priceValue deyisir
  const [newPrice, setNewPrice] = useState([0, 0]);
  // const [checked, setChecked] = useState([]);
  const [chooseTour, setChooseTour] = useState([]);

  const [chooseMonth, setChooseMonth] = useState([]);
  const [chooseViaDay, setChooseViaDay] = useState([]);
  const [sort, setSort] = useState("");
  const [next, setNext] = useState(0);
  const [dataToShow, setDataToShow] = useState([]);

  const {
    isToursLoading: isLoading,
    tours: firstData,
    errorTours: error,
  } = useTours(`${baseUrl}/tour`);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tourType = useSelector((store) => store.tour.type);
  const timeRange = useSelector((store) => store.tour.timeRange);

  const [searchParams, setSearchParams] = useSearchParams();
  const { tours: queryTours, isToursLoading: isFirstLoading } = useTours(
    `${baseUrl}/tour` + location.search
  );

  useEffect(() => {
    const minPrice = queryTours
      ?.map((tour) => {
        return tour.price;
      })
      .sort((a, b) => a - b);

    // const minPrice = Math.min(5, 7);

    if (minPrice) {
      setPriceValue([minPrice[0], minPrice[minPrice.length - 1]]);
    }
  }, [queryTours]);

  useEffect(() => {
    if (queryTours) {
      setDataToShow(queryTours);
    }
  }, [queryTours]);

  useEffect(() => {
    fetchTourFilter(location.search).then((res) => {
      setDataToShow(res);
    });
  }, [location]);

  console.log("isToursLoading", isLoading);

  if (isLoading || isFirstLoading) return <Loader />;

  const tourViaDays = [...new Set(queryTours.map((tour) => tour.tour_day))];

  const searchObj = {};

  if (chooseTour) {
    searchObj.name = chooseTour;
  }
  if (chooseViaDay) {
    searchObj.tour_day = chooseViaDay;
  }
  if (tourType) {
    searchObj.category = tourType;
  }

  if (timeRange[0]) {
    const startDate = format(timeRange?.[0].startDate, "yyyy-MM-dd", {
      locale: az,
    });
    const endDate = format(timeRange?.[0].endDate, "yyyy-MM-dd", {
      locale: az,
    });

    searchObj.start_date = startDate;
    if (startDate !== endDate) {
      searchObj.end_date = endDate;
    }
  }

  searchObj.minPrice = newPrice[0] && newPrice[0];
  searchObj.maxPrice = newPrice[1] && newPrice[1];
  // searchObj.price_lte = priceValue[1] && priceValue[1];

  function handleSearchList() {
    setSearchParams(searchObj);
    // eger yuxarda yazdigimiz month undefined dirse onu urldden silirem

    // setLocationChanged(true);
  }

  const handleClearFilter = () => {
    setSearchParams({});
    setSort("");
    setChooseTour([]);
    setChooseMonth([]);
    setChooseViaDay([]);
    setNext(0);
    dispatch(setType(""));
    setNewPrice(priceValue);
    setDataToShow([]);

    toast.success("Filter təmizləndi");
    navigate(0);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  let sortedData = dataToShow;
  sortedData = sortedData.sort((a, b) => {
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
              sm: "row",
            },
          }}
        >
          <FormSelections
            months={months}
            forType="tour"
            typeOfTours={typeOfTours}
          />
          <ReusableButton
            height={53}
            onClick={handleSearchList}
            bgColor={theme.palette.primary.main}
          >
            <SearchIcon />
          </ReusableButton>
        </Box>
      </Box>
      <TourListing
        chooseViaDay={chooseViaDay}
        setChooseViaDay={setChooseViaDay}
        tourViaDays={tourViaDays}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
        months={months}
        priceValue={priceValue}
        setPriceValue={setPriceValue}
        chooseTour={chooseTour}
        setChooseTour={setChooseTour}
        data={queryTours}
        dataToShow={dataToShow}
        setChooseMonth={setChooseMonth}
        chooseMonth={chooseMonth}
        isLoading={isLoading}
        error={error}
        handleClearFilter={handleClearFilter}
        handleSortChange={handleSortChange}
        sort={sort}
        next={next}
        setNext={setNext}
      />
    </Box>
  );
};

export default Tours;
