import React, { Component } from 'react';
import './App.css';

import {Router,Route,browserHistory} from 'react-router';

import HomePage from './pages/homepage.component';
import AddBook from './pages/addbook.component';

class App extends Component{
  render() {
    return (
      <Router history={browserHistory}>
          <Route path="/" component={HomePage}></Route>
          <Route path="/addbook" component={AddBook}></Route>
      </Router>
    );
  }
}

export default App;
