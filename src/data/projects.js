export const projects = [
  {
    id: "sim-to-real-pick-and-place",

    title: "Sim-To-Real Pick and Place",
    organization: "Red Rabbit Robotics | Co-op",

    images: [
      "/images/real2sim/1.png",
      "/images/real2sim/222.mp4",
      "/images/real2sim/3.mov",
      "/images/real2sim/4.png",
    ],

    color: "#70b7d8",
    surface: "#3e7895",

    summary:
      "Built and deployed collision-aware T-shirt pick-and-place trajectories across Gazebo simulation and a 6-DOF RealMan robot.",

    tags: [
      "ROS2",
      "Gazebo",
      "RealMan",
      "Sim-to-Real",
      "Path Planning",
      "Python API",
    ],

    objective:
      "Automate T-shirt handling by transferring collision-aware pick-and-place motions from ROS2 and Gazebo to a physical 6-DOF RealMan arm.",

    challenges:
      "Troubleshooting CAN bus communication and hardware integration while resolving differences between simulated and physical robot behavior.",

    process:
      "Assembled and wired the robotic system, including an external emergency stop. Simulated and collision-checked trajectories in ROS2 and Gazebo, then connected the physical arm through its Python API and integrated the in-house software.",

    result:
      "Deployed the sim-to-real workflow on the physical robot and achieved a 6-second pick cycle with collision-aware motion planning.",
  },

  {
    id: "robot-arm",

    title: "Robot Arm",
    organization: "Personal Project | In Progress",

    images: [
      "/images/robotarm/1.png",
    ],

    color: "#9c7cff",
    surface: "#7258b5",

    summary:
      "A 5-DOF arm in development that uses calibrated computer vision and motion planning to identify, pick, and place objects.",

    tags: [
      "ROS2",
      "MoveIt2",
      "OpenCV",
      "ArUco",
      "ChArUco",
      "Inverse Kinematics",
    ],

    objective:
      "Build a vision-guided 5-DOF robotic arm that estimates an object's 3D pose, picks it up, estimates a placement pose, and places it.",

    challenges:
      "Integrating camera calibration, marker-based pose estimation, inverse kinematics, and reliable motion planning across the camera, arm, and control software.",

    process:
      "Designing a 5-DOF arm with a rotational base, three actuated links, and gripper. The vision pipeline uses a monochrome camera, OpenCV ArUco detection and PnP pose estimation, and ChArUco calibration; ROS2 and MoveIt2 handle control, inverse kinematics, and path planning.",

    result:
      "The project is in progress, with the mechanical and software architecture established for vision-guided manipulation.",
  },

  {
    id: "robot-hand",

    title: "Robot Hand",
    organization: "Personal Project",

    images: [
      "/images/robothand/1.png",
      "/images/robothand/2.png",
      "/images/robothand/3.png",
      "/images/robothand/4.png",
      "/images/robothand/5.png",
      "/images/robothand/6.png",
      "/images/robothand/7.png"
    ],

    color: "#ff876f",
    surface: "#a94e3d",

    summary:
      "A 3D-printed, tendon-driven robotic hand that mirrors human motion using a Python, MediaPipe, and OpenCV vision pipeline.",

    tags: [
      "Mechanical Design",
      "Python",
      "MediaPipe",
      "OpenCV",
      "Arduino",
      "3D Printing",
    ],

    objective:
      "Build a human-inspired hand with one degree of freedom per finger and a three-axis thumb, actuated by seven motors and controlled with an Arduino.",

    challenges:
      "Reducing actuator torque demands, separating the thumb into three independent axes, and manufacturing and assembling the complete 3D-printed mechanism.",

    process:
      "Refined the actuator design, added extension springs, and integrated the motor-control electronics. Developed a Python vision pipeline with MediaPipe and OpenCV to track hand motion and command the hand.",

    result:
      "Built a functional robotic hand that replicates human hand movements and grasps objects in multiple orientations, with improved torque demands and motor-control precision.",
  },

  {
    id: "robot-navigation",

    title: "Robot Navigation",
    organization: "Waterloo WATonomous",

    images: [
      "/images/robot-navigation/1.png",
      "/images/robot-navigation/2.png",
    ],

    color: "#62c9b2",
    surface: "#286b60",

    summary:
      "ROS2 autonomous navigation for a simulated differential-drive robot using camera and LiDAR data to follow waypoints and avoid obstacles.",

    tags: [
      "ROS2",
      "Gazebo",
      "Foxglove",
      "SLAM",
      "LiDAR",
      "Sensor Fusion",
    ],

    objective:
      "Program a simulated differential-drive robot to navigate waypoints autonomously and avoid static obstacles using camera and LiDAR data.",

    challenges:
      "Improving sensor accuracy and handling noisy, variable measurements while coordinating waypoint tracking and obstacle avoidance.",

    process:
      "Integrated camera and LiDAR data, then implemented waypoint tracking, obstacle avoidance, sensor fusion, filtering, and buffering. Tested and debugged SLAM-based workflows in Gazebo and Foxglove.",

    result:
      "Developed a functional autonomous navigation system for waypoint following and static-obstacle avoidance in simulation.",
  },

  {
    id: "rocket-tower-mount",

    title: "Rocket Tower Mount",
    organization: "Waterloo Rocketry",

    images: [
      "/images/rocket-tower-mount/1.png",
      "/images/rocket-tower-mount/2.png",
      "/images/rocket-tower-mount/3.png",
    ],

    color: "#66a7ff",
    surface: "#4678b8",
    textColor: "#ffffff",

    summary:
      "A structural launch-tower mount designed and manufactured to support a liquid-fueled rocket before launch.",

    tags: [
      "SolidWorks",
      "FEA/ANSYS",
      "Manufacturing",
      "Mechanical Design",
      "Rocketry",
    ],

    objective:
      "Design and manufacture a launch-tower mount capable of safely supporting the rocket prior to launch.",

    challenges:
      "Working under a tight schedule, redesigning around changing constraints, and developing the mount with limited reference CAD from the existing launch infrastructure.",

    process:
      "Collected field measurements, developed the design in SolidWorks, performed FEA, produced manufacturing drawings, and validated the structure during engine and valve testing.",

    result:
      "The completed mount successfully supported the rocket and has been used during two launches.",
  },

  {
    id: "pyrocutters",

    title: "Pyrocutters",
    organization: "Waterloo Rocketry",

    images: [
      "/images/pyrocutters/1.png",
      "/images/pyrocutters/2.png",
      "/images/pyrocutters/3.png",
      "/images/pyrocutters/4.png",
    ],

    color: "#f3c84c",
    surface: "#80601a",

    summary:
      "Custom titanium pyrocutters designed to rapidly sever parachute lines during rocket recovery.",

    tags: [
      "Machining",
      "ANSYS",
      "SolidWorks",
      "Manufacturing",
      "Rocketry",
    ],

    objective:
      "Develop custom pyrocutters capable of reliably severing parachute lines during the rocket's descent sequence.",

    challenges:
      "Balancing performance with manufacturability while developing a machining process that limited heat buildup and accommodated titanium components.",

    process:
      "Researched material and geometry options, produced engineering drawings, performed ANSYS analysis, tested scrap titanium, and developed a machining workflow involving drilling, reaming, turning, and hand tapping.",

    result:
      "The pyrocutters successfully deployed the recovery system during the descent of Canada's first amateur liquid bipropellant rocket.",
  },

];