import { useId } from "react";
import { ArrowHead, Doc, Svg } from "./kit";

const STAGES = [
  { n: "01", title: "PARSE", sub: "PYPDF · AI", value: "252", label: "PROJECTS" },
  { n: "02", title: "LOCATE", sub: "OSM LOOKUP", value: "173", label: "ON THE MAP" },
  { n: "03", title: "PAIR", sub: "≤ 25 MILES", value: "73", label: "PAIRS FOUND" },
  { n: "04", title: "RANK", sub: "SCORE 0–15", value: "35", label: "SAME YEARS" },
];
const BOX = { y: 98, w: 110, h: 66 };
const boxX = (i) => 24 + i * 134;

// Georgia Power (squares) west of the river, DESC (circles) east of it.
const WEST = [
  [62, 280], [110, 318], [80, 366], [160, 276], [190, 340],
  [140, 384], [230, 296], [242, 368], [204, 262],
];
const EAST = [
  [336, 280], [392, 262], [370, 330], [440, 306], [424, 376],
  [492, 350], [508, 276], [340, 388],
];
const WEST_LINES = [
  [0, 1], [1, 3], [1, 2], [2, 5], [5, 4], [4, 1],
  [3, 6], [6, 4], [6, 7], [7, 5], [3, 8], [8, 6],
];
const EAST_LINES = [
  [0, 1], [1, 3], [0, 2], [2, 3], [3, 6], [3, 5],
  [2, 4], [4, 5], [4, 7], [7, 2], [6, 1],
];
const RIVER = "M286 248 C 306 280, 262 310, 284 340 S 300 388, 278 404";

export const GridlockFigure = () => {
  const clipId = `map-${useId().replace(/:/g, "")}`;

  return (
    <Svg title="Gridlock pipeline: two utility PDFs are parsed, located, paired within 25 miles and ranked, producing a map of 73 nearby project pairs, 35 of which overlap in time.">
      <defs>
        <clipPath id={clipId}>
          <rect x="24" y="248" width="512" height="156" />
        </clipPath>
      </defs>

      {/* Inputs */}
      <Doc x={24} y={18} />
      <text x="62" y="32" className="t-title">DESC 2024–28</text>
      <text x="62" y="47" className="t-small t-muted">44 PROJECTS</text>
      <Doc x={210} y={18} />
      <text x="248" y="32" className="t-title">GEORGIA POWER 2025</text>
      <text x="248" y="47" className="t-small t-muted">208 PROJECTS</text>
      <text x="536" y="32" textAnchor="end" className="t-small t-muted">PUBLIC FILINGS ONLY</text>
      <text x="536" y="47" textAnchor="end" className="t-small t-muted">NO CEII DATA</text>

      <path d="M39 56V74H225V56" className="stroke flow" />
      <path d="M79 74V92" className="stroke flow" />
      <ArrowHead x={79} y={BOX.y} dir="down" />

      {/* Stages */}
      {STAGES.map((stage, i) => {
        const x = boxX(i);
        return (
          <g key={stage.n}>
            <rect x={x} y={BOX.y} width={BOX.w} height={BOX.h} className="stroke fill-raised" />
            <text x={x + 12} y={BOX.y + 20} className="t-small t-signal">{stage.n}</text>
            <text x={x + 12} y={BOX.y + 41} className="t-title">{stage.title}</text>
            <text x={x + 12} y={BOX.y + 56} className="t-small t-muted">{stage.sub}</text>

            {i < STAGES.length - 1 && (
              <>
                <line
                  x1={x + BOX.w}
                  y1={BOX.y + BOX.h / 2}
                  x2={boxX(i + 1) - 6}
                  y2={BOX.y + BOX.h / 2}
                  className="stroke flow"
                />
                <ArrowHead x={boxX(i + 1)} y={BOX.y + BOX.h / 2} />
              </>
            )}

            <line x1={x + 12} x2={x + 12} y1={BOX.y + BOX.h + 3} y2={BOX.y + BOX.h + 15} className="stroke-muted" />
            <text x={x + 10} y="203" className="t-big">{stage.value}</text>
            <text x={x + 12} y="219" className="t-small t-muted">{stage.label}</text>
          </g>
        );
      })}

      {/* Output map */}
      <text x="24" y="240" className="t-small">OUTPUT · OVERLAP MAP</text>
      <g className="t-small">
        <rect x="318" y="233" width="7" height="7" className="stroke fill-raised" />
        <text x="330" y="240" className="t-small t-muted">GA POWER</text>
        <circle cx="397" cy="236.5" r="3.8" className="stroke-blue fill-raised" />
        <text x="405" y="240" className="t-small t-muted">DESC</text>
        <line x1="443" x2="461" y1="236.5" y2="236.5" className="stroke-signal dashed" />
        <text x="466" y="240" className="t-small t-muted">SAME YEARS</text>
      </g>
      <rect x="24" y="248" width="512" height="156" className="stroke-muted fill-bg" />

      <g clipPath={`url(#${clipId})`}>
        <circle cx="242" cy="368" r="112" className="stroke-thin dotted" />
        <path d={RIVER} transform="translate(-3 0)" className="stroke-blue dim" />
        <path d={RIVER} transform="translate(3 0)" className="stroke-blue dim" />

        {WEST_LINES.map(([a, b]) => (
          <line key={`w${a}-${b}`} x1={WEST[a][0]} y1={WEST[a][1]} x2={WEST[b][0]} y2={WEST[b][1]} className="stroke-thin" />
        ))}
        {EAST_LINES.map(([a, b]) => (
          <line key={`e${a}-${b}`} x1={EAST[a][0]} y1={EAST[a][1]} x2={EAST[b][0]} y2={EAST[b][1]} className="stroke-blue dim" />
        ))}

        {/* A pair within range but in different years, then the strong pairs */}
        <line x1={WEST[7][0]} y1={WEST[7][1]} x2={EAST[2][0]} y2={EAST[2][1]} className="stroke-muted dashed" />
        <line x1={WEST[6][0]} y1={WEST[6][1]} x2={EAST[0][0]} y2={EAST[0][1]} className="stroke-signal dashed flow" />
        <line x1={WEST[7][0]} y1={WEST[7][1]} x2={EAST[7][0]} y2={EAST[7][1]} className="stroke-signal dashed flow" />

        {WEST.map(([x, y], i) => (
          <rect
            key={`wn${i}`}
            x={x - 3.5}
            y={y - 3.5}
            width="7"
            height="7"
            className={i === 6 || i === 7 ? "stroke-signal fill-raised" : "stroke fill-raised"}
          />
        ))}
        {EAST.map(([x, y], i) => (
          <circle
            key={`en${i}`}
            cx={x}
            cy={y}
            r="4"
            className={i === 0 || i === 7 ? "stroke-signal fill-raised" : "stroke-blue fill-raised"}
          />
        ))}

        <text x="303" y="300" transform="rotate(78 303 300)" className="t-small t-blue">SAVANNAH R.</text>
        <text x="278" y="370" className="t-small t-signal t-halo">#1</text>

        <line x1="36" x2="81" y1="392" y2="392" className="stroke" />
        <line x1="36" x2="36" y1="388" y2="396" className="stroke" />
        <line x1="81" x2="81" y1="388" y2="396" className="stroke" />
        <text x="88" y="395.5" className="t-small t-muted">10 MI</text>
      </g>
    </Svg>
  );
};
