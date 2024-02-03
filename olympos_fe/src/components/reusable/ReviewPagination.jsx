import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { memo, useState } from "react";

const ReviewPagination = memo(({ page, setPage, btnCount }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} sx={{ alignItems: "center", margin: "1rem 0" }}>
      <Typography>Səhifə: {page}</Typography>
      <Pagination count={btnCount} page={page} onChange={handleChange} />
    </Stack>
  );
});

ReviewPagination.displayName = "ReviewPagination";

export default ReviewPagination;
