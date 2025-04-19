// Import React and Components from the react library and Bootstrap for styling
import React, { Component } from "react";
import { Container } from "react-bootstrap";

// Import the Router, Route, and Switch components from react-router-dom for routing
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// Import Custom components
import Home from "./Home";

// Body component responsible for displaying the main content of the web application
class Body extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            {/* here means go the  */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
        <div>
          <h1 className="mt-3">About</h1>
          <p>
            This react app controls and monitors ROS-enabled robots through a
            Web Interface
          </p>
        </div>
      </Container>
    );
  }
}

// Export the Body component as the default export of this module
export default Body;
