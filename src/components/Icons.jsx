// Inline icons, so the site doesn't need an icon font.
// Stroke icons inherit currentColor; brand marks are filled.

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": true,
  focusable: false,
};

export const ArrowRight = (props) => (
  <svg viewBox="0 0 16 16" className="arrow-right" {...stroke} {...props}>
    <path d="M2 8h11M9 4l4 4-4 4" />
  </svg>
);

export const ArrowDown = (props) => (
  <svg viewBox="0 0 16 16" className="arrow-down" {...stroke} {...props}>
    <path d="M8 2v11M4 9l4 4 4-4" />
  </svg>
);

export const ArrowUp = (props) => (
  <svg viewBox="0 0 16 16" className="arrow-up" {...stroke} {...props}>
    <path d="M8 14V3M4 7l4-4 4 4" />
  </svg>
);

export const ArrowUpRight = (props) => (
  <svg viewBox="0 0 16 16" className="arrow-up-right" {...stroke} {...props}>
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
  </svg>
);

export const Sun = (props) => (
  <svg viewBox="0 0 20 20" {...stroke} {...props}>
    <circle cx="10" cy="10" r="3.5" />
    <path d="M10 1.5v2.5M10 16v2.5M1.5 10H4M16 10h2.5M4 4l1.8 1.8M14.2 14.2L16 16M4 16l1.8-1.8M14.2 5.8L16 4" />
  </svg>
);

export const Moon = (props) => (
  <svg viewBox="0 0 20 20" {...stroke} {...props}>
    <path d="M16.5 12.3A7 7 0 0 1 7.7 3.5a7 7 0 1 0 8.8 8.8z" />
  </svg>
);

export const Menu = (props) => (
  <svg viewBox="0 0 20 20" {...stroke} {...props}>
    <path d="M3 6h14M3 10h14M3 14h14" />
  </svg>
);

export const Close = (props) => (
  <svg viewBox="0 0 20 20" {...stroke} {...props}>
    <path d="M4.5 4.5l11 11M15.5 4.5l-11 11" />
  </svg>
);

export const GitHub = (props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const LinkedIn = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
