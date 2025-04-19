# 🦽 Self-Driving Wheelchair (Graduation Project)

This project is my **graduation project** as part of a **team of five members**. It focuses on the development of an autonomous self-driving wheelchair, which uses **ROS (Robot Operating System)**, **SLAM (Simultaneous Localization and Mapping)**, and various sensors (Kinect and LIDAR) to achieve autonomous navigation and obstacle avoidance. The project has been tested in both **simulation** (using Gazebo) and **real-world** environments.

The project is proudly sponsored by the **Information Technology Industry Development Agency (ITIDA)**.

Our project was part of **three competitions**:

- **Made In Egypt (MIE)**
- **Egypt Industry 4.0 Challenge**
- **IEEE IC-SIT 2024**

We reached the **finals** in the **IEEE IC-SIT 2024** competition. The project received an **A\* Excellent** evaluation for its outstanding implementation and performance.

---

## Project Structure

The project is divided into the following main components:

### 1. **Robotics (Robot Control & Navigation)**

This section involves the development and deployment of the robot's control system, including the following key components:

- **ROS (Robot Operating System)** for managing communication between various sensors and actuators.
- **SLAM** for localization and mapping, allowing the wheelchair to navigate autonomously.
- **Sensor Integration**: LIDAR and Kinect sensors are used for obstacle detection and mapping.
- **Navigation Algorithms**: The robot uses algorithms like **A\* (global planner)** and **DWA (local planner)** for path planning and obstacle avoidance.
- **Robot State**: The robot continuously updates its position (x, y, orientation) and velocity data for real-time tracking.

### 2. **Web App (User Interface for Control)**

The web app serves as the interface for controlling and monitoring the robot remotely:

- **Connection Component**: Displays if the robot is connected or disconnected using the ROSSerial WebSocket.
- **Teleoperation Component**: Provides joystick controls for moving the robot.
- **RobotState Component**: Displays the real-time status of the robot, including location, velocity, and orientation.
- **Map Component**: Displays the environment map generated from the robot's sensors (Kinect/LIDAR) and allows users to specify navigation goals.
- **Footer**: Contains information like copyright and team details.

### 3. **Simulations (Gazebo)**

The project has been tested in simulation using **Gazebo**. This allows for safe and scalable testing of the robot's navigation and obstacle avoidance capabilities before deployment in the real world.

---

## Setup & Installation

- **ROS** (Robot Operating System) Noetic
- **Gazebo** for simulation
- **Node.js** and **React** for the web application
- **Python** for ROS packages and control logic
- **LIDAR** and **Kinect** sensors (for real-world deployment)

---

## Demo

### **Live Demo**

For a live demo of the **Self-Driving Wheelchair** system:

[Live Demo On Linkedin Post](#https://www.linkedin.com/posts/yousif-adel-a601641b1_apexdriveinnovators-ros-selfdrivingwheelchair-activity-7219724350126514176-LP5P?utm_source=share&utm_medium=member_desktop&rcm=ACoAADFSougBbplLvCFvoq2oVcM3uoEe_eK2zig)

## Contributing

Feel free to contribute by:

- **Reporting bugs**
- **Submitting feature requests**
- **Improving documentation**
- **Creating pull requests for improvements**

---

## Acknowledgements

This project was part of my **graduation project** as a team member. We thank everyone who supported us in completing this project, including faculty members and competition organizers.

## I would like to thank The engineer **Eng. Hesham Gamal** for his constant support for us throughout the year

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.txt) file for details.
