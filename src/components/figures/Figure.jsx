import { useId, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Marks } from "../Marks";
import { GridlockFigure } from "./GridlockFigure";
import { MaintenanceFigure } from "./MaintenanceFigure";
import { JobNotifierFigure } from "./JobNotifierFigure";
import { SchedulingFigure } from "./SchedulingFigure";
import "./figures.css";

const DIAGRAMS = {
  gridlock: GridlockFigure,
  maintenance: MaintenanceFigure,
  jobNotifier: JobNotifierFigure,
  scheduling: SchedulingFigure,
};

// A framed figure plate. Diagrams draw in the first time they scroll into
// view, and their looping animations only run while they're on screen.
// Projects with a screenshot get a second tab.
export const Figure = ({ number, type, caption, screenshot }) => {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  const onScreen = useInView(ref);
  const [tab, setTab] = useState("schematic");
  const baseId = useId();
  const Diagram = DIAGRAMS[type];
  const tabs = screenshot ? ["schematic", "screenshot"] : null;

  return (
    <figure
      ref={ref}
      className={`figure ${seen ? "is-inview" : ""} ${onScreen ? "is-playing" : ""}`}
    >
      <Marks />
      <div className="figure__bar">
        <span className="mono figure__num">Fig. {number}</span>
        {tabs ? (
          <div className="figure__tabs" role="tablist" aria-label="Figure view">
            {tabs.map((name) => (
              <button
                key={name}
                type="button"
                role="tab"
                id={`${baseId}-${name}-tab`}
                aria-selected={tab === name}
                aria-controls={`${baseId}-panel`}
                className="figure__tab mono"
                onClick={() => setTab(name)}
              >
                {name}
              </button>
            ))}
          </div>
        ) : (
          <span className="mono figure__kind">Schematic</span>
        )}
      </div>

      <div
        className={`figure__body figure__body--${tab}`}
        id={`${baseId}-panel`}
        role={tabs ? "tabpanel" : undefined}
        aria-labelledby={tabs ? `${baseId}-${tab}-tab` : undefined}
      >
        {tab === "screenshot" && screenshot ? (
          <img src={screenshot.src} alt={screenshot.alt} loading="lazy" decoding="async" />
        ) : (
          <div className="figure__scroll">
            <Diagram />
          </div>
        )}
      </div>

      <figcaption className="figure__caption">
        <span className="mono">{caption}</span>
        {tab === "schematic" && (
          <span className="figure__hint mono" aria-hidden="true">
            Swipe to pan →
          </span>
        )}
      </figcaption>
    </figure>
  );
};
