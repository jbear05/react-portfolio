// Everything personal on the site lives here, so updating the copy never
// means digging through components.

export const profile = {
  name: "Jair Garcia Fonseca",
  role: "Software Engineer",
  location: "Orlando, FL",
  coords: "28.60° N · 81.20° W",
  timeZone: "America/New_York",
  status: "Open to SWE internships",
  links: {
    github: "https://github.com/jbear05",
    linkedin: "https://www.linkedin.com/in/jair-garcia-fonseca/",
  },
  now: {
    label: "Software Developer Intern at Coye Law Firm",
    href: "#experience",
  },
};

// Professional experience, newest first. Wrap a phrase in **double
// asterisks** to set it in bold (used for the numbers that matter).
export const experience = [
  {
    id: "coye-law-firm",
    company: "Coye Law Firm",
    role: "Software Developer Intern",
    location: "Orlando, FL",
    start: "Aug 2026",
    end: "Present",
    current: true,
    points: [
      "Rebuilt lead attribution and conversion tracking on the firm's site, splitting guide requests, clicks, inquiries and bookings into separate events, and stopped a Calendly widget from recording a booking every time it opened instead of when an appointment was confirmed.",
      "Built ad-click attribution for the firm's Next.js site: Google Ads click IDs and campaign details are saved in a **90-day** first-party cookie and attached to leads from **4 intake forms**, so ad spend maps to real inquiries.",
      "Ran the firm's first technical SEO cycle: added **7** missing pages, removed **2** broken URLs and inaccurate update dates, verified all **46** pages were crawlable and indexable, and set a baseline for measurement.",
      "Remediated a vulnerable image-processing dependency by upgrading the production Next.js/TypeScript app, which runs on Vercel backed by FileMaker Pro over REST.",
    ],
    stack: ["Next.js", "TypeScript", "Vercel", "FileMaker Pro", "Google Ads", "Search Console"],
  },
  {
    id: "fast-enterprises",
    company: "FAST Enterprises",
    role: "Software Implementation Intern",
    location: "Philadelphia, PA",
    start: "May 2026",
    end: "Aug 2026",
    points: [
      "Cleared a backlog of **100+** errored Use & Occupancy non-filer cases that were blocking closure: wrote SQL queries to diagnose the root causes, then found a reusable codebase object to close the cases in bulk instead of one by one.",
      "Saved city staff **2+ hours** of manual work a day by tracing and fixing inverted created-from and closed-to date filters in a report generator they relied on for case oversight.",
      "Replaced manual confirmations for **1,000+** monthly real-estate bulk-edit file submissions with automated emails sent the moment a file arrives.",
    ],
    stack: ["SQL", "Case management", "Reporting", "Workflow automation"],
  },
  {
    id: "ucf-ist",
    company: "UCF Institute for Simulation and Training",
    role: "Software Engineering Intern",
    location: "Orlando, FL",
    start: "Dec 2025",
    end: "Jan 2026",
    points: [
      "Built a machine learning pipeline with XGBoost and scikit-learn that predicts equipment failures **36–48 cycles** in advance, with **85%+** accuracy on NASA's turbofan dataset (**150K+** sensor readings).",
      "Engineered **150+** time-series features, including rolling averages, rates of change and drift from a healthy baseline, to capture degradation in raw sensor streams.",
    ],
    stack: ["Python", "XGBoost", "scikit-learn", "pandas", "Streamlit"],
    project: { label: "See the project sheet", href: "#predictive-maintenance" },
  },
];

export const leadership = [
  {
    org: "UCF Student Academic Resource Center",
    role: "Computer Science Peer Tutor",
    location: "Orlando, FL",
    start: "Jan 2026",
    end: "Present",
    current: true,
    summary:
      "I tutor students in Computer Science 1 and Object-Oriented Programming in Java across **4+** weekly sessions, helping with debugging, algorithmic problem solving and OOP concepts.",
  },
  {
    org: "CodePath",
    role: "Tech Fellow",
    location: "Remote",
    start: "May 2025",
    end: "May 2026",
    summary:
      "I supported CodePath's technical curriculum by facilitating sessions and mentoring students through coding challenges and interview prep.",
  },
];

export const about = {
  paragraphs: [
    "I'm Jair, a computer science student at the University of Central Florida, graduating in July 2027. I was born in Cuba, and I've been building software since my first hackathon in 2024, which is also where I learned git.",
    "Since then I've interned at three very different places: a research institute, a government-software company and a law firm, where I work on the production website today. The common thread is taking something messy, like raw sensor streams, a backlog of broken cases or ad clicks nobody could trace, and turning it into something people can rely on.",
    "I also tutor Computer Science 1 and Object-Oriented Programming at UCF, and I spent a year as a CodePath Tech Fellow. Next, I'm looking for a software engineering internship on a team that cares about building things right.",
  ],
  facts: [
    { label: "Based in", value: "Orlando, Florida" },
    { label: "From", value: "Cuba" },
    { label: "Studying", value: "B.S. Computer Science, University of Central Florida" },
    { label: "Graduating", value: "July 2027" },
    { label: "Honors", value: "Dean's List · 3.72 GPA" },
    { label: "Hackathons", value: "PlutoHacks 2024, ShellHacks 2026" },
    { label: "Speaks", value: "English, Español" },
  ],
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Operating Systems",
    "Database Concepts",
    "Artificial Intelligence",
    "Security in Computing",
    "Web Development",
    "Mobile Development",
    "System Design",
  ],
  toolbox: [
    {
      group: "Languages",
      items: ["Python", "Java", "TypeScript", "JavaScript", "SQL", "C", "C#", "PHP", "HTML/CSS"],
    },
    {
      group: "Web & backend",
      items: ["Next.js", "React", "Spring Boot", "Node.js", "Express", "REST APIs"],
    },
    {
      group: "Data & ML",
      items: ["pandas", "NumPy", "scikit-learn", "XGBoost", "Streamlit", "Jupyter"],
    },
    {
      group: "Databases",
      items: ["PostgreSQL", "MySQL", "FileMaker Pro", "Prisma"],
    },
    {
      group: "AI tools",
      items: ["Claude API", "Gemini API", "Claude Code", "Codex"],
    },
    {
      group: "Platforms",
      items: ["Git & GitHub", "Vercel", "DigitalOcean", "Postman", "Google Ads", "Search Console"],
    },
  ],
};
