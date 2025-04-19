# Self-Driving Wheelchair Web Development

This repository contains the web development for the **Self-Driving Wheelchair** project, which involves creating a **web app** to interact with and control the **self-driving wheelchair** robot. The web app is built using **React.js** and integrates with **ROS (Robot Operating System)** for robot communication and control. The accompanying **website** showcases the project, providing a user-friendly interface to interact with the autonomous robot.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Install dependencies](#install-dependencies)
- [Website Structure](#website-structure)
- [Web App Features](#web-app-features)
- [Libraries Used](#libraries-used)
- [App Structure](#app-structure)
- [License](#license)

## Project Overview

The **Self-Driving Wheelchair** web development project consists of two main components:

1. **Website**: A professional landing page showcasing the project, including information about the self-driving wheelchair, its features, and the technology behind it.
2. **Web App**: A React-based application that allows users to interact with the robot, control its movements, view its state, and specify goals for navigation. The web app communicates with the robot using ROS and visualizes the robot's status and environment.

The web app allows users to:

- **Teleoperation** the robot using a joystick.
- **RobotState** the robot's state, including location, velocity, and orientation.
- **Map** the robot by specifying goals on a 2D map.
- **Connection** the connection status between the web app and the robot.

## Technologies Used

- **React.js**: Front-end JavaScript library for building user interfaces.
- **ROS (Robot Operating System)**: Framework for developing robot software, including communication and control.
- **JavaScript**: Core scripting language for web development.
- **HTML5/CSS3**: Markup and styling for building and designing the front-end.
- **Bootstrap**: Front-end framework for responsive design and layout.
- **WebSocket(ROSSERIAL_Websocket)**: Real-time communication protocol between the web app and the robot.

## Install dependencies

0. Make Sure that you have installed rosserial-websocket for communication between the 2 systems.
1. Clone the web app repository

2. Install required Node.js packages:
   ```bash
   npm install
   ```
3. Start the web app:

   ```bash
   npm start
   ```

4. Open the web app at [http://localhost:3000](http://localhost:3000).

## Website Structure

The website is designed to present the Self-Driving Wheelchair project in a clear and professional manner. It includes the following sections:

- **Header**: Includes the site’s navigation menu and logo.
- **Landing Section**: Describes the project, its goals, and technology.
- **About Section**: Provides more detailed information on the autonomous wheelchair and its features.
- **Gallery Section**: Showcases images and videos of the project in action.
- **Team Section**: Lists the team members involved in the project.
- **Footer**: Contains contact information and social media links.

## Web App Features

The web app enables users to control and monitor the robot remotely. The main features include:

- **Connection Status**: Displays the current connection status between the web app and the robot.
- **Teleoperation**: A joystick interface for manual control of the robot's movement.
- **Robot State**: Displays robot parameters such as position, velocity, and orientation.
- **Map Visualization**: Shows a 2D map from the robot's environment using ROS and allows users to select a goal on the map for navigation.
- **Navigation**:Enables the robot to autonomously navigate to the specified goal using path planning algorithms.

## Libraries Used

The web app uses several libraries to handle communication with the robot, visualization, and navigation:

- **easeljs.js**: Used for rendering and interacting with the map and robot's environment in the HTML5 canvas.
- **eventemitter2.min.js**: Handles event-driven communication between the React components and the ROS system.
- **roslib.js**: A JavaScript library for interacting with the ROS system, allowing communication between the web app and the robot over WebSocket.
- **ros2d.js**: Provides tools for 2D visualization of the robot's environment and its current location on a map.
- **ros-nav2d-js**: A set of JavaScript libraries for implementing 2D navigation:
  - **Nav2D.js**: Handles core navigation logic.
  - **ImageMapClientNav.js**: Manages map data and client-side map interactions.
  - **Navigator.js**: Implements pathfinding and movement commands.
  - **OccupancyGridClientNav.js**: Handles the occupancy grid data from the robot's sensors.

## App Structure

The app is divided into several key components:

- **Header Component**
- **Home Component**:
  - **Connection Component**: Displays connection information with the robot.
  - **Teleoperation Component**: Joystick component for controlling the robot's movement.
  - **RobotState Component**: Displays robot parameters such as position, velocity, and orientation.
  - **Map Component**: Displays the map and allows the user to select a navigation goal.
- **Footer Component**

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
