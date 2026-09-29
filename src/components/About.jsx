import { m } from "framer-motion";
import { about } from "../data/profile";
import { Marks } from "./Marks";
import { SectionHeader } from "./SectionHeader";
import "./About.css";

const pad = (n) => String(n).padStart(2, "0");
const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export const About = () => (
  <section id="about" className="section about" aria-labelledby="about-title">
    <div className="container">
      <SectionHeader number="03" label="About" id="about-title" title="Hi, I'm Jair." />

      <div className="about__grid">
        <div className="about__bio">
          {about.paragraphs.map((paragraph, i) => (
            <m.p
              key={paragraph}
              className={i === 0 ? "about__lead" : undefined}
              {...rise}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {paragraph}
            </m.p>
          ))}
        </div>

        <m.aside
          className="about__side"
          aria-label="Quick facts"
          {...rise}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <figure className="portrait">
            <Marks />
            <img
              src="/jair.jpg"
              alt="Portrait of Jair Garcia Fonseca"
              width="460"
              height="460"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="mono">Fig. 02 — The author, for scale</figcaption>
          </figure>

          <div className="about__facts">
            <dl className="spec">
              {about.facts.map((fact) => (
                <div className="spec__row" key={fact.label}>
                  <dt className="mono">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="about__courses-title mono">Relevant coursework</h3>
            <ul className="chips">
              {about.coursework.map((course) => (
                <li className="chip" key={course}>
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </m.aside>
      </div>

      <div className="bom">
        <div className="bom__head">
          <h3 className="bom__title">Bill of materials</h3>
          <p className="bom__intro">The tools I reach for, grouped the way I think about them.</p>
        </div>
        <div className="bom__grid">
          {about.toolbox.map((group, gi) => (
            <m.div
              className="bom__group"
              key={group.group}
              {...rise}
              transition={{ duration: 0.6, delay: (gi % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className="bom__group-title mono">
                <span>{pad(gi + 1)}</span>
                {group.group}
              </h4>
              <ul>
                {group.items.map((item, i) => (
                  <li key={item}>
                    <span className="mono" aria-hidden="true">
                      {gi + 1}.{i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
