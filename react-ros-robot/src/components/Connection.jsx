import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
// to get Constant Values [ip address, port number , reconnect_timer]
import Config from "../scripts/config.js";

class Connection extends Component {
  /*
    - connected: variable to check whether the robot is connected or not
                default value => false , this means the robot is disconnected

    - ros: used to handle the object of ros connection
 */
  state = { connected: false, ros: null };

  // since we need to call this method => proper way (constructor) [every component can have constructor]
  constructor() {
    // call the super class constructor [default]
    super();
    // call the method
    this.init_connection();
  }

  // this function should tell me whether the robot is connected or not
  init_connection() {
    /*
        var ros = new ROSLIB.Ros();  will give u error cause it doesn't know ROSLIB 
        so the solution below 
        // Used window to tell him that include in index.html
    */
    /* 
    object [ROS handler] :
        1. allow us to connect to ROS
        2. publish and subscribe to different topics
    */
    this.state.ros = new window.ROSLIB.Ros();
    // return as Object
    console.log(this.state.ros);

    // create event when the connection is opened
    // this will be triggered when there is event [publish, subscribe]
    // "connection" this means the connection is opened
    this.state.ros.on("connection", () => {
      console.log("connection established!"); // print the state of the connection
      // update the state of the connection after being connected [use setState to update to DOM not only on console]
      this.setState({ connected: true });
    });

    // create event when the connection is closed
    this.state.ros.on("close", () => {
      // "close" this means the connection is closed
      console.log("connection is closed!"); // print the state of the connection
      // update the state of the connection after being closed [use setState to update to DOM not only on console]
      this.setState({ connected: false });

      /*
      -   -- This is good but there an issue when i turn the websocket off , then turn on i need to run this again
            -- solution: we need function that if the connection is closed try to connect after specific time 
  
      -   -- When the connection is lost, the web app automatically reconnect after 3 seconds, also reflect the state at web app
          -- Function use to try to reconnect every RECONNECTION_TIMER seconds
          -- Inputs: function , time u want
      
      -   -- try catch: used to help me to find the where the error and fix it
          --  console.log(connection problem) this means if there an connection error will be shown at the console [connection problem]  
      
      -   -- try to reconnect every RECONNECTION_TIMER seconds
      */
      setTimeout(() => {
        try {
          this.state.ros.connect(
            "ws://" +
              Config.ROSBRIDGE_SERVER_IP +
              ":" +
              Config.ROSBRIDGE_SERVER_PORT +
              ""
          );
        } catch (error) {
          console.log("connection problem ");
        }
      }, Config.RECONNECTION_TIMER);
    });

    /*
      - Connection method used to connect the robot
      - protocol type: ws because runs on websocket
      - Input fucntion: connection configuration
                      "IP address"[string] , "Port number" [string]
            You get the IP address from: 
                  1. open the terminal and write "ifconfig"
                  2. read the ip address [second line]
            You get the Port number from:
                  1. open the terminal and write "roslaunch rosbridge_server rosbridge_websocket.launch"
                  2. search for WebSockeyServerFactory Starting on [this is port number (default 9090)]
      
      - used to help me to find the where the error and fix it
      - this means if there an connection error will be shown at the console [connection problem]
    */

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
      console.log("connection problem ");
    }
  }

  render() {
    return (
      /* 
          this means if [ connected] make green box "Robot Connected" 
                        [disconnected] make red box "Robot Disconnected"
      */
      <div>
        <Alert
          className="text-center m-3"
          variant={this?.state?.connected ? "success" : "danger"}
        >
          {this?.state?.connected ? "Robot Connected" : "Robot Disconnected"}
        </Alert>
      </div>
    );
  }
}

export default Connection;
