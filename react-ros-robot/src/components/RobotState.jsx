import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Config from "../scripts/config.js";     // to get Constant Values [ip address, port number , reconnect_timer]
import * as Three from "three";             // to describe the quaternian

class RobotState extends Component {
  state = {
    ros: null,
    x: 0,
    y: 0,
    orientation: 0,
    linear_velocity: 0,
    angular_velocity: 0,
  };
  /* 
    since we need to call this method => proper way (constructor) [every component can have constructor]
    super() => call the super class constructor [default]
    this.init_connection() => call the method
  */
  constructor() {
    super();
    this.init_connection();
  }

  /*
    - init_connection = > this function should tell me whether the robot is connected or not

    - var ros = new ROSLIB.Ros();  will give u error cause it doesn't know ROSLIB 
      so the solution below 
         =>Used window to tell him that include in index.html

    - object [ROS handler] :
        1. allow us to connect to ROS
        2. publish and subscribe to different topics
  */

  init_connection() {
    this.state.ros = new window.ROSLIB.Ros();
    console.log(this.state.ros);      // return as Object


    /*
        - create event when the connection is opened
        - this will be triggered when there is event [publish, subscribe] 

        -  "connection" this means the connection is opened
        -               print the state of the connection
        -               update the state of the connection after being connected 
                        [use setState to update to DOM not only on console]
    */
    this.state.ros.on("connection", () => {
      console.log("connection established in Teleoperation Component!");
      console.log(this.state.ros);    
      this.setState({ connected: true });
    });


    /*
        - create event when the connection is closed
        - this will be triggered when there is event [publish, subscribe] 

        -  "close" this means the connection is closed
        -               print the state of the connection
        -               update the state of the connection after being closed 
                        [use setState to update to DOM not only on console]
    */

    this.state.ros.on("close", () => {
      console.log("connection is closed!");
      this.setState({ connected: false });


    /*
        - try to reconnect every RECONNECTION_TIMER seconds
      
        - This is good but there an issue when i turn the websocket off , then turn on i need to run this again
              solution => we need function that if the connection is closed try to connect after specific time

        - When the connection is lost, the web app automatically reconnect after 3 seconds, also reflect the state at web app
          Function use to try to reconnect every RECONNECTION_TIMER seconds
          Inputs: function , time u want


        - try catch: used to help me to find the where the error and fix it
          this means if there an connection error will be shown at the console [connection problem]
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


    // Connection method used to connect the robot
    /*
      - protocol type: ws because runs on websocket
      - Input fucntion: connection configuration
                  "IP address"[string] , "Port number" [string]
      - You get the IP address from: 
              1. open the terminal and write "ifconfig"
              2. read the ip address [second line]
      - You get the Port number from:
              1. open the terminal and write "roslaunch rosbridge_server rosbridge_websocket.launch"
              2. search for WebSockeyServerFactory Starting on [this is port number (default 9090)]

      - try catch: used to help me to find the where the error and fix it
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


  /*
      - Should put the function after the component has been loaded so use special method
      - the getRobotState function Will be executed when be fully mounted
  */
  componentDidMount() {
    this.getRobotState();
  }

  // Function use to get the data from the topic named '/amcel_pose' and displayed on the Web app
  getRobotState() {
    // Create a pose subscriber for the position in the amcl_pose topic
    var pose_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: Config.POSE_TOPIC,
      messageType: "geometry_msgs/PoseWithCovarianceStamped",
    });

    // Create a pose Callback => responsible for changing the value of the state variable[x ,y]
    pose_subscriber.subscribe((message) => {
      // display the number with only 2 floating point 
      this.setState({ x: message.pose.pose.position.x.toFixed(2) });
      // display the number with only 2 floating point 
      this.setState({ y: message.pose.pose.position.y.toFixed(2) });
      this.setState({
        orientation: this.getOrientationFromQuaternion(
          message.pose.pose.orientation
        ).toFixed(2),
      });
    });

    //create a subscriber for the velocities in the odom topic
    var velocity_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: Config.ODOM_TOPIC,
      messageType: "nav_msgs/Odometry",
    });

    /*
        - callback function for the odom responsible for 
              => changing the value of the state variable[linear ,angular velocity]
        - we got only x, z because we are in 2D Map Navigation
        - if i move forward linear velocity + , move Backward linear velocity -
        - if i move Right angular velocity + , move Left angular velocity -
    */
    velocity_subscriber.subscribe((message) => {
      this.setState({
        // display the number with only 2 floating point 
        linear_velocity: message.twist.twist.linear.x.toFixed(2),
      });
      // There a problem that the orientWation is displayed as Quaternian (x y z w) so the we need function to convert [line 151]
      this.setState({
        // display the number with only 2 floating point 
        angular_velocity: message.twist.twist.angular.z.toFixed(2),
      });
    });
  }



    /* 
        - Function: Convert Quaternian into degree
        - Inputs: x y z w
        - Output: quaternian in radian

        - We use package called three to describe the quaternian   : [npm install three]
    */
  getOrientationFromQuaternion(ros_orientation_quaternion) {
    var q = new Three.Quaternion(
      ros_orientation_quaternion.x,
      ros_orientation_quaternion.y,
      ros_orientation_quaternion.z,
      ros_orientation_quaternion.w
    );

    //convert this quaternion into Roll, Pitch and Yaw  [rpy]  using euler function
    var RPY = new Three.Euler().setFromQuaternion(q);


    // Convert Radian to Degree 
    return RPY["_z"] * (180 / Math.PI);   // In Degree
  }
  render() {
    return (
      <div>
        <Row>
              {/* Display the Position of the robot */}
          <Col>
            <h4 className="mt-4">Position</h4>
            <p className="mt-0">x: {this.state.x}</p>
            <p className="mt-0">y: {this.state.y}</p>
            <p className="mt-0">Orientation: {this.state.orientation}</p>
          </Col>
        </Row>
        <Row>
              {/* Display the Velocity of the robot */}
          <Col>
            <h4 className="mt-4">Velocities</h4>
            <p className="mt-0">
              Linear Velocity: {this.state.linear_velocity}
            </p>
            <p className="mt-0">
              Angular Velocity: {this.state.angular_velocity}
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RobotState;
