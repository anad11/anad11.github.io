import { useEffect, useRef, useState } from "react";


const isVideoPath = (path = "") =>
  /\.(mp4|webm|ogg|mov)(?:[?#].*)?$/i.test(path);


function ExpandedImageCarousel({
  project,
}) {
  const trackRef = useRef(null);

  const [activeImage, setActiveImage] =
    useState(0);


  const images = (
    project.images?.length
      ? project.images
      : project.image
        ? [project.image]
        : []
  ).map((media) =>
    typeof media === "string"
      ? {
          type: isVideoPath(media) ? "video" : "image",
          src: media,
        }
      : { type: "image", ...media }
  );

  const goToImage = (index) => {
    const track = trackRef.current;

    if (!track) return;


    const newIndex = Math.max(
      0,
      Math.min(
        index,
        images.length - 1
      )
    );


    const slide =
      track.children[newIndex];

    if (!slide) return;


    const targetLeft =
      slide.offsetLeft +
      slide.offsetWidth / 2 -
      track.clientWidth / 2;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    track.scrollTo({
      left: targetLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });


    setActiveImage(newIndex);
  };

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track) return;


    const trackCenter =
      track.scrollLeft +
      track.clientWidth / 2;


    let closestIndex = 0;
    let closestDistance =
      Infinity;


    Array.from(
      track.children
    ).forEach(
      (slide, index) => {

        const slideCenter =
          slide.offsetLeft +
          slide.offsetWidth / 2;


        const distance =
          Math.abs(
            trackCenter -
            slideCenter
          );


        if (
          distance <
          closestDistance
        ) {
          closestDistance =
            distance;

          closestIndex =
            index;
        }

      }
    );


    setActiveImage(
      closestIndex
    );
  };


  const previousImage = (
    event
  ) => {
    event.stopPropagation();

    goToImage(
      activeImage - 1
    );
  };


  const nextImage = (
    event
  ) => {
    event.stopPropagation();

    goToImage(
      activeImage + 1
    );
  };


  return (
    <div className="project-image-wrapper project-carousel-wrapper">

      <div
        ref={trackRef}
        className={
            images.length === 1
            ? "project-image-track single-image"
            : "project-image-track"
        }
        onScroll={handleScroll}
        >

        {images.map(
          (media, index) => (

            <div
              key={`${project.id}-${index}`}
              className={
                activeImage === index
                  ? "project-image-slide is-active"
                  : "project-image-slide"
              }
            >

              {media.type === "video" ? (
                <video
                  className="project-image project-video"
                  src={media.src}
                  poster={media.poster}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${project.title} video ${index + 1}`}
                />
              ) : (
                <img
                  className="project-image"
                  src={media.src}
                  alt={`${project.title} ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              )}

            </div>

          )
        )}

        {!images.length && (
          <div className="project-media-placeholder">
            Project media coming soon
          </div>
        )}

      </div>


      {/* LEFT ARROW */}

      {activeImage > 0 && (

        <button
          className="
            project-image-arrow
            project-image-arrow-left
          "
          type="button"
          aria-label="Previous image"
          onClick={previousImage}
        >
          ‹
        </button>

      )}


      {/* RIGHT ARROW */}

      {activeImage <
        images.length - 1 && (

        <button
          className="
            project-image-arrow
            project-image-arrow-right
          "
          type="button"
          aria-label="Next image"
          onClick={nextImage}
        >
          ›
        </button>

      )}


      {/* DOTS */}

      {images.length > 1 && (

        <div className="project-image-dots">

          {images.map(
            (_, index) => (

              <button
                key={index}
                type="button"

                className={
                  activeImage ===
                  index
                    ? "project-image-dot is-active"
                    : "project-image-dot"
                }

                aria-label={`View media ${index + 1}`}

                onClick={(
                  event
                ) => {

                  event.stopPropagation();

                  goToImage(
                    index
                  );
                }}
              />

            )
          )}

        </div>

      )}


    </div>
  );
}



function ProjectCard({
  project,
  expanded,
  onToggle,
}) {
  const previewCardRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!expanded) return undefined;

    const previewCard = previewCardRef.current;
    closeButtonRef.current?.focus();

    return () => previewCard?.focus();
  }, [expanded]);

  const previewMedia =
    project.images?.find((media) => {
      if (typeof media === "string") {
        return !isVideoPath(media);
      }

      return media.type !== "video" || media.poster;
    }) || project.image;

  const previewImage =
    typeof previewMedia === "string"
      ? previewMedia
      : previewMedia?.type === "image"
        ? previewMedia.src
        : previewMedia?.poster;


  return (
    <>

      {/* =========================
          NORMAL CARD
      ========================= */}

      <article
        ref={previewCardRef}
        className="project-card"
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title} project details`}
        aria-haspopup="dialog"
        aria-expanded={expanded}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        }}

        style={{
          "--project-color":
            project.color,

          "--project-surface":
            project.surface,

          "--project-text-color":
            project.textColor || "#ffffff",
        }}
      >

        <div className="project-preview">

          <div className="project-image-wrapper">

            {previewImage ? (
              <img
                className="project-image"
                src={previewImage}
                alt={project.title}
                  loading="lazy"
                  decoding="async"
              />
            ) : (
              <div className="project-media-placeholder">
                {project.title}
              </div>
            )}


          </div>

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

              {project.tags.map(
                (tag) => (

                  <span key={tag}>
                    {tag}
                  </span>

                )
              )}

            </div>

          </div>

        </div>

      </article>



      {/* =========================
          EXPANDED CARD
      ========================= */}

      {expanded && (

        <div
          className="project-overlay"
          role="presentation"
          data-lenis-prevent
          onClick={onToggle}
        >

          <article
            className="
              project-card
              project-overlay-card
              is-expanded
            "
            id={`${project.id}-dialog`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${project.id}-title`}
            tabIndex={-1}

            style={{
              "--project-color":
                project.color,

              "--project-surface":
                project.surface,

              "--project-text-color":
                project.textColor || "#ffffff",
            }}

            onClick={(event) =>
              event.stopPropagation()
            }
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;

              const focusableElements = Array.from(
                event.currentTarget.querySelectorAll(
                  'button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])'
                )
              );

              if (!focusableElements.length) {
                event.preventDefault();
                event.currentTarget.focus();
                return;
              }

              const firstElement = focusableElements[0];
              const lastElement = focusableElements[focusableElements.length - 1];

              if (
                event.shiftKey &&
                document.activeElement === firstElement
              ) {
                event.preventDefault();
                lastElement.focus();
              } else if (
                !event.shiftKey &&
                document.activeElement === lastElement
              ) {
                event.preventDefault();
                firstElement.focus();
              }
            }}
          >

            <button
              ref={closeButtonRef}
              className="project-close-button"
              type="button"
              aria-label={`Close ${project.title} details`}
              onClick={onToggle}
            >
              ×
            </button>

            <div className="project-expanded-layout">


              {/* =====================
                  LEFT SIDE
              ===================== */}

              <div className="project-expanded-copy">


                {/* TOP INFO */}

                <div className="project-expanded-header">

                  <p className="project-organization">
                    {project.organization}
                  </p>


                  <h3 id={`${project.id}-title`}>
                    {project.title}
                  </h3>


                  <div className="project-tags">

                    {project.tags.map(
                      (tag) => (

                        <span key={tag}>
                          {tag}
                        </span>

                      )
                    )}

                  </div>

                </div>


                {/* DETAILS */}

                <div className="project-expanded-details">


                  <div className="project-detail">

                    <p className="project-detail-number">
                      01
                    </p>

                    <div>

                      <h4>
                        Objective
                      </h4>

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

                      <h4>
                        Process
                      </h4>

                      <p>
                        {project.process}
                      </p>

                    </div>

                  </div>


                  <div className="project-detail">

                    <p className="project-detail-number">
                      03
                    </p>

                    <div>

                      <h4>
                        Challenges
                      </h4>

                      <p>
                        {project.challenges}
                      </p>

                    </div>

                  </div>


                  <div className="project-detail">

                    <p className="project-detail-number">
                      04
                    </p>

                    <div>

                      <h4>
                        Result
                      </h4>

                      <p>
                        {project.result}
                      </p>

                    </div>

                  </div>

                </div>

              </div>



              {/* =====================
                  RIGHT SIDE
              ===================== */}

              <div className="project-expanded-media">

                <ExpandedImageCarousel
                  project={project}
                />

              </div>


            </div>

          </article>

        </div>

      )}

    </>
  );
}


export default ProjectCard;