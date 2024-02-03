import {
  Grid,
  Typography,
  Stack,
  Divider,
  Box,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItem,
  List,
  useMediaQuery,
} from "@mui/material";
import Filters from "../reusable/Filters";
import CheckListHotel from "../CheckListHotel";
import { CustomContainer, FlexBetween } from "../../theme";
import { KeyboardArrowDown } from "@mui/icons-material";
import TourList from "../reusable/TourList";
import { useTheme } from "@mui/material/styles";
import ReusableButton from "../reusable/ReusableButton";
import { useState } from "react";
import { usePrevNextButtons } from "../../hooks/usePrevNextButtons";

const postsPerPage = 3;
let arrayForHoldingPosts = [];

const TourListing = ({
  chooseViaDay,
  setChooseViaDay,
  priceValue,
  setPriceValue,
  tourViaDays,
  chooseTour,
  setChooseTour,
  setChooseMonth,
  chooseMonth,
  months,
  data,
  isLoading,
  error,
  handleClearFilter,
  handleSortChange,
  sort,
  setNext,
  next,
  newPrice,
  setNewPrice,
  dataToShow,
}) => {
  const { PrevNextButtons, postsToShow } = usePrevNextButtons(
    next,
    setNext,
    postsPerPage,
    dataToShow
  );

  const theme = useTheme();
  const isDesktop = useMediaQuery("(max-width: 1350px");

  // const handleMonthToggle = (value) => () => {
  //   if (chooseMonth.includes(value)) {
  //     setChooseMonth([]);
  //   } else {
  //     setChooseMonth(value);
  //   }
  // };

  const handleViaDayToggle = (value) => () => {
    if (chooseViaDay.includes(value)) {
      setChooseViaDay([]);
    } else {
      setChooseViaDay(value.toString());
    }
  };

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
            priceValue={priceValue}
            sx={{
              width: {
                xs: "50%",
              },
            }}
            setPriceValue={setPriceValue}
            setNewPrice={setNewPrice}
            newPrice={newPrice}
          />
          <Stack sx={{ pt: "0.5rem " }}>
            <FlexBetween sx={{ pb: "0.5rem 0", mb: "1rem" }}>
              <Typography variant="subtitle1">Turlar</Typography>
              <KeyboardArrowDown />
            </FlexBetween>
            <CheckListHotel
              months={months}
              chooseTour={chooseTour}
              setChooseTour={setChooseTour}
              data={data.map((d) => d.name)}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            />
          </Stack>
          <Divider />

          <Divider />

          <Stack sx={{ mb: "1rem" }}>
            <FlexBetween sx={{ padding: "0.5rem  0", mb: "1rem" }}>
              <Typography variant="subtitle1">Gün sayına görə</Typography>
              <KeyboardArrowDown />
            </FlexBetween>

            <Grid
              container
              spacing={2}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid
                item
                sx={{
                  "&.MuiGrid-root": {
                    paddingLeft: "0",
                    paddingTop: "0",
                    width: "100%",
                  },
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    // maxWidth: 360,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",

                    maxHeight: "220px",
                    "& ul": { padding: 0 },
                  }}
                  dense
                  component="div"
                  role="list"
                >
                  {tourViaDays.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                      <ListItem
                        key={value}
                        role="listitem"
                        button
                        onClick={handleViaDayToggle(value)}
                        sx={{
                          "&.MuiListItem-root": {
                            padding: "0",
                            width: "100%",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            "&.MuiListItemIcon-root": {
                              minWidth: "42px",
                            },
                          }}
                        >
                          <Checkbox
                            // checked={checked.indexOf(value) !== -1}
                            checked={chooseViaDay.includes(value)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${value}`} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Stack>
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
              length={dataToShow?.length}
              // data={postsToShow.length > 0 ? postsToShow : data.slice(0, 3)}
              data={
                postsToShow?.length > 0 ? postsToShow : dataToShow.slice(0, 3)
              }
              compareData={data}
              isLoading={isLoading}
              error={error}
              handleClearFilter={handleClearFilter}
              handleSortChange={handleSortChange}
              sort={sort}
              type="tour"
            />

            {/* {data.length > 3 && next < data.length && (
              <ReusableButton
                onClick={handleShowMorePosts}
                bgColor="black"
                color="white"
                width="100%"
                size=""
              >
                Show more tours
              </ReusableButton>
            )} */}

            <PrevNextButtons />
          </Box>
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default TourListing;
