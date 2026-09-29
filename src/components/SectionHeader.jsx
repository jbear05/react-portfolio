import { m } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const SectionHeader = ({ number, label, title, intro, id }) => (
  <m.header
    className="section-head"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    transition={{ staggerChildren: 0.08 }}
  >
    <div className="section-head__rule">
      <span className="mono section-head__num">§ {number}</span>
      <m.span
        className="section-head__line"
        aria-hidden="true"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] } },
        }}
      />
      <span className="mono">{label}</span>
    </div>
    <m.h2 className="section-head__title" id={id} variants={reveal}>
      {title}
    </m.h2>
    {intro && (
      <m.p className="section-head__intro" variants={reveal}>
        {intro}
      </m.p>
    )}
  </m.header>
);
