import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Pace from 'react-pace-progress';
import Header from './components/Header';
import Home from './components/Home';
import List from './components/List';
import New from './components/New';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Pace color="#84b2da" height={2}/>
     <Header/>
     <div className="containerFluid">
     <Route exact path="/" component={Home} />
            <Route path="/List" component={List} />
            <Route path="/New" component={New} />
      </div>
      </div>
      </Router>
    );
  }
}

export default App;
