import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
      {/* Loading..... */}
    </Box>
  );
};

export default Loader;
