// Import React and Component from the react library
import React, { Component } from "react";

// About component responsible for displaying the about page of the web application
class About extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>
          This react app controls and monitors ROS-enabled robots through a Web
          Interface
        </p>
      </div>
    );
  }
}

// Export the About component as the default export of this module
export default About;
