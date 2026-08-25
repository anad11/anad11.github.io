import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { experiences } from "../data/experience";
import ExperienceCard from "./ExperienceCard";
import "../styles/experience.css";

function Experience() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const dotRefs = useRef([]);
  const progressRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [timelineLayout, setTimelineLayout] = useState({
    top: 0,
    height: 0,
    stops: [],
  });

  const [reachedIndex, setReachedIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ==================================================
     CURSOR BACKGROUND
  ================================================== */

  const handleMouseMove = (event) => {
    const section = sectionRef.current;

    if (!section) return;

    const rect = section.getBoundingClientRect();

    section.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );

    section.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );
  };

  /* ==================================================
     MEASURE EXACT DOT POSITIONS
  ================================================== */

  const measureTimeline = () => {
    const list = listRef.current;
    const dots = dotRefs.current.filter(Boolean);

    if (!list || dots.length !== experiences.length) {
      return;
    }

    const listRect = list.getBoundingClientRect();

    const relativeCenters = dots.map((dot) => {
      const rect = dot.getBoundingClientRect();

      return (
        rect.top -
        listRect.top +
        rect.height / 2
      );
    });

    const first = relativeCenters[0];

    const last =
      relativeCenters[
        relativeCenters.length - 1
      ];

    const height = Math.max(
      0,
      last - first
    );

    const stops = relativeCenters.map(
      (position) => {
        if (height === 0) {
          return 0;
        }

        return (
          ((position - first) / height) *
          100
        );
      }
    );

    setTimelineLayout((previous) => {
      const sameStops =
        previous.stops.length ===
          stops.length &&
        previous.stops.every(
          (stop, index) =>
            Math.abs(
              stop - stops[index]
            ) < 0.01
        );

      if (
        Math.abs(
          previous.top - first
        ) < 0.5 &&
        Math.abs(
          previous.height - height
        ) < 0.5 &&
        sameStops
      ) {
        return previous;
      }

      return {
        top: first,
        height,
        stops,
      };
    });
  };

  /* ==================================================
     UPDATE TIMELINE ON SCROLL
  ================================================== */

  const updateTimeline = () => {
    /*
      Only allow one update per
      browser frame.
    */
    if (
      animationFrameRef.current !==
      null
    ) {
      return;
    }

    animationFrameRef.current =
      requestAnimationFrame(() => {
        try {
          const dots =
            dotRefs.current.filter(
              Boolean
            );

          const progressBar =
            progressRef.current;

          if (
            dots.length !==
              experiences.length ||
            !progressBar
          ) {
            return;
          }

          /*
            Get exact dot centers relative
            to the browser viewport.
          */
          const dotCenters = dots.map(
            (dot) => {
              const rect =
                dot.getBoundingClientRect();

              return (
                rect.top +
                rect.height / 2
              );
            }
          );

          const first =
            dotCenters[0];

          const last =
            dotCenters[
              dotCenters.length - 1
            ];

          const totalHeight = Math.max(
            0,
            last - first
          );

          /*
            Middle of browser window
            controls the progress point.
          */
          const marker =
            window.innerHeight * 0.5;

          /*
            How far has the marker travelled
            between first and last dot?
          */
          const filled = Math.max(
            0,
            Math.min(
              totalHeight,
              marker - first
            )
          );

          /*
            Update the timeline directly.

            This avoids React having to
            rerender continuously while
            scrolling.
          */
          progressBar.style.height =
            `${filled}px`;

          /* ====================================
             DOT ACTIVATION

             Same marker as the line.

             Therefore:
             line reaches dot center
                    ↓
             dot lights immediately
          ==================================== */

          let newestReached = -1;

          dotCenters.forEach(
            (dotCenter, index) => {
              if (
                marker >= dotCenter
              ) {
                newestReached = index;
              }
            }
          );

          setReachedIndex((previous) =>
            previous === newestReached
              ? previous
              : newestReached
          );

          const nextActiveIndex =
            Math.max(
              0,
              newestReached
            );

          setActiveIndex((previous) =>
            previous ===
            nextActiveIndex
              ? previous
              : nextActiveIndex
          );
        } finally {
          /*
            THIS WAS THE IMPORTANT BUG.

            React StrictMode runs effects
            twice during development.

            The old code cancelled the
            animation frame but left this
            ref non-null.

            Then every scroll returned
            immediately forever.
          */
          animationFrameRef.current =
            null;
        }
      });
  };

  /* ==================================================
     INITIAL MEASUREMENT
  ================================================== */

  useLayoutEffect(() => {
    measureTimeline();

    const frame =
      requestAnimationFrame(() => {
        measureTimeline();
        updateTimeline();
      });

    return () => {
      cancelAnimationFrame(frame);

      /*
        Also clear any pending timeline
        frame during StrictMode cleanup.
      */
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }
    };
  }, []);

  /* ==================================================
     SCROLL / RESIZE / IMAGE CHANGES
  ================================================== */

  useEffect(() => {
    const handleScroll = () => {
      updateTimeline();
    };

    const handleResize = () => {
      measureTimeline();
      updateTimeline();
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    /*
      Recalculate if the experience
      section changes size.
    */
    let resizeObserver;

    if (
      typeof ResizeObserver !==
        "undefined" &&
      listRef.current
    ) {
      resizeObserver =
        new ResizeObserver(() => {
          measureTimeline();
          updateTimeline();
        });

      resizeObserver.observe(
        listRef.current
      );
    }

    /*
      Recalculate after fonts load.
    */
    if (document.fonts?.ready) {
      document.fonts.ready.then(
        () => {
          measureTimeline();
          updateTimeline();
        }
      );
    }

    /*
      Recalculate when company
      photos/logos finish loading.
    */
    const images =
      listRef.current
        ? Array.from(
            listRef.current.querySelectorAll(
              "img"
            )
          )
        : [];

    const handleImageLoad = () => {
      measureTimeline();
      updateTimeline();
    };

    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener(
          "load",
          handleImageLoad
        );

        image.addEventListener(
          "error",
          handleImageLoad
        );
      }
    });

    /*
      Initial update.
    */
    measureTimeline();
    updateTimeline();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      images.forEach((image) => {
        image.removeEventListener(
          "load",
          handleImageLoad
        );

        image.removeEventListener(
          "error",
          handleImageLoad
        );
      });

      /*
        CRITICAL:
        cancel AND reset the ref.
      */
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }
    };
  }, []);

  /* ==================================================
     TIMELINE COLORS
  ================================================== */

  const gradientStops =
    timelineLayout.stops.length ===
    experiences.length
      ? experiences
          .map(
            (experience, index) =>
              `${experience.color} ${timelineLayout.stops[index]}%`
          )
          .join(", ")
      : experiences
          .map(
            (experience) =>
              experience.color
          )
          .join(", ");

  const timelineGradient = `
    linear-gradient(
      to bottom,
      ${gradientStops}
    )
  `;

  return (
    <section
      ref={sectionRef}
      className="experience-section section"
      id="experience"
      onMouseMove={handleMouseMove}
      style={{
        "--active-glow":
          experiences[
            activeIndex
          ].glow,

        "--timeline-gradient":
          timelineGradient,
      }}
    >
      {/* Cursor glow */}

      <div
        className="experience-cursor-glow"
        aria-hidden="true"
      />

      {/* Heading */}

      <div className="section-heading experience-heading">
        <p className="section-number">
          02
        </p>

        <div>
          <p className="eyebrow">
            WHERE I'VE WORKED
          </p>

          <h2>
            Experience
          </h2>
        </div>
      </div>

      {/* Timeline + cards */}

      <div
        ref={listRef}
        className="experience-list"
      >
        {/* Timeline */}

        <div
          className="experience-timeline"
          style={{
            top:
              `${timelineLayout.top}px`,

            height:
              `${timelineLayout.height}px`,
          }}
        >
          {/* Gray full line */}

          <div className="timeline-track" />

          {/* Colored moving line */}

          <div
            ref={progressRef}
            className="timeline-progress"
          />
        </div>

        {/* Experience entries */}

        {experiences.map(
          (experience, index) => (
            <div
              key={experience.id}
              className={`
                experience-row
                ${
                  index ===
                  activeIndex
                    ? "is-active"
                    : ""
                }
              `}
            >
              {/* Timeline dot */}

              <div className="timeline-dot-column">
                <div
                  ref={(element) => {
                    dotRefs.current[
                      index
                    ] = element;
                  }}
                  className={`
                    experience-dot
                    ${
                      index <=
                      reachedIndex
                        ? "is-reached"
                        : ""
                    }
                  `}
                  style={{
                    "--accent":
                      experience.color,
                  }}
                >
                  <div className="dot-center" />
                </div>
              </div>

              {/* Experience card */}

              <ExperienceCard
                experience={
                  experience
                }
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Experience;