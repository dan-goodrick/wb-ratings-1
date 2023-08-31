import { useLoaderData } from 'react-router-dom';

export default function MovieDetailPage() {
  const {movies: {title, posterPath, overview}} = useLoaderData();
  

  return (
    <>
      <h1>{title}</h1>
      <p>{overview}</p>
      <img src={posterPath} alt={title} style={{width: '200px'}}/>
    </>
  );
}
