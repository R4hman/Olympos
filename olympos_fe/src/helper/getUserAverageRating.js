export default function getUserAverageRating(reviews) {
  const averageRating = reviews?.reduce(
    (acc, review, i, arr) => acc + review?.rating / arr.length,
    0
  );
  return averageRating;
}
