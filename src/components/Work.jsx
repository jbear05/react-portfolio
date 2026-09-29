import { archive, featured } from "../data/projects";
import { ProjectArchive } from "./ProjectArchive";
import { ProjectSheet } from "./ProjectSheet";
import { SectionHeader } from "./SectionHeader";
import "./Work.css";

export const Work = () => (
  <section id="work" className="section work" aria-labelledby="work-title">
    <div className="container">
      <SectionHeader
        number="02"
        label="Selected projects"
        id="work-title"
        title="Things I've built, and how they work."
        intro="Four projects I'm proud of, from an internship, a hackathon and my own time. Each sheet covers the problem, what I built, what came out the other end and a schematic of how the pieces fit together."
      />

      <div className="work__sheets">
        {featured.map((project, index) => (
          <ProjectSheet
            key={project.id}
            project={project}
            index={index}
            total={featured.length}
          />
        ))}
      </div>

      <div className="work__more">
        <div className="work__more-head">
          <h3 className="work__more-title">Other builds</h3>
          <p className="work__more-intro">
            Team projects, class projects, experiments and a few first attempts. Every
            row links to its source.
          </p>
        </div>
        <ProjectArchive projects={archive} />
      </div>
    </div>
  </section>
);
