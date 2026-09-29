import { m } from "framer-motion";
import { REVISION } from "../data/build";
import { profile } from "../data/profile";
import { useClock } from "../hooks/useClock";
import { ArrowDown, ArrowRight, GitHub, LinkedIn } from "./Icons";
import { WorkGraph } from "./WorkGraph";
import "./Hero.css";

const ease = [0.22, 1, 0.36, 1];
const rise = {
  hidden: { y: "108%" },
  visible: { y: "0%", transition: { duration: 1.05, ease } },
};
const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const Hero = ({ theme }) => {
  const time = useClock(profile.timeZone);
  const city = profile.location.split(",")[0];

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <WorkGraph theme={theme} className="hero__canvas" />

      <m.div
        className="hero__inner container"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
      >
        <m.dl className="hero__meta mono" variants={fade}>
          <div>
            <dt>Sheet</dt>
            <dd>00 / Index</dd>
          </div>
          <div>
            <dt>Rev</dt>
            <dd>{REVISION}</dd>
          </div>
          <div className="hero__meta-coords">
            <dt className="visually-hidden">Coordinates</dt>
            <dd>{profile.coords}</dd>
          </div>
          <div>
            <dt>{city}</dt>
            <dd>{time}</dd>
          </div>
        </m.dl>

        <div className="hero__body">
          <div className="hero__text">
            <m.p className="hero__status mono" variants={fade}>
              <span className="pulse-dot" aria-hidden="true" />
              {profile.status}
            </m.p>

            <h1 className="hero__name" id="hero-title">
              <span className="hero__line">
                <m.span variants={rise}>Jair</m.span>
              </span>{" "}
              <span className="hero__line">
                <m.span variants={rise}>Garcia</m.span>
              </span>{" "}
              <span className="hero__line">
                <m.span variants={rise}>Fonseca</m.span>
              </span>
            </h1>

            <m.p className="hero__lede" variants={fade}>
              <strong>Software engineer and CS student at UCF.</strong> Three
              internships in, I build software that turns messy, real-world
              data into decisions, from predicting jet-engine failures to tying
              a law firm’s ad spend to real clients.
            </m.p>

            <m.div className="hero__actions" variants={fade}>
              <a className="btn btn--primary" href="#experience">
                See my work <ArrowDown />
              </a>
              <a className="btn" href="#contact">
                Get in touch <ArrowRight />
              </a>
              <div className="hero__social">
                <a
                  className="icon-btn"
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub (opens in a new tab)"
                  title="GitHub"
                >
                  <GitHub />
                </a>
                <a
                  className="icon-btn"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn (opens in a new tab)"
                  title="LinkedIn"
                >
                  <LinkedIn />
                </a>
              </div>
            </m.div>
          </div>

          {/* Open space the work graph measures and draws into. */}
          <div className="hero__graph-space" aria-hidden="true" />
        </div>

        <m.div className="hero__foot" variants={fade}>
          <a className="hero__latest" href={profile.now.href}>
            <span className="mono hero__latest-tag">Now</span>
            <span className="hero__latest-label">{profile.now.label}</span>
            <ArrowRight />
          </a>

          <div className="hero__legend mono">
            <p className="hero__legend-title">Fig. 01 — Work graph</p>
            <ul className="hero__keys">
              <li>
                <i className="key key--role" aria-hidden="true" />
                Role
              </li>
              <li>
                <i className="key key--project" aria-hidden="true" />
                Project
              </li>
              <li>
                <i className="key key--tool" aria-hidden="true" />
                Tool
              </li>
            </ul>
            <p className="hero__hint hero__hint--mouse">Hover a node to trace it</p>
            <p className="hero__hint hero__hint--touch">Tap a node to trace it</p>
          </div>
        </m.div>
      </m.div>
    </section>
  );
};
