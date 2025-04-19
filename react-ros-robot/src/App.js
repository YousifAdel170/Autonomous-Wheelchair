

import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

import Website from "./components/Website.jsx"
import Webapp from "./components/Webapp.jsx"
import Home from "./components/About.jsx"
import About from "./components/Home.jsx"
function App() {
  return (
           /* collapseOnSelect means that at mobile it will be shown as icon that contains the links */
    <div className="App">
    <Router>
    <Switch>
      <Route path="/" exact component={Website}></Route>
      <Route path="/webapp" exact component={Webapp}></Route>
    </Switch>
    </Router>

    </div>
  );
}

export default App;



