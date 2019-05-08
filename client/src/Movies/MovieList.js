import React, { Component, Fragment } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: ''
    };
  }

  componentDidMount() {
    this.fetchMovies('all');
  }

  handleChange = e => {
    this.setState({
      search: e.target.value
    }, () => !this.state.search && this.fetchMovies('all'))
  }

  handleSubmit = e => {
    e.preventDefault();
    this.fetchMovies(this.state.search);
  }

  fetchMovies = (search) => {
    axios
    .get(`http://www.omdbapi.com/?apikey=af86892e&s=${search}`)
    .then(response => {
      console.table(response.data.Search);
      this.setState(() => ({ movies: response.data.Search}));
    })
    .catch(error => {
      console.error('Server Error', error);
    });
  }

  render() {
    return (
      <Fragment>
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      <form onSubmit={this.handleSubmit}>
        <input required
          type="text" 
          placeholder="Search..." 
          onChange={this.handleChange}
          value={this.state.search} 
          />      
      </form>
      </Fragment>
    );
  }
}


