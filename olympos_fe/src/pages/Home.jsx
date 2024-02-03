import { Box } from "@mui/material";
import { Suspense } from "react";
import Header from "../components/home/Header";

// import ShowCard from "../components/home/ShowCard";
// import Reviews from "../components/home/Reviews";
import { lazy } from "react";
import Loader from "../components/reusable/Loader";
import SelectFromHome from "../components/home/SelectFromHome";
import useTours from "../features/tours/useTours";
import useHotels from "../features/hotels/useHotels";
const ShowCard = lazy(() => import("../components/home/ShowCard"));
const Reviews = lazy(() => import("../components/home/Reviews"));

const Home = ({ months, typeOfTours }) => {
  const { tours, isToursLoading } = useTours();
  const { hotels, isHotelsLoading } = useHotels("user");

  if (isToursLoading || isHotelsLoading) {
    return <Loader />;
  }

  const hotelData = hotels?.slice(0, 12);
  const tourData = tours?.slice(0, 12);

  return (
    <Box>
      <Header months={months} typeOfTours={typeOfTours} />
      <SelectFromHome title="Turlar" link={"/turlar"} data={tourData} />
      <SelectFromHome title="Otellər" link={"/otellər"} data={hotelData} />
      <Suspense fallback={<Loader />}>
        <ShowCard />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Reviews />
      </Suspense>
      {/* <ShowCard /> */}
      {/* <Reviews /> */}
    </Box>
  );
};

export default Home;
