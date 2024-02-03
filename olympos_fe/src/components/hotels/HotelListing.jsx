import {
  Grid,
  Typography,
  Stack,
  Divider,
  Box,
  useMediaQuery,
} from "@mui/material";
import Filters from "../reusable/Filters";
import CheckListHotel from "../CheckListHotel";
import { CustomContainer, FlexBetween } from "../../theme";
import { KeyboardArrowDown } from "@mui/icons-material";
import TourList from "../reusable/TourList";
import { useTheme } from "@mui/material/styles";
import ReusableButton from "../reusable/ReusableButton";
import { useEffect, useState } from "react";
import CheckListHotelTest from "../CheckListHotelTest";
import { usePrevNextButtons } from "../../hooks/usePrevNextButtons";
import {
  fetchHotelIncludings,
  fetchHotelIncludingsClient,
} from "../../services/apiHotels";

const freebies = ["Breakfast", "Pool", "Wifi", "SAEAE"];

const amenities = ["24hr front desk", "Air condition", "fitness", "pool"];

const postsPerPage = 3;
let arrayForHoldingPosts = [];

const HotelListing = ({
  searchedList,
  setSearchedList,
  priceValue,
  setPriceValue,
  setChecked,
  checked,
  data,
  isLoading,
  error,
  handleClearFilter,
  handleSortChange,
  sort,
  next,
  setNext,
  newPrice,
  setNewPrice,
}) => {
  const [hotelIncludings, setHotelIncludings] = useState([]);
  const { PrevNextButtons, postsToShow } = usePrevNextButtons(
    next,
    setNext,
    postsPerPage,
    data
  );

  const theme = useTheme();
  const isDesktop = useMediaQuery("(max-width: 1350px");

  // get hotel specifics

  useEffect(() => {
    fetchHotelIncludingsClient().then((res) => {
      setHotelIncludings(res.map((r) => r.name));
    });
  }, []);

  if (!hotelIncludings?.length) {
    return;
  }

  return (
    <CustomContainer>
      <Grid
        direction={isDesktop ? "column" : "row"}
        sx={{
          margin: "0 auto",
        }}
        container
        columns={12}
        spacing={2}
      >
        <Grid item width="100%" xs={12} sm={6} md={3}>
          <Filters
            sx={{
              width: {
                xs: "50%",
              },
            }}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
            setNewPrice={setNewPrice}
            newPrice={newPrice}
          />
          <Stack sx={{ pt: "0.5rem " }}>
            <FlexBetween sx={{ pb: "0.5rem" }}>
              <Typography variant="subtitle1">Daxil et</Typography>
              <KeyboardArrowDown />
            </FlexBetween>
            <CheckListHotelTest
              checked={checked}
              setChecked={setChecked}
              // data={freebies}
              data={hotelIncludings}
            />
          </Stack>
          <Divider />
        </Grid>

        <Grid
          width="100%"
          item
          xs={12}
          sm={6}
          md={9}
          sx={{
            display: "flex",
            justifyContent: !isDesktop ? "flex-end" : "center",
            flexDirection: !isDesktop ? "row" : "row-reverse",
          }}
        >
          <Divider
            sx={{
              backgroundColor: theme.palette.divider,
              borderBottomWidth: "0.5px",
              marginRight: "1.5rem  ",
            }}
            orientation="vertical" // flexItem
            variant="middle"
          />
          <Box sx={{ width: "100%" }}>
            <TourList
              type="hotel"
              length={data.length}
              // data={postsToShow.length > 0 ? postsToShow : data.slice(0, 3)}
              data={postsToShow.length > 0 ? postsToShow : data.slice(0, 3)}
              isLoading={isLoading}
              error={error}
              handleClearFilter={handleClearFilter}
              handleSortChange={handleSortChange}
              sort={sort}
            />

            <PrevNextButtons />
          </Box>
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default HotelListing;
