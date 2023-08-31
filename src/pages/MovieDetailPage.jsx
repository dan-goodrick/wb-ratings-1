import { useLoaderData, useNavigate } from 'react-router-dom';
import CreateRatingForm from "../components/CreateRatingForm.jsx";
import axios from 'axios'

export default function MovieDetailPage() {
  const navigate = useNavigate()
  const {movies: {title, posterPath, overview, movieId}} = useLoaderData();
  
  const handleCreateRating = (e, {score}) => {
    e.preventDefault()
    axios.post('/api/ratings', {movieId, score}).then((res) => {if (res.data) navigate('/me')})
  }
  return (
    <>
      <h1>{title}</h1>
      <p>{overview}</p>
      <img src={posterPath} alt={title} style={{width: '200px'}}/>
      <h2>Rate this movie</h2>
      <CreateRatingForm onCreateRating={handleCreateRating}/>
    </>
  );
}
