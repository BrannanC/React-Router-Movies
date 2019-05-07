import React from 'react';
import { Link } from 'react-router-dom';
import SavedMovie from './SavedMovie';


const SavedList = props => {
  return (
    <div className="saved-list">
    <Link to="/"><div className="home-button">Home</div></Link> 
      <h3>Saved Movies:</h3>
      <div className="saved-movies">
        {props.list.map(movie => (
          <SavedMovie movie={movie} key={movie.imdbID} />
        ))}
      </div>

      
    </div>
  );  
}

export default SavedList;
