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
      .get(`http://www.omdbapi.com/?apikey=af86892e&i=${id}`)
      .then(response => {
        console.table(response)
        this._isMounted && this.setState(() => ({ 
          movie: response.data,
          isSaved: this.props.savedList.some(x => x.imdbID === response.data.imdbID)
        }));
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

    const { Title, Year, Metascore, Actors, Poster, Rated } = this.state.movie;
    return (
      <div className="save-wrapper" >
        <div className="movie-card" style={{
        background: `url(${Poster})`,
        backgroundSize: 'cover'         
}}>
          <h2>{Title}</h2>
          <h3>Year: {Year}</h3>
          <h3>Rated: {Rated}</h3>
          <div className="movie-metascore">
            Metascore: <strong>{Metascore}</strong>
          </div>
          <h3>Starring:</h3>
          {Actors}
        </div>
        <div className="save-button" onClick={this.saveMovie}>{this.state.isSaved ? 'Remove' : 'Save'}</div>
      </div>
    );
  }
}
