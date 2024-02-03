import StarRateIcon from "@mui/icons-material/StarRate";

// Assuming review.rating is the number of stars (e.g., 1, 2, 3, 4, 5)
export const renderStars = (rating) => {
  const maxStars = 5; // Maximum number of stars
  const filledStars = Math.min(Math.max(0, rating), maxStars); // Make sure rating is between 0 and maxStars

  return Array.from({ length: maxStars }, (_, index) => (
    <StarRateIcon
      key={index}
      sx={{ color: index < filledStars ? "#FAAF00" : "grey" }} // Set color based on whether the star should be filled or empty
    />
  ));
};
