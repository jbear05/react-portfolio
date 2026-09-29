// Featured projects render as full "sheets" with a schematic figure.
// `figure` picks the diagram in components/figures; `screenshot` (optional)
// adds a second tab to that figure.

export const featured = [
  {
    id: "predictive-maintenance",
    title: "AI Predictive Maintenance",
    tagline: "Warns maintenance crews about an engine failure one to two weeks before it happens.",
    context: "UCF Institute for Simulation and Training",
    role: "Software Engineering Intern",
    date: "Dec 2025 – Jan 2026",
    summary:
      "Unplanned breakdowns are expensive and dangerous. During my internship at UCF's Institute for Simulation and Training, I built a system that learns what a healthy turbofan engine looks like from 21 sensors, then flags the units drifting toward failure early enough to schedule a repair instead of reacting to one.",
    built: [
      "A reproducible pipeline that downloads NASA's C-MAPSS run-to-failure data, cleans 150K+ sensor readings and engineers 150+ time-series features, including rolling averages, rates of change and drift from a healthy baseline.",
      "Baseline models and a grid-searched XGBoost classifier that flags engines 36–48 cycles before failure, validated in notebooks and exported with its scaler for inference.",
      "A Streamlit dashboard with fleet health, risk gauges and per-unit drill-downs. It runs fully offline, so it can live in air-gapped plants.",
    ],
    metrics: [
      { value: "85%+", label: "accuracy on NASA turbofan data" },
      { value: "36–48", label: "cycles of advance warning" },
      { value: "150+", label: "time-series features" },
    ],
    stack: ["Python", "XGBoost", "scikit-learn", "pandas", "NumPy", "Streamlit", "Plotly", "Jupyter"],
    links: [
      { label: "Source", href: "https://github.com/jbear05/ai-predictive-maintenance" },
    ],
    figure: "maintenance",
    figureCaption: "Engine health over time, and where the model raises its hand",
    screenshot: {
      src: "/projects/ai-predictive-maintenance.png",
      alt: "Streamlit dashboard with gauges for model confidence, fleet health score and risk level, and an alert that 4,958 units are at risk of failure within 48 cycles.",
    },
  },
  {
    id: "job-notifier",
    title: "Job Notifier",
    tagline: "Every job you apply to becomes a referral for a friend who'd fit it better.",
    context: "Personal project · Chrome extension",
    role: "Solo",
    date: "Jun – Jul 2026",
    summary:
      "When I apply to a role, I usually know someone else who should apply too, and then I forget to tell them. Job Notifier notices the confirmation page, figures out which friends match the role and writes each of them a message.",
    built: [
      "A Manifest V3 content script that detects application confirmation pages on LinkedIn, Greenhouse, Lever, Workday, Indeed and most other applicant tracking systems.",
      "A Claude-powered matcher that scores friends on skills, interests and experience level, and drops anyone under a relevance threshold.",
      "A popup with an editable draft per friend, send-all, copy, a manual paste mode and an on/off toggle.",
    ],
    metrics: [
      { value: "5+", label: "job boards auto-detected" },
      { value: "<1¢", label: "per analysis" },
      { value: "1 click", label: "to send each draft" },
    ],
    stack: ["JavaScript", "Chrome Extensions (MV3)", "Claude API", "HTML/CSS"],
    links: [{ label: "Source", href: "https://github.com/jbear05/job-notifier" }],
    figure: "jobNotifier",
    figureCaption: "From a confirmation page to drafted messages",
  },
  {
    id: "gridlock",
    title: "Gridlock",
    tagline:
      "Finds where two power companies plan to build near each other, at the same time.",
    context: "ShellHacks 2026 · Sperry Tech challenge",
    role: "Team of 4 · 14 of 19 PRs",
    date: "Sep 2026",
    summary:
      "Utilities publish their transmission plans as long PDF filings, each in its own format. When two neighbors plan work in the same place and the same years, they could share a corridor, crews and permits, but nobody reads both filings side by side. Gridlock does.",
    built: [
      "A regex parser for a 668-page utility filing (208 projects) that stops with an error when the layout changes, and flags the source's own contradictions instead of silently fixing them.",
      "An LLM PDF extractor (Claude or Gemini) that checks every value against its source page. It found all 252 projects with no errors in the rows marked verified, and the Gemini backend matched it on one filing at 64% lower cost.",
      "The Streamlit and pydeck interface, reworked into a five-step workflow (import, review, location check, ranked map, export) with snapshot save and restore.",
    ],
    metrics: [
      { value: "668", label: "page filing parsed" },
      { value: "252", label: "projects extracted" },
      { value: "73", label: "ranked opportunities" },
    ],
    stack: [
      "Python",
      "Streamlit",
      "pydeck",
      "pandas",
      "pypdf",
      "OpenStreetMap",
      "Claude API",
      "Gemini API",
      "pytest",
    ],
    links: [{ label: "Source", href: "https://github.com/jbear05/Shellhacks2026" }],
    figure: "gridlock",
    figureCaption: "Pipeline, from PDF filings to a ranked map",
  },
  {
    id: "employee-scheduling",
    title: "Employee Scheduling System",
    tagline: "Plan a week of shifts, assign people and print the schedule.",
    context: "Personal project · Full stack",
    role: "Solo",
    date: "Oct – Dec 2025",
    summary:
      "A scheduling tool for small teams, built as two separate apps: a Spring Boot REST API with a layered controller, service and repository design, and a React client that talks to it over Axios.",
    built: [
      "REST endpoints for employees, reusable shift templates and dated assignments, with DTOs, a global exception handler and CORS configuration.",
      "A weekly calendar grid with previous, next and today navigation, plus an assignment modal and print and export actions.",
      "Management pages to create, edit and delete employees with roles, and shift templates with time ranges and role requirements.",
    ],
    metrics: [
      { value: "17", label: "REST endpoints over 3 resources" },
      { value: "2", label: "independently deployable apps" },
      { value: "7-day", label: "calendar with week navigation" },
    ],
    stack: ["Java 21", "Spring Boot", "Spring Data JPA", "H2", "Maven", "React", "React Router", "Axios"],
    links: [
      { label: "Overview", href: "https://github.com/jbear05/EmployeeSchedulingSystem" },
      { label: "API", href: "https://github.com/jbear05/employee-scheduling-backend" },
      { label: "Client", href: "https://github.com/jbear05/employee-scheduling-frontend" },
    ],
    figure: "scheduling",
    figureCaption: "Two apps, one REST contract",
    screenshot: {
      src: "/projects/employee-scheduling-sys.png",
      alt: "The schedule page of the Employee Scheduling System showing the week of November 3 to 9, 2025, with a column for each day.",
    },
  },
];

// Everything else, newest first.
export const archive = [
  {
    year: "2026",
    title: "KnightMarket",
    note: "Marketplace app for UCF students with .edu verification, real-time chat and map-based meetups.",
    tag: "Team",
    stack: ["Flutter", "Node.js", "MongoDB", "Socket.IO"],
    href: "https://github.com/jbear05/ucfmarketplace",
  },
  {
    year: "2026",
    title: "Colors Lab",
    note: "COP 4331C LAMP-stack app: log in, then save and search colors through a PHP API.",
    tag: "Class",
    stack: ["PHP", "MySQL", "JavaScript", "DigitalOcean"],
    href: "https://github.com/jbear05/colors-lab",
  },
  {
    year: "2026",
    title: "Forma",
    note: "Backend for a workout app that scores exercise form from video, using job queues for processing.",
    tag: "In progress",
    stack: ["TypeScript", "Express", "Prisma", "PostgreSQL", "Redis"],
    href: "https://github.com/jbear05/forma-backend",
  },
  {
    year: "2025",
    title: "YourStocks",
    note: "Parts of your life (fitness, career) trade like stocks, and daily mood check-ins move the price.",
    tag: "Duo",
    stack: ["Java", "Spring Boot", "Spring Security", "JPA"],
    href: "https://github.com/jbear05/YourStocks",
  },
  {
    year: "2025",
    title: "PokeLeveling",
    note: "Pokémon-style RPG with procedurally generated maps, 12 hand-drawn biomes and a Windows installer.",
    tag: "Game",
    stack: ["Python", "Pygame", "Aseprite"],
    href: "https://github.com/jbear05/PokeLeveling",
    image: "/projects/poke-leveling.png",
  },
  {
    year: "2024",
    title: "Recycle Scanner",
    note: "PlutoHacks 2024: scan a product's barcode to see its packaging materials and how to recycle them.",
    tag: "Hackathon",
    stack: ["Python", "Kivy", "Open Food Facts API"],
    href: "https://github.com/jbear05/PlutoHacks2024",
  },
];
