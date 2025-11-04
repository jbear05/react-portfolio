import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>
      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.a
          href = "https://github.com/jbear05/EmployeeSchedulingSystem"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
          style={{ textDecoration: 'none', color: 'inherit' }}
          
        >
          <motion.div
            className="project-image"
            style={{
              backgroundImage: "url('/projects/employee-scheduling-sys.png')",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <h3>Employee Scheduling System</h3>
          <p>
            A full-stack web application for managing employees, shifts, and assignments. Built with Spring Boot and React.
          </p>
          <div className="project-tech">
            <span>React js</span>
            <span>SpringBoot Java</span>
            <span>H2/PostgreSQL Database</span>
          </div>
        </motion.a>

        <motion.a
          href = "https://github.com/jbear05/PokeLeveling"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
          style={{ textDecoration: 'none', color: 'inherit' }}
          
        >
          <motion.div
            className="project-image"
            style={{
              backgroundImage: "url('/projects/poke-leveling.png')",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <h3>PokeLeveling</h3>
          <p>
            Pokemon game. Random map generates different areas for a new experience every playthrough/level. Catch them all and face the legendary pokemon!
          </p>
          <div className="project-tech">
            <span>Python</span>
            <span>Pygame</span>
          </div>
        </motion.a>
      </motion.div>
    </motion.section>
  );
};
