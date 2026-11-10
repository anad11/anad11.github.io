import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

import "./App.css";
import "lenis/dist/lenis.css";

import Projects from "./components/Projects";
import Experience from "./components/Experience";


/* ==================================================
   PROJECTS → EXPERIENCE TRANSITION
================================================== */

const TRANSITION_COLUMNS = 40;
const TRANSITION_ROWS = 5;


/*
  Each cube itself is ONE solid color.
  Colors brighten toward Experience.
*/

const transitionColors = [
  "#0f2654",
  "#416dbe",
  "#76a3e8",
  "#b4ccee",
  "#dae5f3",
];

const transitionDensity = [
  0.06,
  0.14,
  0.30,
  0.52,
  0.82,
];


/*
  Small floating cubes at top.
  Full-size cubes at bottom.
*/

const transitionScale = [
  0.28,
  0.40,
  0.55,
  0.72,
  0.90
];


/*
  Create one fixed 40 × 6 lattice.

  Invisible cells stay in the grid,
  so spacing NEVER changes.
*/

const transitionCubes = Array.from(
  {
    length:
      TRANSITION_COLUMNS *
      TRANSITION_ROWS,
  },

  (_, index) => {

    const row = Math.floor(
      index / TRANSITION_COLUMNS
    );

    const column =
      index % TRANSITION_COLUMNS;


    /*
      Stable pseudo-random distribution.
      Doesn't change when React rerenders.
    */

    const value =
      (
        column * 37 +
        row * 61 +
        column * row * 11 +
        17
      ) % 100;


    const visible =
      value <
        transitionDensity[row] * 100;


    return {
      row,
      visible,
    };
  }
);



function App() {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (time) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      anchors: { offset: -80 },
      respectReducedMotion: true,
    });

    lenisRef.current = lenis;

    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");

    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setNavbarScrolled(!entry.isIntersecting);
        hero.classList.toggle(
          "hero-offscreen",
          !entry.isIntersecting
        );
      },
      {
        rootMargin: "-72px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);


  return (

    <div className="site">


      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header
        className={
          navbarScrolled
            ? "navbar navbar-scrolled"
            : "navbar"
        }
      >

        <a
          href="#home"
          className="nav-logo"
        >
          AD
        </a>


        <nav className="nav-links">

          <a href="#projects">
            Projects
          </a>

          <a href="#experience">
            Experience
          </a>

          <a href="#contact">
            Contact
          </a>

        </nav>

      </header>



      <main>


        {/* ==================================================
            HERO
        ================================================== */}

        <section
          className="hero"
          id="home"
        >

          <div
            className="hero-background"
            aria-hidden="true"
          >

            {/* ==================================================
                WAVES
            ================================================== */}

            <div className="hero-waves">


              {/* LIGHT BLUE */}

              <svg
                className="
                  hero-wave
                  hero-wave-back
                "
                viewBox="0 0 1600 260"
                preserveAspectRatio="none"
              >

                <path
                  d="
                    M -100 140

                    C 0 100,
                      70 80,
                      150 115

                    C 230 150,
                      290 170,
                      365 130

                    C 440 90,
                      500 85,
                      570 120

                    C 640 155,
                      700 170,
                      770 130

                    C 840 90,
                      900 75,
                      970 115

                    C 1040 155,
                      1100 175,
                      1170 135

                    C 1240 95,
                      1300 85,
                      1375 120

                    C 1450 155,
                      1510 150,
                      1700 105

                    L 1700 260
                    L -100 260
                    Z
                  "
                />

              </svg>



              {/* MEDIUM BLUE */}

              <svg
                className="
                  hero-wave
                  hero-wave-middle
                "
                viewBox="0 0 1600 260"
                preserveAspectRatio="none"
              >

                <path
                  d="
                    M -100 165

                    C -10 120,
                      60 115,
                      125 155

                    C 190 195,
                      250 190,
                      315 145

                    C 380 100,
                      450 105,
                      515 150

                    C 580 195,
                      645 190,
                      710 145

                    C 775 100,
                      840 100,
                      905 150

                    C 970 200,
                      1035 190,
                      1100 140

                    C 1165 90,
                      1235 105,
                      1300 150

                    C 1365 195,
                      1430 185,
                      1500 145

                    C 1570 105,
                      1620 120,
                      1700 150

                    L 1700 260
                    L -100 260
                    Z
                  "
                />

              </svg>



              {/* DARK BLUE */}

              <svg
                className="
                  hero-wave
                  hero-wave-front
                "
                viewBox="0 0 1600 260"
                preserveAspectRatio="none"
              >

                <path
                  d="
                    M -100 190

                    C -20 150,
                      35 145,
                      95 180

                    C 155 215,
                      215 210,
                      275 175

                    C 335 140,
                      395 145,
                      455 185

                    C 515 225,
                      575 210,
                      635 170

                    C 695 130,
                      755 140,
                      815 185

                    C 875 230,
                      935 210,
                      995 170

                    C 1055 130,
                      1115 140,
                      1175 180

                    C 1235 220,
                      1295 215,
                      1355 175

                    C 1415 135,
                      1480 140,
                      1540 180

                    C 1600 220,
                      1650 205,
                      1700 175

                    L 1700 260
                    L -100 260
                    Z
                  "
                />

              </svg>



              {/* FINAL NAVY WAVE */}

              <svg
                className="
                  hero-wave
                  hero-wave-transition
                "
                viewBox="0 0 1600 260"
                preserveAspectRatio="none"
              >

                <path
                  d="
                    M -100 228

                    C 20 203,
                      110 205,
                      200 225

                    C 290 245,
                      360 243,
                      440 218

                    C 520 193,
                      600 198,
                      680 227

                    C 760 256,
                      840 248,
                      920 217

                    C 1000 186,
                      1080 197,
                      1160 228

                    C 1240 259,
                      1320 248,
                      1400 220

                    C 1480 192,
                      1570 198,
                      1700 220

                    L 1700 260
                    L -100 260
                    Z
                  "
                />

              </svg>

            </div>

          </div>



          {/* ==================================================
              HERO CONTENT
          ================================================== */}

          <div className="hero-layout">


            {/* LEFT */}

            <div className="hero-copy">

              <h1 className="hero-title">

                <span>
                  ANA
                </span>

                <span>
                  DIMITRIEVSKA
                </span>

              </h1>


              <p className="hero-description">
                 I'm a third-year Mechatronics Engineering student 
                 at the University of Waterloo, passionate about 
                 building robotics and automation systems across 
                 software, controls, and mechanical design.
              </p>


              <div className="hero-actions">

                <a
                  href="#projects"
                  className="
                    hero-button
                    hero-button-primary
                  "
                >
                  View Projects
                </a>


                <a
                  href="#experience"
                  className="
                    hero-button
                    hero-button-secondary
                  "
                >
                  Experience
                </a>

              </div>

            </div>



            {/* RIGHT */}

            <div className="hero-visual">

              <div className="hero-photo-frame">

                <img
                  src="/images/herophoto.png"
                  alt="Ana Dimitrievska"
                  className="hero-photo"
                  fetchPriority="high"
                />

              </div>

            </div>

          </div>

        </section>



        {/* ==================================================
            PROJECTS
        ================================================== */}

        <Projects lenisRef={lenisRef} />



        {/* ==================================================
            PROJECTS → EXPERIENCE
        ================================================== */}

        <div
          className="projects-experience-transition"
          aria-hidden="true"
        >

          <div className="transition-background-grid" />


          <div className="transition-cube-grid">

            {transitionCubes.map(
              (cube, index) => (

                <span
                  key={index}

                  className={
                    cube.visible
                      ? "transition-cube is-visible"
                      : "transition-cube"
                  }

                  style={{
                    "--cube-color":
                      transitionColors[
                        cube.row
                      ],

                    "--cube-scale":
                      transitionScale[
                        cube.row
                      ],
                  }}
                />

              )
            )}

          </div>

        </div>



        {/* ==================================================
            EXPERIENCE
        ================================================== */}

        <Experience />

      </main>



      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer
        className="footer"
        id="contact"
      >
        <div className="footer-contact">
          <p className="footer-eyebrow">CONTACT</p>
          <h2>Let’s connect.</h2>
          <p className="footer-intro">
            I’m interested in opportunities across robotics, automation, and engineering.
          </p>

          <div className="footer-contact-links">
            <a href="mailto:a3dimitr@uwaterloo.ca">
              a3dimitr@uwaterloo.ca
            </a>
            <a
              href="https://www.linkedin.com/in/ana-dimitrievska/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="footer-downloads">
            <a
              className="footer-download-button"
              href="/Documents/Ana_Dimitrievska_Resume.pdf"
              download="Ana-Dimitrievska-Resume.pdf"
              onClick={() => window.plausible?.("Resume Download")}
            >
              Download Resume <span aria-hidden="true">↓</span>
            </a>
            <a
              className="footer-download-button footer-download-secondary"
              href="/Documents/Ana_Dimitrievska_Portfolio.pdf"
              download="Ana-Dimitrievska-Portfolio.pdf"
              onClick={() => window.plausible?.("Portfolio Download")}
            >
              Download Portfolio <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <a href="#home">Back to top ↑</a>
        </div>

      </footer>

    </div>

  );
}


export default App;