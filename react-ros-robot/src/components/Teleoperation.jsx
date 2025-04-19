import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
 // to get Constant Values [ip address, port number , reconnect_timer]
import Config from "../scripts/config";



/*
  - Component allow u to  
      1. send twist messages, 
      2. velocity commands to rosbridge , then rosbridge resend to ROS to move
*/
class Teleoperation extends Component {
  /* 
    - ros: 
          used to handle the object of ros connection
          this will refer to the state ros in init_connection , updated in the function
  */
  state = { ros: null };

  /* 
    - since we need to call this method => proper way (constructor) [every component can have constructor]
    - super() => call the super class constructor [default]
    - this.init_connection() => call the method
    - solution of the problem in handleMove which is [We call method this in the handleMove]
    - solution of the problem in handleStop which is [We call method this in the handleStop]
  */
  constructor() {
    super();
    this.init_connection();

    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
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
    console.log(this.state.ros);     // return as Object


    /*
          - create event when the connection is opened
          - this will be triggered when there is event [publish, subscribe] 

          -  "connection" # this means the connection is opened
                          # print the state of the connection
                          # update the state of the connection after being connected 
                          # [use setState to update to DOM not only on console]
    */
    this.state.ros.on("connection", () => {
      console.log("connection established in Teleoperation Component!");
      console.log(this.state.ros);
      this.setState({ connected: true });
    });



    /*
        - create event when the connection is closed
        - this will be triggered when there is event [publish, subscribe] 

        -  "close"  # this means the connection is closed
                    # print the state of the connection
                    # update the state of the connection after being closed 
                    # [use setState to update to DOM not only on console]
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


    /*
      - Connection method used to connect the robot

      - protocol type: ws because runs on websocket
      - Input fucntion: connection configuration
                  "IP address"[string] , "Port number" [string]

      - You get the IP address from: 
              1. open the terminal and write "ifconfig"
              2. read the ip address [second line]

      - You get the Port number from:
              1. open the terminal and write "roslaunch rosbridge_server rosbridge_websocket.launch"
              2. search for WebSockeyServerFactory Starting on [this is port number (default 9090)]

      - try catch: # used to help me to find the where the error and fix it
                   # this means if there an connection error will be shown at the console [connection problem]
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

      // JoyStick Component 
  /*    
    - Notice: We need to installed  =>   [npm install react-joystick-component]
    - Joy Stick Component:   
        # Use to send velocity commands 
        
        # When We stop => Joystick will be [handleStop] method will be envoked 

        # [handleStop] =>   Method reponsible for sending all values of velocities = Zero to RosBridge &
                            RosBridge will execute them on ROS echo system

    - These methods [handleStop & handleMove] have to subscribe & publish through RosBridge

  */

        //  1. handleMove 
    /* 

        - When We move => Joystick will be [handleMove] method will be envoked 

        - Method  reponsible for 
                1. sending commands to RosBridge 
                2. RosBridge will execute them on ROS echo system
        - Stucture of method: handleMove():
            1. We need to create a ROS publisher on the topic cmd_vel
            2. We need to create a twist message to be published to RosBridge
            3. We need to publish the message on the cmd_vel topic
        - function takes [event]: how much u moved the horizontal direction & vertical direction

        - move forward and backward => linear velocity 
        - move right and left => angular velocity
    */
  handleMove(event) {
    console.log("handle move");     // print handle move when the joystick move

    /*
      #1. We need to create a ROS publisher on the topic cmd_vel  
        
        - cmd_vel: variable to handle the publisher [represent cmd_vel topic]

        - We can call the variable that implemented in different component 
          but it is Advanced Way so we won't do it [we will use simple way that create again]

        - Problem: We call method this in the handleMove
          Solution: We need to bind the keywork "this" in the method handleMove
                    Solution is in the constructor in line 18

        - ros:         ros handler
          name:        Topic Name
          messageType: Type of the message
    */
    var cmd_vel = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: Config.CMD_VEL_TOPIC,
      messageType: "geometry_msgs/Twist",
    });


    /*
      #2. We need to create a twist message to be published to RosBridge
         
        - twist: variable

        - handle the value that comes from joystick [event] to not make the robot move very fast [make it move smoothly ]
        - [linear]
                y = 0 because non honolmic robot [differential]
                z = 0 becaues the robot don't fly
        - [angular]
                z => if we moved up this means the robot have to move forward thats why we choose x 
                    because the joystick moving in [horizontal direction]
    */
    var twist = new window.ROSLIB.Message({
      linear: {
        x: event.y / 10,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -event.x / 10,
      },
    });
    /* #3. We need to publish the message on the cmd_vel topic */
    cmd_vel.publish(twist);
  }


      //    2. handleStop
    /* 
        - We need to publish messages with all velocities = Zero

        - print handle stop when the joystick move
    */
  handleStop(event) {
    console.log("handle stop");

    /*
      #1. We need to create a ROS publisher on the topic cmd_vel 
        
        - cmd_vel: variable to handle the publisher [represent cmd_vel topic]

        -  We can call the variable that implemented in different component 
          but it is Advanced Way so we won't do it [we will use simple way that create again]

        - Problem: We call meork "this" in the method handleMove
          Solution: in the conthod this in the handleMove
                    Solution: We need to bind the keywstructor in line 18

        - ros:         ros handler
          name:        Topic Name
          messageType: Type of the message
    */  
    var cmd_vel = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: Config.CMD_VEL_TOPIC,
      messageType: "geometry_msgs/Twist",
    });

    /*
      #2. We need to create a twist message to be published to RosBridge
        - twist: variable 
        - All the values set to Zero to force stop the robot when leave the joystick
    */
    var twist = new window.ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });
    // 3. We need to publish the message on the cmd_vel topic
    cmd_vel.publish(twist);
  }

  render() {
    return (
      <div>
   {/* Notice: there parameter[throttle] => raise an event will tell u how much u moved in every direction [horizontal , vertical */}
        <Joystick
          size={100}
          baseColor="#EEEEEE"
          stickColor="#BBBBBB"
          move={this.handleMove}
          stop={this.handleStop}
        ></Joystick>
      </div>
    );
  }
}

export default Teleoperation;
