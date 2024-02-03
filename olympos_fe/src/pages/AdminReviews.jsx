import { Box, Button } from "@mui/material";

import Loader from "../components/reusable/Loader";
import DataTable from "../components/adminPanel/DataTable";
import useReviews from "../features/reviews/useReviews";
import useDeleteReview from "../features/reviews/useDeleteReview";

const AdminReviews = () => {
  const columns = [
    { field: "name", headerName: "Username", width: 180 },
    {
      field: "hotelId",
      headerName: "Tour or Hotel",
      width: 180,
      renderCell: ({ row }) => {
        return <span>{row?.tourOrHotelName}</span>;
      },
    },

    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "rating", headerName: "Rating", width: 100 },

    {
      field: "DeleteButton",
      sortable: false,
      align: "center",
      width: 100,
      renderCell: ({ row: { id } }) => {
        return <Button onClick={() => deleteReview(id)}>Sil</Button>;
      },
    },
  ];

  const { isReviewsLoading, reviews } = useReviews();
  const { deleteReview } = useDeleteReview();

  if (isReviewsLoading) return <Loader />;
  if (!reviews.length) {
    return <Box>No reviews yet</Box>;
  }

  return (
    <Box>
      <DataTable rows={reviews} columns={columns} />
    </Box>
  );
};

export default AdminReviews;
