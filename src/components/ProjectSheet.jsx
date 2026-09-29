import { m } from "framer-motion";
import { Figure } from "./figures/Figure";
import { ArrowUpRight } from "./Icons";
import { Marks } from "./Marks";

const pad = (n) => String(n).padStart(2, "0");

export const ProjectSheet = ({ project, index, total }) => {
  const titleId = `${project.id}-title`;

  return (
    <m.article
      id={project.id}
      className={`sheet ${index % 2 ? "sheet--flip" : ""}`}
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Marks />
      <header className="sheet__bar mono">
        <span className="sheet__index">
          Sheet {pad(index + 1)} / {pad(total)}
        </span>
        <span>{project.context}</span>
        <span>{project.role}</span>
        <span>{project.date}</span>
      </header>

      <div className="sheet__grid">
        <div className="sheet__intro">
          <h3 className="sheet__title" id={titleId}>
            {project.title}
          </h3>
          <p className="sheet__tagline">{project.tagline}</p>
        </div>

        <div className="sheet__figure">
          <Figure
            number={`${index + 1}.1`}
            type={project.figure}
            caption={project.figureCaption}
            screenshot={project.screenshot}
          />
        </div>

        <div className="sheet__body">
          <p className="sheet__summary">{project.summary}</p>

          <h4 className="sheet__label mono">What I built</h4>
          <ol className="sheet__built">
            {project.built.map((item, i) => (
              <li key={item}>
                <span className="mono" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ol>

          <dl className="sheet__metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="mono">{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>

          <h4 className="visually-hidden">Built with</h4>
          <ul className="chips">
            {project.stack.map((tool) => (
              <li className="chip" key={tool}>
                {tool}
              </li>
            ))}
          </ul>

          <div className="sheet__links">
            {project.links.map((link) => (
              <a
                key={link.href}
                className="btn btn--small"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <span className="visually-hidden"> for {project.title} (opens in a new tab)</span>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>
      </div>
    </m.article>
  );
};
