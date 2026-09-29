import { useRef } from "react";
import { m, useScroll } from "framer-motion";
import { experience, leadership } from "../data/profile";
import { ArrowRight } from "./Icons";
import { SectionHeader } from "./SectionHeader";
import "./Experience.css";

// Renders **bold** spans from the data files as <strong>.
const Rich = ({ text }) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export const Experience = () => {
  const listRef = useRef(null);
  // The orange rail fills as the timeline scrolls past.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          number="01"
          label="Experience"
          id="experience-title"
          title={
            <>
              Two years from <code>git&nbsp;init</code> to production.
            </>
          }
          intro="I made my first commit at a hackathon in October 2024. Since then I've shipped code at three internships, from a research institute to a law firm's live website."
        />

        <div className="xp" ref={listRef}>
          <div className="xp__rail" aria-hidden="true">
            <m.div className="xp__current" style={{ scaleY: scrollYProgress }} />
          </div>

          <ol className="xp__list">
            {experience.map((job, i) => (
              <m.li
                key={job.id}
                id={job.id}
                className={`xp__item ${job.current ? "xp__item--current" : ""}`}
                {...reveal}
              >
                {/* Each role is a drawing revision: A is the oldest. */}
                <span className="xp__node mono" aria-hidden="true">
                  {String.fromCharCode(64 + experience.length - i)}
                </span>

                <div className="xp__when mono">
                  <span className="xp__dates">
                    {job.start} – {job.end}
                  </span>
                  <span className="xp__where">{job.location}</span>
                  {job.current && (
                    <span className="xp__now">
                      <span className="pulse-dot" aria-hidden="true" />
                      Current role
                    </span>
                  )}
                </div>

                <article className="xp__card" aria-labelledby={`${job.id}-title`}>
                  <header className="xp__head">
                    <h3 className="xp__company" id={`${job.id}-title`}>
                      {job.company}
                    </h3>
                    <p className="xp__role">{job.role}</p>
                  </header>

                  <ul className="xp__points">
                    {job.points.map((point) => (
                      <li key={point}>
                        <Rich text={point} />
                      </li>
                    ))}
                  </ul>

                  <div className="xp__foot">
                    <ul className="chips" aria-label="Tools and areas">
                      {job.stack.map((tool) => (
                        <li className="chip" key={tool}>
                          {tool}
                        </li>
                      ))}
                    </ul>
                    {job.project && (
                      <a className="xp__project mono" href={job.project.href}>
                        {job.project.label}
                        <ArrowRight />
                      </a>
                    )}
                  </div>
                </article>
              </m.li>
            ))}
          </ol>
        </div>

        <div className="lead">
          <h3 className="lead__title">Teaching and leadership</h3>
          <ul className="lead__grid">
            {leadership.map((item) => (
              <m.li key={item.org} className="lead__item" {...reveal}>
                <p className="lead__when mono">
                  {item.start} – {item.end} · {item.location}
                  {item.current && <span className="pulse-dot" aria-hidden="true" />}
                </p>
                <h4 className="lead__org">{item.org}</h4>
                <p className="lead__role">{item.role}</p>
                <p className="lead__summary">
                  <Rich text={item.summary} />
                </p>
              </m.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
