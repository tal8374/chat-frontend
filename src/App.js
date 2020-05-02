import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './containers/Login/Login'
import Messanger from './containers/Messanger/Messanger'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact  path="/messanger">
            <Messanger></Messanger>
          </Route>
          <Route path="/">
            <Login></Login>
          </Route>
          <Redirect to='/'></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
