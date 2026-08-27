import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { experiences } from "../data/experience";
import ExperienceCard from "./ExperienceCard";
import "../styles/experience.css";

/*
  Must match the CSS grid size.
*/
const GRID_SIZE = 50;

/*
  How long a cursor square takes to disappear.
*/
const TILE_LIFETIME = 1000;

function Experience() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  const dotRefs = useRef([]);
  const progressRef = useRef(null);

  const trailLayerRef = useRef(null);
  const lastCellRef = useRef(null);
  const activeTilesRef = useRef(new Map());

  const animationFrameRef = useRef(null);

  const [timelineLayout, setTimelineLayout] =
    useState({
      top: 0,
      height: 0,
      stops: [],
    });

  const [reachedIndex, setReachedIndex] =
    useState(-1);

  const [activeIndex, setActiveIndex] =
    useState(0);

  /* ==================================================
     CURSOR GRID TRAIL
  ================================================== */

  const createTrailTile = (
    column,
    row,
    color
  ) => {
    const layer = trailLayerRef.current;

    if (!layer) return;

    const key = `${column}-${row}`;

    /*
      If the cursor returns to a square that
      is already fading, restart that square.
    */
    const oldTile =
      activeTilesRef.current.get(key);

    if (oldTile) {
      clearTimeout(oldTile.timeout);

      oldTile.element.remove();

      activeTilesRef.current.delete(key);
    }

    const tile =
      document.createElement("div");

    tile.className =
      "experience-trail-tile";

    tile.style.left =
      `${column * GRID_SIZE}px`;

    tile.style.top =
      `${row * GRID_SIZE}px`;

    tile.style.setProperty(
      "--tile-color",
      color
    );

    layer.appendChild(tile);

    /*
      Remove tile after its fade animation.
    */
    const timeout = setTimeout(() => {
      tile.remove();

      activeTilesRef.current.delete(
        key
      );
    }, TILE_LIFETIME);

    activeTilesRef.current.set(key, {
      element: tile,
      timeout,
    });
  };

  const handleMouseMove = (event) => {
    const section = sectionRef.current;

    if (!section) return;

    const rect =
      section.getBoundingClientRect();

    /*
      Mouse coordinates relative to the
      entire Experience section.
    */
    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    /*
      Snap cursor to grid.
    */
    const column =
      Math.floor(x / GRID_SIZE);

    const row =
      Math.floor(y / GRID_SIZE);

    const currentCell = {
      column,
      row,
    };

    const lastCell =
      lastCellRef.current;

    const currentColor =
      experiences[activeIndex].color;

    /*
      First square.
    */
    if (!lastCell) {
      createTrailTile(
        column,
        row,
        currentColor
      );

      lastCellRef.current =
        currentCell;

      return;
    }

    /*
      Cursor is still in the same square.
      Do nothing.
    */
    if (
      lastCell.column === column &&
      lastCell.row === row
    ) {
      return;
    }

    /*
      Fill intermediate squares if the
      cursor moves quickly.

      This prevents gaps in the trail.
    */
    const deltaColumn =
      column - lastCell.column;

    const deltaRow =
      row - lastCell.row;

    const steps = Math.max(
      Math.abs(deltaColumn),
      Math.abs(deltaRow)
    );

    for (
      let step = 1;
      step <= steps;
      step++
    ) {
      const progress =
        step / steps;

      const interpolatedColumn =
        Math.round(
          lastCell.column +
            deltaColumn * progress
        );

      const interpolatedRow =
        Math.round(
          lastCell.row +
            deltaRow * progress
        );

      createTrailTile(
        interpolatedColumn,
        interpolatedRow,
        currentColor
      );
    }

    lastCellRef.current =
      currentCell;
  };

  const handleMouseLeave = () => {
    /*
      Allows a new trail to begin naturally
      when the cursor re-enters.
    */
    lastCellRef.current = null;
  };

  /* ==================================================
     MEASURE TIMELINE
  ================================================== */

  const measureTimeline = () => {
    const list =
      listRef.current;

    const dots =
      dotRefs.current.filter(Boolean);

    if (
      !list ||
      dots.length !== experiences.length
    ) {
      return;
    }

    const listRect =
      list.getBoundingClientRect();

    const relativeCenters =
      dots.map((dot) => {
        const rect =
          dot.getBoundingClientRect();

        return (
          rect.top -
          listRect.top +
          rect.height / 2
        );
      });

    const first =
      relativeCenters[0];

    const last =
      relativeCenters[
        relativeCenters.length - 1
      ];

    const height =
      Math.max(
        0,
        last - first
      );

    const stops =
      relativeCenters.map(
        (position) => {
          if (height === 0) {
            return 0;
          }

          return (
            ((position - first) /
              height) *
            100
          );
        }
      );

    setTimelineLayout({
      top: first,
      height,
      stops,
    });
  };

  /* ==================================================
     UPDATE TIMELINE
  ================================================== */

  const updateTimeline = () => {
    if (
      animationFrameRef.current !== null
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

          const dotCenters =
            dots.map((dot) => {
              const rect =
                dot.getBoundingClientRect();

              return (
                rect.top +
                rect.height / 2
              );
            });

          const first =
            dotCenters[0];

          const last =
            dotCenters[
              dotCenters.length - 1
            ];

          const totalHeight =
            Math.max(
              0,
              last - first
            );

          /*
            Middle of screen determines
            timeline progress.
          */
          const marker =
            window.innerHeight * 0.5;

          const filled =
            Math.max(
              0,
              Math.min(
                totalHeight,
                marker - first
              )
            );

          /*
            IMPORTANT:

            Keep gradient full-height and
            reveal it using clip-path.

            This keeps colors aligned
            with their timeline dots.
          */
          const progress =
            totalHeight > 0
              ? filled /
                totalHeight
              : 0;

          const hiddenPercent =
            (1 - progress) * 100;

          progressBar.style.clipPath =
            `inset(0 0 ${hiddenPercent}% 0)`;

          /* ==================================
             DOT ACTIVATION
          ================================== */

          let newestReached =
            -1;

          dotCenters.forEach(
            (dotCenter, index) => {
              if (
                marker >= dotCenter
              ) {
                newestReached =
                  index;
              }
            }
          );

          setReachedIndex(
            newestReached
          );

          setActiveIndex(
            Math.max(
              0,
              newestReached
            )
          );
        } finally {
          animationFrameRef.current =
            null;
        }
      });
  };

  /* ==================================================
     INITIAL LAYOUT
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
     EVENT LISTENERS
  ================================================== */

  useEffect(() => {
    const handleResize = () => {
      measureTimeline();
      updateTimeline();
    };

    window.addEventListener(
      "scroll",
      updateTimeline,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

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

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        measureTimeline();
        updateTimeline();
      });
    }

    measureTimeline();
    updateTimeline();

    return () => {
      window.removeEventListener(
        "scroll",
        updateTimeline
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

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

      /*
        Clean up cursor tiles.
      */
      activeTilesRef.current.forEach(
        ({ element, timeout }) => {
          clearTimeout(timeout);
          element.remove();
        }
      );

      activeTilesRef.current.clear();
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
      onMouseLeave={handleMouseLeave}
      style={{
        "--timeline-gradient":
          timelineGradient,

        "--grid-size":
          `${GRID_SIZE}px`,
      }}
    >
      {/* ========================================
          GRID BACKGROUND
      ======================================== */}

      <div
        className="experience-grid"
        aria-hidden="true"
      />

      {/* Colored cursor squares */}

      <div
        ref={trailLayerRef}
        className="experience-grid-trail"
        aria-hidden="true"
      />

      {/* ========================================
          HEADING
      ======================================== */}

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

      {/* ========================================
          EXPERIENCE LIST
      ======================================== */}

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
          <div className="timeline-track" />

          <div
            ref={progressRef}
            className="timeline-progress"
          />
        </div>

        {/* Cards */}

        {experiences.map(
          (experience, index) => (
            <div
              key={experience.id}
              className={`
                experience-row
                ${
                  index === activeIndex
                    ? "is-active"
                    : ""
                }
              `}
            >
              <div className="timeline-dot-column">

                <div
                  ref={(element) => {
                    dotRefs.current[index] =
                      element;
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

              <ExperienceCard
                experience={experience}
              />

            </div>
          )
        )}

      </div>
    </section>
  );
}

export default Experience;