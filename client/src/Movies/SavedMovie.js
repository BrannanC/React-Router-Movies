import React from 'react';
import { Link } from 'react-router-dom';

const SavedMovie = (props) => {
    return (
        <Link to={`/movies/${props.movie.imdbID}`} className="saved-movie">
            <span>{props.movie.Title}</span>
        </Link>
    );
}

export default SavedMovie;