// Drawing primitives shared by the project schematics. Colors come from
// classes in figures.css, so every figure follows the active theme.

const VIEW = { width: 560, height: 420 };

export const Svg = ({ title, children }) => (
  <svg
    className="fig"
    viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid meet"
  >
    {children}
  </svg>
);

// A filled triangle whose tip sits on (x, y).
export const ArrowHead = ({ x, y, dir = "right", className = "fill-ink" }) => {
  const s = 4.5;
  const points = {
    right: `${x},${y} ${x - s * 1.6},${y - s} ${x - s * 1.6},${y + s}`,
    left: `${x},${y} ${x + s * 1.6},${y - s} ${x + s * 1.6},${y + s}`,
    down: `${x},${y} ${x - s},${y - s * 1.6} ${x + s},${y - s * 1.6}`,
    up: `${x},${y} ${x - s},${y + s * 1.6} ${x + s},${y + s * 1.6}`,
  }[dir];
  return <polygon points={points} className={className} />;
};

// A document with a folded corner.
export const Doc = ({ x, y, w = 30, h = 38 }) => (
  <g>
    <path d={`M${x} ${y}h${w - 8}l8 8v${h - 8}h${-w}z`} className="stroke fill-raised" />
    <path d={`M${x + w - 8} ${y}v8h8`} className="stroke" />
    {[15, 21, 27].map((dy) => (
      <line key={dy} x1={x + 6} x2={x + w - 7} y1={y + dy} y2={y + dy} className="stroke-muted" />
    ))}
  </g>
);
