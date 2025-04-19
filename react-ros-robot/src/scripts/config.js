const Config = {
  ROSBRIDGE_SERVER_IP: "127.0.0.1", // network IP
  ROSBRIDGE_SERVER_PORT: "9090", // websoket Port
  RECONNECTION_TIMER: 3000, // time for reconnect

  CMD_VEL_TOPIC: "/cmd_vel", // topic that move the robot
  POSE_TOPIC: "/amcl_pose", // topic that tell u the position of the robot
  ODOM_TOPIC: "/odom", // topic that tell u the velocity of the robot
};
// if i didn't the below line there will be connection problem because will not be able to see the values
export default Config;
// Note: In react, you must export every variable in js file to be able to use it in other files when imported
