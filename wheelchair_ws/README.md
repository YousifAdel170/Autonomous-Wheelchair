# Self-Driving Wheelchair Robotics System

## Overview

This project is dedicated to creating a self-driving wheelchair that operates autonomously in both simulation and real-world environments. The wheelchair leverages **ROS** (Robot Operating System) for navigation, localization, and obstacle avoidance, integrating multiple sensors (IMU, encoders, Kinect camera, and LIDAR) for enhanced mapping and movement control.

The system employs the **MoveBase** package for navigation, using the **A\*** algorithm for global path planning and the **DWA (Dynamic Window Approach)** for local path planning. Localization is carried out using the **AMCL** (Adaptive Monte Carlo Localization) package, and the **GMapping** algorithm is used for real-time 2D mapping.

---

## Key Features

- **Depth Image to Laser Scan**: Converts Kinect images to 180° laser scans for mapping and localization.
- **Mapping**: **gmapping** algorithm for **2D** mapping using LIDAR or Kinect depth camera.
- **Localization**: **AMCL** for real-time robot localization within a map.
- **Sensor Fusion**: Integration of **IMU**, **encoders**, **Kinect** or **LIDAR** to enhance sensor readings.
- **Path Planning**: MoveBase with **A\*** (global) and \*\*DWA (local) for autonomous navigation.
- **Simulation & Real-World Support**: Works in both Gazebo simulation and real-world robot control.

---

## Components and Packages Used

- **TurtleBot3**: This project is built on the TurtleBot3 platform, providing the basic hardware and software stack for mobile robot applications.
- **depthimage_to_laserscan**: This package converts Kinect depth images into 360-degree laser scan data, enabling the wheelchair to use Kinect as a LIDAR sensor for mapping and localization.
- **GMapping**: Algorithm for creating a 2D occupancy grid map of the environment using laser scan data.
- **AMCL**: Adaptive Monte Carlo Localization for estimating the robot's position and orientation in a map.
- **MoveBase**: For path planning and obstacle avoidance. It uses A\* for global path planning and DWA for local path planning.

---

## System Setup

### Sensor Integration:

1. **Kinect Camera**: Used as the primary sensor for depth imaging. The Kinect camera provides depth data, which is then converted into laser scan data using the `depthimage_to_laserscan` package.
2. **IMU and Encoders**: Used for sensor fusion to improve the accuracy of the robot’s movement and orientation.

### Simulation:

- **Gazebo**: A 3D robotics simulator that allows testing and validation of the robot's behavior in a virtual environment. The system is set up to work seamlessly with the TurtleBot3 Gazebo simulation for testing navigation, localization, and obstacle avoidance.

### Real-World Control:

For real-world control, the system uses the same algorithms as in simulation but requires physical hardware (Kinect, IMU, encoders) to operate. The real-world system follows the same logic for localization, mapping, and navigation, with adaptations to ensure accurate control over the physical wheelchair.

---

## How It Works

### Localization & Mapping:

1. **AMCL** is used to estimate the robot’s position on the map by using sensor data (LIDAR/Kinect).
2. **GMapping** creates the 2D map based on the depth data provided by the Kinect or LIDAR sensor.

### Path Planning:

1. **Global Planner (A\*)**:

1. **Global Planner (A\*)**:

   - The **A\*** algorithm computes an optimal path from the robot's starting location to its goal location while avoiding static obstacles.
   - The global planner ensures the robot has a clear, efficient path towards its target.

1. **Local Planner (DWA)**:
   - The **DWA** algorithm enables real-time obstacle avoidance, allowing the wheelchair to navigate dynamic environments while continually adjusting its path to avoid moving obstacles.

### Sensor Fusion:

Data from multiple sensors are integrated for optimal performance:

- **IMU**: Provides real-time orientation data, crucial for the robot’s pose estimation.
- **Encoders**: These help track the movement of the wheelchair and correct any potential errors in odometry.
- **Kinect / LIDAR**: Supplies depth and environmental data for mapping and obstacle detection.

---

## Running the System

### Simulation:

1. **Start the Mapping**:

   Launch the **SLAM** algorithm to create the map of the environment:

   ```bash
   roslaunch wheelchair_nav SLAM_ALL.launch

   ```

2. **Launch the Navigation**:
   Launch the navigation stack for autonomous path planning:

```bash
roslaunch wheelchair_nav navigation_FULL.launch

```

### Real-Time:

1. **Launch the Mapping**:

For real-world mapping, launch the SLAM algorithm:

```bash
roslaunch wheelchair_nav SLAM_ALL_Real.launch
```

2. **Launch the Navigation**:

Launch the navigation stack for real-world autonomous operation:

```bash
roslaunch wheelchair_nav navigation_Real.launch
```

---

## Additional Notes

## Hardware Requirements

- **Kinect Camera (or LIDAR sensor)**: For depth sensing and mapping.
- **IMU and Encoder Sensors**: To provide data for localization and movement control.
- **Breadboards and Wires**: For prototyping and connecting sensors and components.
- **3D Printer**: To design custom parts, such as the turn mechanism for the encoders.
- **Robot and its Motors**: The base robot platform with actuators for movement.
- **Motor Driver (Cytron Dual Channels, 2 Motors)**: To control the motors, driving the robot.
  - **Note**: The robot in this setup uses only **2 wheels**. For better accuracy, use **4 motors** for a **4-wheel drive configuration** (Skid Steer instead of differential drive), which can be implemented in both simulation and real-world environments.
- **Computer**: A computer with sufficient processing power to run **ROS** and **Gazebo** simulations (e.g., your PC, Jetson Nano, etc.).

## Software Requirements

- **ROS Noetic (for Ubuntu 20.04)**
- **Gazebo (for simulation)**
- \*_MoveBase, AMCL, GMapping, and other necessary ROS packages_

---

## Future Improvement

#### **Voice Control Integration**

- **Voice Commands for Navigation**: Incorporating **voice control** into the wheelchair system would enable users to operate the wheelchair hands-free. This would allow the user to issue commands like "move forward," "turn left," or "stop" without needing manual input.
- **AI Voice Assistants**: Integration of an AI-based voice assistant, such as **Google Assistant**, **Amazon Alexa**, or **Custom Speech Recognition**, can enable more complex interactions. For example, the wheelchair could respond to commands like "take me to the kitchen" or "move to the living room."
- **Speech-to-Text for Control**: Voice commands could be converted into text, allowing for easy integration with ROS, making control more intuitive for the user, especially for those with physical limitations.

---

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
