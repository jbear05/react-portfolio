// The hero's work graph: every role and project, wired to the tools it used.
// Items sit on the inner ring in this order (clockwise from the top), so keep
// items with similar stacks next to each other; each tool lands on the outer
// ring beside the items that use it. Labels are short because they're drawn
// on a canvas. Roles are always labeled; everything else is named when traced.

export const graph = [
  {
    label: "Coye Law Firm",
    kind: "role",
    tools: ["Next.js", "TypeScript", "Vercel", "FileMaker Pro", "Google Ads"],
  },
  { label: "This site", kind: "project", tools: ["React", "JavaScript", "Vercel"] },
  { label: "Forma", kind: "project", tools: ["TypeScript", "Node.js", "PostgreSQL", "Redis"] },
  { label: "KnightMarket", kind: "project", tools: ["Flutter", "Node.js", "MongoDB"] },
  { label: "Job Notifier", kind: "project", tools: ["JavaScript", "Claude API", "Chrome Extension"] },
  {
    label: "Gridlock",
    kind: "project",
    tools: ["Python", "Streamlit", "pandas", "Claude API", "Gemini API"],
  },
  {
    label: "Predictive Maintenance",
    kind: "project",
    tools: ["Python", "XGBoost", "scikit-learn", "pandas", "Streamlit"],
  },
  {
    label: "UCF IST",
    kind: "role",
    tools: ["Python", "XGBoost", "scikit-learn", "pandas"],
    projects: ["Predictive Maintenance"],
  },
  { label: "PokeLeveling", kind: "project", tools: ["Python", "Pygame"] },
  { label: "Recycle Scanner", kind: "project", tools: ["Python", "Kivy"] },
  { label: "FAST Enterprises", kind: "role", tools: ["SQL"] },
  { label: "Employee Scheduling", kind: "project", tools: ["Java", "Spring Boot", "React", "SQL"] },
  { label: "YourStocks", kind: "project", tools: ["Java", "Spring Boot"] },
  { label: "Colors Lab", kind: "project", tools: ["PHP", "MySQL", "JavaScript"] },
];

// The order the graph tours itself when nobody is pointing at it.
export const tour = [
  "Coye Law Firm",
  "FAST Enterprises",
  "UCF IST",
  "Job Notifier",
  "Employee Scheduling",
  "Gridlock",
  "Forma",
];
