function ProjectCard({
  project,
  expanded,
  onToggle,
}) {
  return (
    <article
      className={`
        project-card
        ${project.featured ? "project-featured" : ""}
        ${expanded ? "is-expanded" : ""}
      `}
      style={{
        "--project-color": project.color,
        "--project-surface": project.surface,
      }}
    >
      <button
        className="project-preview"
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        {/* ====================================
            IMAGE
        ==================================== */}

        <div className="project-image-wrapper">
          <img
            className="project-image"
            src={project.image}
            alt={project.title}
          />

          <div className="project-number">
            {expanded ? "−" : "+"}
          </div>
        </div>

        {/* ====================================
            PREVIEW TEXT
        ==================================== */}

        <div className="project-preview-copy">
          <p className="project-organization">
            {project.organization}
          </p>

          <h3>
            {project.title}
          </h3>

          <p className="project-summary">
            {project.summary}
          </p>

          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>
                #{tag.replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* ======================================
          EXPANDED CONTENT
      ====================================== */}

      <div
        className="project-expanded"
        aria-hidden={!expanded}
      >
        <div className="project-details-grid">

          <div className="project-detail">
            <p className="project-detail-number">
              01
            </p>

            <div>
              <h4>Objective</h4>

              <p>
                {project.objective}
              </p>
            </div>
          </div>


          <div className="project-detail">
            <p className="project-detail-number">
              02
            </p>

            <div>
              <h4>Challenges</h4>

              <p>
                {project.challenges}
              </p>
            </div>
          </div>


          <div className="project-detail">
            <p className="project-detail-number">
              03
            </p>

            <div>
              <h4>Process</h4>

              <p>
                {project.process}
              </p>
            </div>
          </div>


          <div className="project-detail">
            <p className="project-detail-number">
              04
            </p>

            <div>
              <h4>Result</h4>

              <p>
                {project.result}
              </p>
            </div>
          </div>

        </div>

        <button
          className="project-close"
          type="button"
          onClick={onToggle}
        >
          Close ↑
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;