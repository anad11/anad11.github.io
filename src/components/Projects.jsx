import { useEffect, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import "../styles/projects.css";


function Projects({ lenisRef }) {

  const [
    expandedProject,
    setExpandedProject,
  ] = useState(null);


  const toggleProject = (id) => {

    setExpandedProject(
      (current) =>
        current === id
          ? null
          : id
    );

  };

  useEffect(() => {
    if (!expandedProject) return undefined;

    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    const lenis = lenisRef?.current;

    lenis?.stop();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setExpandedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedProject, lenisRef]);


  return (
    <section
      className="projects-section section"
      id="projects"
    >

      <div className="section-heading projects-heading">

        <div>

          <h2>
            Projects
          </h2>

        </div>

      </div>


      <div className="projects-grid">

        {projects.map(
          (project) => (

            <ProjectCard
              key={project.id}

              project={project}

              expanded={
                expandedProject ===
                project.id
              }

              onToggle={() =>
                toggleProject(
                  project.id
                )
              }
            />

          )
        )}

      </div>

    </section>
  );
}


export default Projects;