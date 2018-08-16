import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import logo from './logo.svg';
import './App.css';

import Profile from './Components/Profile';
import Content from './Components/Content';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col profile-col">
              <Profile />
            </div>

            <div className="col content-col">
              <Content />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
