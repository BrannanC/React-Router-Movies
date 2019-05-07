import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: []
    };
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList.length > 0
    && this.state.savedList.some(x => x.imdbID === movie.imdbID) ? 
    this.state.savedList.filter(x => x.imdbID!== movie.imdbID) : [...this.state.savedList, movie]
    
    this.setState({ savedList });
  };

  render() {
    return (
      <div className="App">
        <SavedList list={this.state.savedList}  />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" render={props => <Movie {...props} 
          addToSavedList={this.addToSavedList} savedList={this.state.savedList} />} />
      </div>
    );
  }
}

export default App;
