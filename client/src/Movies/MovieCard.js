import React from 'react';
import { Link } from 'react-router-dom';


const MovieCard = ({ movie }) => {
  const { Title, Year, Poster } = movie;
  return (
    <Link to={`/movies/${movie.imdbID}`} className="movie-card" style={{
      background: `url(${Poster}) no-repeat`,
      backgroundSize: 'cover'
    }}>
    <div className="hover-info">
      <h2>{Title}</h2>
      <h3>{Year}</h3>
    </div>
    </Link>
  );
};

export default MovieCard;
