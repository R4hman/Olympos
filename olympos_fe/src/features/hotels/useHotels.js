import { useQuery } from "@tanstack/react-query";
import {
  fetchHotelsApi,
  fetchClientSideHotel,
  fetchClientSideSingleHotel,
  fetchHotelFilter,
} from "../../services/apiHotels";

const useHotels = (role) => {
  const {
    isLoading: isHotelsLoading,
    data: hotels,
    error,
  } = useQuery({
    queryKey: ["hotels"],
    queryFn: role === "user" ? fetchClientSideHotel : fetchHotelsApi,
  });

  return {
    isHotelsLoading,
    hotels,
    error,
  };
};
export const useSingleHotel = (role) => {
  const {
    isLoading: singleHotelLoading,
    data: singleHotel,
    error,
  } = useQuery({
    queryKey: ["hotels", role], // Include role as part of the query key
    queryFn: () => fetchClientSideSingleHotel(role),
  });

  return {
    singleHotelLoading,
    singleHotel,
    error,
  };
};
export const useFilterHotel = (url) => {
  const {
    isLoading: hotelFilterLoading,
    data: hotelFilter,
    error,
  } = useQuery({
    queryKey: ["hotels", url],
    queryFn: () => fetchHotelFilter(url),
  });

  return {
    hotelFilterLoading,
    hotelFilter,
    error,
  };
};

export default useHotels;
