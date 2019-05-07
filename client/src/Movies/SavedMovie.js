import React from 'react';
import { Link } from 'react-router-dom';

const SavedMovie = (props) => {
    return (
        <Link to={`/movies/${props.movie.id}`} className="saved-movie">
            <span>{props.movie.title}</span>
        </Link>
    );
}

export default SavedMovie;