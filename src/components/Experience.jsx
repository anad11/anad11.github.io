import {
  useCallback,
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
  const dotCentersRef = useRef([]);
  const progressRef = useRef(null);

  const trailLayerRef = useRef(null);
  const lastCellRef = useRef(null);
  const activeTilesRef = useRef(new Map());
  const gridSizeRef = useRef(0);

  const animationFrameRef = useRef(null);
  const supportsScrollTimelineRef = useRef(
    typeof CSS !== "undefined" &&
      CSS.supports("animation-timeline: scroll(root block)") &&
      CSS.supports("animation-range-start: 0%") &&
      CSS.supports("animation-range-end: 100%")
  );

  const [timelineLayout, setTimelineLayout] =
    useState({
      top: 0,
      height: 0,
      stops: [],
      scrollStart: 0,
      scrollEnd: 100,
    });

  const reachedIndexRef = useRef(-1);

  /* ==================================================
     CURSOR GRID TRAIL
  ================================================== */

  const createTrailTile = (
    column,
    row,
    color,
    gridSize
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
      oldTile.remove();

      activeTilesRef.current.delete(key);
    }

    const tile =
      document.createElement("div");

    tile.className =
      "experience-trail-tile";

    tile.style.left =
      `${column * gridSize}px`;

    tile.style.top =
      `${row * gridSize}px`;

    tile.style.width = `${gridSize}px`;
    tile.style.height = `${gridSize}px`;

    tile.style.setProperty(
      "--tile-color",
      color
    );

    layer.appendChild(tile);

    tile.addEventListener("animationend", () => {
      tile.remove();

      if (activeTilesRef.current.get(key) === tile) {
        activeTilesRef.current.delete(key);
      }
    }, { once: true });

    activeTilesRef.current.set(key, tile);
  };

  const cacheGridSize = () => {
    const grid = sectionRef.current?.querySelector(".experience-grid");

    if (!grid) return;

    const columnCount = Number.parseFloat(
      window.getComputedStyle(document.documentElement)
        .getPropertyValue("--transition-columns")
    );

    const size =
      grid.getBoundingClientRect().width /
      (Number.isFinite(columnCount) && columnCount > 0
        ? columnCount
        : 40);

    if (Number.isFinite(size) && size > 0) {
      gridSizeRef.current = size;
    }
  };

  const handleMouseMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const section = sectionRef.current;

    if (!section) return;

    const gridSize = gridSizeRef.current;

    if (!Number.isFinite(gridSize) || gridSize <= 0) return;

    const rect = section.getBoundingClientRect();

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
      Math.floor(x / gridSize);

    const row =
      Math.floor(y / gridSize);

    const currentCell = {
      column,
      row,
    };

    const lastCell =
      lastCellRef.current;

    const currentColor =
      experiences[Math.max(0, reachedIndexRef.current)].color;

    /*
      First square.
    */
    if (!lastCell) {
      createTrailTile(
        column,
        row,
        currentColor,
        gridSize
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
        currentColor,
        gridSize
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

    const dotRects =
      dots.map((dot) => {
        const rect =
          dot.getBoundingClientRect();

        return rect;
      });

    const relativeCenters = dotRects.map(
      (rect) => rect.top - listRect.top + rect.height / 2
    );

    const absoluteCenters = dotRects.map(
      (rect) => rect.top + window.scrollY + rect.height / 2
    );
    dotCentersRef.current = absoluteCenters;

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

    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );

    const scrollRangeStart = Math.max(
      0,
      Math.min(
        maxScroll,
        absoluteCenters[0] - window.innerHeight * 0.5
      )
    );

    const scrollRangeEnd = Math.max(
      scrollRangeStart,
      Math.min(
        maxScroll,
        absoluteCenters[absoluteCenters.length - 1] -
          window.innerHeight * 0.5
      )
    );

    setTimelineLayout({
      top: first,
      height,
      stops,
      scrollStart: (scrollRangeStart / maxScroll) * 100,
      scrollEnd: (scrollRangeEnd / maxScroll) * 100,
    });
  };

  const updateReachedDots = useCallback((marker) => {
    const dotCenters = dotCentersRef.current;

    if (dotCenters.length !== experiences.length) {
      return -1;
    }

    let newestReached = -1;

    dotCenters.forEach((dotCenter, index) => {
      if (marker >= dotCenter) {
        newestReached = index;
      }
    });

    if (reachedIndexRef.current !== newestReached) {
      reachedIndexRef.current = newestReached;

      dotRefs.current.forEach((dot, index) => {
        dot?.classList.toggle(
          "is-reached",
          index <= newestReached
        );
      });
    }

    return newestReached;
  }, []);

  /* ==================================================
     UPDATE TIMELINE
  ================================================== */

  const updateTimeline = useCallback(() => {
    if (
      animationFrameRef.current !== null
    ) {
      return;
    }

    animationFrameRef.current =
      requestAnimationFrame(() => {
        try {
          const dotCenters = dotCentersRef.current;
          const progressBar =
            progressRef.current;

          if (
            dotCenters.length !==
              experiences.length ||
            !progressBar
          ) {
            return;
          }

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
            window.scrollY +
            window.innerHeight * 0.5;

          const filled =
            Math.max(
              0,
              Math.min(
                totalHeight,
                marker - first
              )
            );

          if (!supportsScrollTimelineRef.current) {
            const progress =
              totalHeight > 0
                ? filled / totalHeight
                : 0;

            const hiddenPercent =
              (1 - progress) * 100;

            progressBar.style.clipPath =
              `inset(0 0 ${hiddenPercent}% 0)`;
          }

          /* ==================================
             DOT ACTIVATION
          ================================== */

        } finally {
          animationFrameRef.current =
            null;
        }
      });
  }, []);

  /* ==================================================
     INITIAL LAYOUT
  ================================================== */

  useLayoutEffect(() => {
    cacheGridSize();
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
  }, [updateTimeline]);

  /* ==================================================
     EVENT LISTENERS
  ================================================== */

  useEffect(() => {
    const activeTiles = activeTilesRef.current;

    const handleResize = () => {
      cacheGridSize();
      measureTimeline();
      updateTimeline();
    };

    const handleScroll = () => {
      updateReachedDots(
        window.scrollY + window.innerHeight * 0.5
      );
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
        handleScroll
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
      activeTiles.forEach((tile) => tile.remove());

      activeTiles.clear();
    };
  }, [updateReachedDots, updateTimeline]);

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
      onMouseEnter={cacheGridSize}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--timeline-gradient":
          timelineGradient,
        "--timeline-range-start":
          `${timelineLayout.scrollStart}%`,
        "--timeline-range-end":
          `${timelineLayout.scrollEnd}%`,
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

        <div>

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
          >
            <div className="timeline-progress-fill" />
          </div>
        </div>

        {/* Cards */}

        {experiences.map(
          (experience, index) => (
            <div
              key={experience.id}
                className="experience-row"
            >
              <div className="timeline-dot-column">

                <div
                  ref={(element) => {
                    dotRefs.current[index] =
                      element;
                  }}
                  className="experience-dot"
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