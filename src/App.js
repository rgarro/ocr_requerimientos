import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
     <Header/>
      </Router>
    );
  }
}

export default App;
