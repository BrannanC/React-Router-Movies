import React, { Component } from 'react';
import axios from 'axios';

export default class Movie extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      isSaved: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    // change this line to grab the id passed on the URL
    const id = this.props.match.params.id;
    this.fetchMovie(id);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this._isMounted && this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  componentDidUpdate(prop, prev){
    if(prev.movie && prop.match.params.id && prop.match.params.id !== prev.movie.id){
      this.fetchMovie(this.props.match.params.id);
    }
  }

  saveMovie = () => {
    this.setState(prev => ({
      isSaved: !prev.isSaved
    }))
    this.props.addToSavedList(this.state.movie);
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    const { title, director, metascore, stars } = this.state.movie;
    return (
      <div className="save-wrapper">
        <div className="movie-card">
          <h2>{title}</h2>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>

          {stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
        </div>
        <div className="save-button" onClick={this.saveMovie}>{this.state.isSaved ? 'Remove' : 'Save'}</div>
      </div>
    );
  }
}
