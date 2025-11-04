import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

export const Hero = () => {
  return (
    <motion.section
      id="home"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="hero-badge">
            <span> 👋 Hello, I'm </span>
          </motion.div>
          <motion.h1
            className="glitch"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            Jair Garcia Fonseca
          </motion.h1>
          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            {" "}
            Software Engineer
          </motion.h2>
          <motion.p className="hero-description" variants={fadeInUp}>
            My name is Jair Garcia Fonseca, and I am a Computer Science student passionate about software development and technology. I’m currently pursuing my Bachelor's degree at the University of Central Florida and have gained hands-on experience in programming languages like Python, Java, C, Javascript, and HTML/CSS. Through my projects, such as building an Employee Scheduling app using SpringBoot Java and React JavaScript, I’ve strengthened my technical and problem-solving skills. I’m also actively involved in communities like CodePath and KnightHacks, where I collaborate with others to grow my knowledge and contribute to meaningful projects.
          </motion.p>

          <motion.div className="cta-buttons" variants={staggerContainer}>
            <motion.a
              href="#projects"
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {" "}
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
          <motion.div className="social-links" variants={staggerContainer}>
            <motion.a href="https://github.com/jbear05" target="_blank">
              <i className="fab fa-github"> </i>
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/jair-garcia-fonseca/" target="_blank">
              <i className="fab fa-linkedin"> </i>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="code-display">
            <SyntaxHighlighter
              language="python"
              customStyle={{
                margin: 0,
                padding: "2rem",
                height: "100%",
                borderRadius: "20px",
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(10px)",
                marginBottom: 50,
              }}
              style={vscDarkPlus}
            >
              {`class DeveloperProfile:
  codename = "JairGarciaFonseca"
  origin = "🏝️ Cuba"
  role = "Software Engineer"
  stack = {
    "languages" : ["Python", "Java", "JavaScript", "C", "HTML", "CSS"],
    "frameworks" : ["SpringBoot", "React"]
  }
  traits = [
    "hardworking problem solver",
    "API whisperer",
    "team player",
    "lifelong learner"
  ]
  `}
            </SyntaxHighlighter>
          </div>

          <motion.div
            className="floating-card"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-content">
              <span className="card-icon"> 💻 </span>
              <span className="card-text">
                {" "}
                Currently working on something awesome!
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
