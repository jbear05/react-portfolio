import { useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "./Icons";

// A compact index of smaller builds. Rows with an `image` show a preview
// that follows the cursor on devices that can hover.
export const ProjectArchive = ({ projects }) => {
  const bodyRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [canHover] = useState(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  const track = (event, project) => {
    if (!canHover || !project.image) {
      setPreview(null);
      return;
    }
    const bounds = bodyRef.current.getBoundingClientRect();
    setPreview({
      src: project.image,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  };

  return (
    <div className="archive">
      <div className="archive__head mono" aria-hidden="true">
        <span>Year</span>
        <span>Project</span>
        <span>What it is</span>
        <span>Built with</span>
        <span />
      </div>

      <div className="archive__body" ref={bodyRef} onMouseLeave={() => setPreview(null)}>
        <ul>
          {projects.map((project) => (
            <li key={project.title}>
              <a
                className="archive__row"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={(event) => track(event, project)}
                onMouseMove={(event) => track(event, project)}
              >
                <span className="archive__year mono">{project.year}</span>
                <span className="archive__title">
                  {project.title}
                  <span className="archive__tag mono">{project.tag}</span>
                </span>
                <span className="archive__note">{project.note}</span>
                <span className="archive__stack mono">{project.stack.join(" · ")}</span>
                <span className="archive__arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
                <span className="visually-hidden"> (source on GitHub, opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {preview && (
            <m.img
              key="preview"
              className="archive__preview"
              src={preview.src}
              alt=""
              initial={{ opacity: 0, scale: 0.92, x: preview.x + 24, y: preview.y - 90 }}
              animate={{ opacity: 1, scale: 1, x: preview.x + 24, y: preview.y - 90 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
