import { useLoaderData, Link } from "react-router-dom";
export default function YourRatingsPage() {
  const { ratings } = useLoaderData();
  console.log(ratings);
  const ratingsList = ratings.map((rating) => (
    <li key={rating.ratingId}>
      <Link to={`/movies/${rating.movie.movieId}`}>{rating.movie.title}</Link>{" "}
      {rating.score}
    </li>
  ));
  return (
    <>
      <h1>Your Ratings</h1>
      <p>{ratingsList}</p>
    </>
  );
}
