import { useState } from "react";

import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

import "../styles/projects.css";

function Projects() {
  const [expandedProject, setExpandedProject] =
    useState(null);

  const toggleProject = (id) => {
    setExpandedProject((current) =>
      current === id ? null : id
    );
  };

  return (
    <section
      className="projects-section section"
      id="projects"
    >
      {/* ====================================
          HEADING
      ==================================== */}

      <div className="section-heading projects-heading">

        <p className="section-number">
          01
        </p>

        <div>

          <p className="eyebrow">
            THINGS I'VE BUILT
          </p>

          <h2>
            Projects
          </h2>

        </div>

      </div>

      {/* ====================================
          PROJECT GRID
      ==================================== */}

      <div className="projects-grid">

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            expanded={
              expandedProject === project.id
            }
            onToggle={() =>
              toggleProject(project.id)
            }
          />
        ))}

      </div>
    </section>
  );
}

export default Projects;