export const projects = [
  {
    id: "robot-arm",

    title: "Robot Arm",
    organization: "In Progress...",

    images: [
      "/images/robotarm/1.png",
    ],

    color: "#9c7cff",
    surface: "#7258b5",

    summary:
      "A vision-guided robotic arm designed to identify, pick, and place objects using pose estimation and motion planning.",

    tags: [
      "ROS2",
      "MoveIt2",
      "OpenCV",
      "Arduino",
      "Computer Vision",
    ],

    objective:
      "Design a robotic arm and vision pipeline capable of determining an object's 3D position and orientation, picking it up, locating a placement pose, and placing the object.",

    challenges:
      "Combining mechanical design, camera calibration, object pose estimation, inverse kinematics, and reliable robotic motion into one integrated system.",

    process:
      "Designed a 5-DOF arm with a rotational base, three actuated links, and gripper. Integrated ArUco marker detection, ChArUco camera calibration, OpenCV pose estimation, ROS2, and MoveIt2 motion planning.",

    result:
      "Developed the mechanical and software architecture for the system and produced a working prototype for continued vision-guided manipulation development.",
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
    surface: "#c96552",

    summary:
      "A human-inspired robotic hand that mirrors hand motion and grips objects in multiple orientations.",

    tags: [
      "Mechanical Design",
      "Computer Vision",
      "Python",
      "MediaPipe",
      "3D Printing",
    ],

    objective:
      "Design and build a human-inspired robotic hand with one degree of freedom per finger and three degrees of freedom for the thumb.",

    challenges:
      "Achieving sufficient motor torque, reproducing realistic thumb motion, and creating a fully 3D-printable assembly that remained easy to manufacture and assemble.",

    process:
      "Iteratively refined the mechanical design, incorporated extension springs, and developed a Python control system using MediaPipe and OpenCV to track human hand motion and command the servos.",

    result:
      "Built a functional robotic hand capable of reproducing human hand movement and gripping objects in multiple orientations.",
  },

  {
    id: "robot-navigation",

    title: "Robot Navigation",
    organization: "Waterloo WATonomous",

    images: [
      "/images/robot-navigation/1.png",
      "/images/robot-navigation/2.png",
      "/images/robot-navigation/3.png",
    ],

    color: "#62c9b2",
    surface: "#3b9181",

    summary:
      "A simulated autonomous robot that navigates between points while avoiding obstacles.",

    tags: [
      "ROS2",
      "Navigation",
      "SLAM",
      "Sensors",
      "Docker",
    ],

    objective:
      "Develop autonomous waypoint navigation for a simulated differential-drive robot using camera and LiDAR sensor information.",

    challenges:
      "Maintaining accurate navigation while dealing with noisy sensor measurements, obstacle detection, and integration between multiple software components.",

    process:
      "Researched navigation and obstacle-avoidance methods, integrated simulated sensor data, and repeatedly tested and debugged the navigation system in simulation.",

    result:
      "Produced a functional simulated robot capable of navigating between waypoints while detecting and avoiding static obstacles.",
  },

  {
    id: "tiago-pick-place",

    title: "Tiago-Pro Pick & Place",
    organization: "Waterloo Interactive Robotics Lab",

    images: [
      "/images/tiago-pick-place/1.png",
      "/images/tiago-pick-place/2.png",
      "/images/tiago-pick-place/3.png",
    ],

    color: "#66a7ff",
    surface: "#4678b8",

    summary:
      "Motion planning and manipulation software for a 7-DOF PAL Tiago-Pro robotic arm.",

    tags: [
      "ROS2",
      "MoveIt2",
      "Gazebo",
      "Robotics",
      "Motion Planning",
    ],

    objective:
      "Develop ROS2 control software for a 7-DOF PAL Tiago-Pro robotic arm to perform simulated pick-and-place operations.",

    challenges:
      "Integrating multiple ROS2 systems, creating a custom camera mount, developing reliable motion planning, and working across Docker and Linux environments.",

    process:
      "Developed and tested motion control, trajectory planning, gripper control, and simulated sensor integration while refining arm movement through iterative testing and debugging.",

    result:
      "Created a functional simulated pick-and-place workflow with coordinated robotic arm movement.",
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

    color: "#f3c84c",
    surface: "#ae862c",

    summary:
      "A structural launch-tower mount designed and manufactured to support a liquid-fueled rocket before launch.",

    tags: [
      "SolidWorks",
      "FEA",
      "Machining",
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
    ],

    color: "#ec719d",
    surface: "#ad506f",

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