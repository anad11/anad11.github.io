import { useRef, useState } from "react";


function ExpandedImageCarousel({
  project,
  onToggle,
}) {
  const trackRef = useRef(null);

  const [activeImage, setActiveImage] =
    useState(0);


  const images =
    project.images?.length
      ? project.images
      : project.image
        ? [project.image]
        : [];


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


    track.scrollTo({
      left: targetLeft,
      behavior: "smooth",
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
          (image, index) => (

            <div
              key={`${project.id}-${index}`}
              className={
                activeImage === index
                  ? "project-image-slide is-active"
                  : "project-image-slide"
              }
            >

              <img
                className="project-image"
                src={image}
                alt={`${project.title} ${index + 1}`}
              />

            </div>

          )
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

                aria-label={`View image ${index + 1}`}

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


      {/* CLOSE */}

      <button
        className="project-number"
        type="button"
        aria-label="Close project"

        onClick={(event) => {
          event.stopPropagation();

          onToggle();
        }}
      >
        −
      </button>

    </div>
  );
}



function ProjectCard({
  project,
  expanded,
  onToggle,
}) {

  const previewImage =
    project.images?.[0] ||
    project.image;


  return (
    <>

      {/* =========================
          NORMAL CARD
      ========================= */}

      <article
        className="project-card"

        style={{
          "--project-color":
            project.color,

          "--project-surface":
            project.surface,
        }}
      >

        <div className="project-preview">

          <div className="project-image-wrapper">

            <img
              className="project-image"
              src={previewImage}
              alt={project.title}
            />


            <button
              className="project-number"
              type="button"
              aria-label="Expand project"
              onClick={onToggle}
            >
              +
            </button>

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
                    #
                    {tag.replace(
                      /\s+/g,
                      ""
                    )}
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
          onClick={onToggle}
        >

          <article
            className="
              project-card
              project-overlay-card
              is-expanded
            "

            style={{
              "--project-color":
                project.color,

              "--project-surface":
                project.surface,
            }}

            onClick={(event) =>
              event.stopPropagation()
            }
          >

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


                  <h3>
                    {project.title}
                  </h3>


                  <div className="project-tags">

                    {project.tags.map(
                      (tag) => (

                        <span key={tag}>
                          #
                          {tag.replace(
                            /\s+/g,
                            ""
                          )}
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
                        Challenges
                      </h4>

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
                  onToggle={onToggle}
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