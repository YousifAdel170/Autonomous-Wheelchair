import React, { Component } from "react";
    // to get Constant Values [ip address, port number , reconnect_timer]
import Config from "../scripts/config.js";

class Map extends Component {
  // ros: used to handle the object of ros connection
  state = {
    ros: null,
  };

  constructor() {
    super();
    //this.init_connection = this.view_map.bind(this);
    this.view_map = this.view_map.bind(this);
  }

  init_connection() {
    //this.setState({ ros: new ROSLIB.Ros() });
    this.state.ros = new window.ROSLIB.Ros();
    console.log("Map:" + this.state.ros);
    try {
      this.state.ros.connect(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
    } catch (error) {
      console.log(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
      console.log("cannot connect to the WS robot. Try again after 1 second");
    }
  }
  /*
    Should put the function after the component has been loaded so use special method
    the view_map function Will be executed when be fully mounted
  */ 
  componentDidMount() {
    this.init_connection();
    console.log("Map: componentDidMount" + this.state.ros);
    this.view_map();
  }

  /*
    - Function use to get the map from the topic named '/move_base' and displayed on the Web app
    - viewer: Create a subscriber for the map in the move_base topic
    - Inputs:
              divID: id of the dive that the map will displayed on it
              width: width of the displayed map
              height: height of the displayed map


    - navClient: Create a subscriber for the navigation in the map in the move_base topic

  */

  view_map() {
    var viewer = new window.ROS2D.Viewer({
      divID: "nav_div",
      width: 640,
      height: 480,
    });
    var navClient = new window.NAV2D.OccupancyGridClientNav({
      ros: this.state.ros,
      rootObject: viewer.scene,
      viewer: viewer,
      serverName: "/move_base",
      withOrientation: true,
    });
  }

  render() {
    return (
      <div>
        <div id="nav_div">Viewer</div>
      </div>
    );
  }
}

export default Map;
