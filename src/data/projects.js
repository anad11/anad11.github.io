export const projects = [
  {
    id: "robot-hand",

    title: "Robot Hand",
    organization: "Personal Project",

    image: "/images/robothandphoto.png",

    color: "#ff8a65",
    surface: "#d86d50",

    featured: true,

    tags: [
      "Mechanical Design",
      "Computer Vision",
      "Python",
      "MediaPipe",
      "3D Printing",
    ],

    summary:
      "A human-inspired robotic hand that mirrors hand motion and grips objects in multiple orientations.",

    objective:
      "Design a robotic hand with human-inspired kinematics featuring 1 DOF per finger and 3 DOFs for the thumb.",

    challenges:
      "Reducing friction during finger movement, working within limited available resources, assembling and manufacturing the full 3D-printed system, and converting thumb motion into three separate axes.",

    process:
      "Refined the mechanical design to reduce torque demands, added extension springs, and developed a Python and MediaPipe vision pipeline to track hand motion.",

    result:
      "Developed a functional robotic hand capable of replicating human hand movements and gripping objects in multiple orientations.",
  },

  {
    id: "tiago-pro",

    title: "Tiago-Pro Pick & Place",
    organization: "Waterloo Interactive Robotics Lab",

    image: "/images/tiagoprophoto.png",

    color: "#6aa7ff",
    surface: "#4779c5",

    featured: true,

    tags: [
      "ROS2",
      "MoveIt2",
      "Gazebo",
      "Robotics",
      "Motion Planning",
    ],

    summary:
      "Motion planning and manipulation software for a 7-DOF PAL Tiago-Pro robotic arm.",

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
    id: "robot-navigation",

    title: "Robot Navigation",
    organization: "Waterloo Watonomous",

    image: "/images/robotnavigationphoto.png",

    color: "#65c6b4",
    surface: "#3a9788",

    tags: [
      "ROS2",
      "Navigation",
      "SLAM",
      "Sensors",
      "Docker",
    ],

    summary:
      "A simulated autonomous robot that navigates between points while avoiding obstacles.",

    objective:
      "Program a simulated differential-drive robot using camera and laser-scanner data to navigate between points while avoiding static obstacles.",

    challenges:
      "Synchronizing camera and laser-scanner timestamps, buffering sensor data, filtering sensor noise, and tuning perception parameters.",

    process:
      "Researched navigation algorithms, designed the navigation architecture, integrated sensor data, and iteratively refined obstacle avoidance through simulation.",

    result:
      "Produced a functional navigation system and developed practical experience with navigation algorithms and simultaneous localization and mapping.",
  },

  {
    id: "tower-raising",

    title: "Tower Raising Lead",
    organization: "Waterloo Rocketry",

    image: "/images/towerraisingphoto.png",

    color: "#f2c14e",
    surface: "#b88c24",

    tags: [
      "Leadership",
      "Ground Operations",
      "Rocketry",
      "Design",
    ],

    summary:
      "Led ground-equipment setup and tower-raising operations for Waterloo Rocketry.",

    objective:
      "Lead a team of 15 through ground-equipment setup, rocket handling, and tower raising before launch.",

    challenges:
      "Designing custom ground anchors, creating a new ground-equipment procedure, training the team, and safely handling the assembled rocket.",

    process:
      "Developed equipment procedures, designed supporting hardware, organized the raising operation, and trained team members before competition.",

    result:
      "Ground equipment was set up in a team-record three hours, contributing to the rocket launching on the first possible competition day.",
  },

  {
    id: "rocket-stand",

    title: "Rocket Tower Stand",
    organization: "Waterloo Rocketry",

    image: "/images/rockettowerstandphoto.png",

    color: "#a985ff",
    surface: "#7358bf",

    tags: [
      "SolidWorks",
      "FEA",
      "Machining",
      "Mechanical Design",
    ],

    summary:
      "Designed and manufactured the support mount used to hold the team's liquid bipropellant rocket before launch.",

    objective:
      "Design and machine the rocket mount used to support the rocket before launch.",

    challenges:
      "Working under a tight schedule while redesigning around limited reference CAD and available manufacturing resources.",

    process:
      "Created concepts using field measurements, designed the mount in SolidWorks, performed FEA, optimized mass versus performance, and tested it during engine and valve testing.",

    result:
      "The mount was successfully used during launch and testing in the year it was designed and again the following year.",
  },

  {
    id: "pyrocutters",

    title: "Pyrocutters",
    organization: "Waterloo Rocketry",

    image: "/images/pyrocuttersphoto.png",

    color: "#ef729d",
    surface: "#b84b70",

    tags: [
      "ANSYS",
      "Machining",
      "Titanium",
      "Design",
    ],

    summary:
      "Custom titanium pyrocutters used in the rocket's parachute deployment system.",

    objective:
      "Design and machine custom pyrocutters used to sever parachute lines for rapid deployment during descent.",

    challenges:
      "Designing for manufacturability, improving machining efficiency, and learning to work with a difficult heat-prone material.",

    process:
      "Performed material and geometry research, created drawings, ran ANSYS simulations, cut titanium stock, and machined the components using a lathe and hand tapping.",

    result:
      "The pyrocutters successfully deployed during the descent of Canada's first amateur liquid bipropellant rocket.",
  },

  {
    id: "n2o-quick-disconnect",

    title: "N₂O Quick Disconnect",
    organization: "Waterloo Rocketry",

    image: "/images/n2oquickdisconnectphoto.png",

    color: "#4fc3df",
    surface: "#29849a",

    tags: [
      "Mechanical Design",
      "Pneumatics",
      "Machining",
      "CNC",
      "TIG Welding",
    ],

    summary:
      "Redesigned the oxidizer-fill quick disconnect used to detach the ground system from the rocket at launch.",

    objective:
      "Redesign the N₂O oxidizer quick disconnect so it could safely detach at launch using pneumatic pressure and an actuator.",

    challenges:
      "Rapidly learning new technical skills, responding to changing requirements, and revisiting assumptions after hardware damage during valve testing.",

    process:
      "Worked with system leads to define constraints, developed the mechanical design, selected materials, and learned the machining and fabrication techniques required to manufacture the system.",

    result:
      "The quick disconnect safely detached following launch.",
  },

  {
    id: "first-robotics",

    title: "FIRST Robotics",
    organization: "Team 1325",

    image: "/images/firstroboticsphoto.png",

    color: "#ff725e",
    surface: "#bd4e40",

    tags: [
      "Robotics",
      "Manufacturing",
      "Mechanical Design",
      "Competition",
    ],

    summary:
      "Designed, manufactured, tested, and competed with large-scale robots as part of FIRST Robotics Team 1325.",

    objective:
      "Work with more than 20 students and three mentors to design, manufacture, test, and compete with a large robot.",

    challenges:
      "Learning mechanical systems quickly, manufacturing competition-ready hardware, and debugging mechanisms under competitive time constraints.",

    process:
      "Worked primarily on mechanical development and manufacturing while gaining experience with robot systems, technical drawings, power tools, and iterative testing.",

    result:
      "The team finished 3rd in Canada and 23rd in the world at the 2023 FIRST World Championships.",
  },
];