import { useEffect } from "react";
import Lenis from "lenis";

import "./App.css";
import Experience from "./components/Experience";

function App() {
  /* ==========================================
     SMOOTH PAGE SCROLLING
  ========================================== */

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,

      /*
        Controls how quickly scrolling catches up.

        Smaller = softer / floatier
        Larger = faster / more responsive

        0.15 is a good middle ground.
      */
      lerp: 0.10,

      /*
        Smooth mouse-wheel scrolling.
      */
      smoothWheel: true,

      /*
        1 = normal wheel distance
        Below 1 = slightly slower
        Above 1 = faster
      */
      wheelMultiplier: 0.9,
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

          <div className="hero-decoration">

            <div className="hero-orb hero-orb-one" />

            <div className="hero-orb hero-orb-two" />

            <div className="hero-grid" />

          </div>

        </section>


        {/* ====================================
            PROJECTS
        ==================================== */}

        <section
          className="projects section"
          id="projects"
        >

          <div className="section-heading">

            <p className="section-number">
              01
            </p>

            <div>

              <p className="eyebrow">
                SELECTED WORK
              </p>

              <h2>
                Projects
              </h2>

            </div>

          </div>


          {/*
            Temporary placeholder.

            We will replace this with the
            colorful expandable project cards.
          */}

          <div className="placeholder-panel">

            <p>
              Projects section
            </p>

            <span>
              This will become the colorful,
              rounded project layout with
              expandable project cards.
            </span>

          </div>

        </section>


        {/* ====================================
            EXPERIENCE
        ==================================== */}

        <Experience />

      </main>


      {/* ======================================
          FOOTER / CONTACT
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