import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import "./App.css";

import Projects from "./components/Projects";
import Experience from "./components/Experience";

function App() {
  /* ==========================================
     SMOOTH SCROLLING
  ========================================== */

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,

      /*
        Lower = floatier
        Higher = more responsive
      */
      lerp: 0.12,

      wheelMultiplier: 0.9,

      /*
        Allows navigation links like
        #projects and #experience to
        scroll smoothly.
      */
      anchors: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="site">

      {/* ======================================
          NAVIGATION
      ====================================== */}

      <header className="navbar">
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


      {/* ======================================
          MAIN PAGE
      ====================================== */}

      <main>

        {/* ====================================
            HERO
        ==================================== */}

        <section
          className="hero section"
          id="home"
        >
          <div className="hero-content">

            <p className="eyebrow">
              MECHATRONICS ENGINEERING
            </p>

            <h1>
              ANA
              <br />
              DIMITRIEVSKA
            </h1>

            <p className="hero-description">
              I build robotics, automation,
              and engineering systems across
              software, mechanical design,
              and computer vision.
            </p>

            <div className="hero-links">

              <a
                href="#projects"
                className="primary-button"
              >
                View Projects
              </a>

              <a
                href="#experience"
                className="secondary-button"
              >
                Experience
              </a>

            </div>

          </div>


          {/* Decorative hero background */}

          <div
            className="hero-decoration"
            aria-hidden="true"
          >
            <div className="hero-orb hero-orb-one" />

            <div className="hero-orb hero-orb-two" />

            <div className="hero-grid" />
          </div>

        </section>


        {/* ====================================
            PROJECTS
        ==================================== */}

        <Projects />


        {/* ====================================
            EXPERIENCE
        ==================================== */}

        <Experience />

      </main>


      {/* ======================================
          FOOTER
      ====================================== */}

      <footer
        className="footer"
        id="contact"
      >
        <div>

          <p className="eyebrow">
            GET IN TOUCH
          </p>

          <h2>
            Let's connect.
          </h2>

        </div>


        <div className="footer-links">

          <a
            href="mailto:YOUR_EMAIL_HERE"
          >
            Email
          </a>

          <a
            href="YOUR_LINKEDIN_HERE"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="YOUR_GITHUB_HERE"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

        </div>


        <p className="footer-name">
          © 2026 Ana Dimitrievska
        </p>

      </footer>

    </div>
  );
}

export default App;