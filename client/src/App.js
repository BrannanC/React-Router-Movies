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
    && this.state.savedList.some(x => x.id === movie.id ) ? 
    this.state.savedList.filter(x => x.id !== movie.id ) : [...this.state.savedList, movie]
    
    this.setState({ savedList });
  };

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList}  />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" render={props => <Movie {...props} addToSavedList={this.addToSavedList} />} />
      </div>
    );
  }
}

export default App;
