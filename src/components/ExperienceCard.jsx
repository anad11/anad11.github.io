function ExperienceCard({ experience }) {
  return (
    <article
      className="experience-card"
      style={{
        "--accent": experience.color,
        "--logo-background": experience.logoBackground || "#f3f3f1",
      }}
    >
      <div className="experience-card-content">

        {/* =========================
            TEXT
        ========================= */}

        <div className="experience-copy">

          <h3 className="experience-role">
            {experience.role}
          </h3>

          <h4 className="experience-company">
            {experience.company}
          </h4>

          <p className="experience-date">
            {experience.date}
          </p>

          <ul className="experience-description">
            {experience.description.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          <div className="experience-tags">
            {experience.tags.map((tag) => (
              <span key={tag}>
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* =========================
            IMAGES
        ========================= */}

        <div className="experience-media">

          <div className="experience-photo-wrapper">

            {/* Large work/company photo */}

            <img
              className="experience-photo"
              src={experience.photo}
              alt={`${experience.company} experience`}
              loading="lazy"
              decoding="async"
            />

            {/* Floating company logo */}

            <div className="company-logo-card">
              {experience.logo ? (
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span
                  className="company-logo-initials"
                  aria-label={`${experience.company} initials`}
                >
                  {experience.logoText || experience.company.slice(0, 2)}
                </span>
              )}
            </div>

          </div>

        </div>

      </div>
    </article>
  );
}

export default ExperienceCard;