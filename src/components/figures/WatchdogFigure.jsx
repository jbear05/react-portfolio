import { ArrowHead, Svg } from "./kit";

// Mission M014 from the challenge data: the robot reported COMPLETED, but
// three of its ten steps failed and two findings need a person.
const STEPS = [
  { wp: "WP05", ok: true },
  { wp: "WP09", ok: false },
  { wp: "WP06", ok: false },
  { wp: "WP06", ok: false },
  { wp: "WP13", ok: true },
  { wp: "WP07", ok: true },
  { wp: "WP01", ok: true },
  { wp: "WP09", ok: true },
  { wp: "WP15", ok: true },
  { wp: "WP02", ok: true },
];
const ROUTE = { y: 96, x0: 44, gap: 52.5 };
const stepX = (i) => ROUTE.x0 + i * ROUTE.gap;

const STATS = [
  { value: "3", label: "FAILED STEPS" },
  { value: "2", label: "SERIOUS FINDINGS" },
  { value: "2", label: "AWAITING REVIEW" },
];

const PROBLEMS = [
  {
    rank: "#1",
    asset: "HX-217 Heat Exchanger",
    where: "WP06 COMPRESSOR · GAUGE OUT OF RANGE",
    priority: "HIGH × CRITICAL = 12",
  },
  {
    rank: "#2",
    asset: "PANEL-212 Electrical Panel",
    where: "WP09 TURBINE HALL · GAUGE OUT OF RANGE",
    priority: "HIGH × HIGH = 9",
  },
];
const ROW = { y: 290, h: 54, gap: 8 };
const ACTIONS = ["DISPATCH", "WATCH", "DISMISS"];

export const WatchdogFigure = () => (
  <Svg title="Watchdog reading mission M014: the robot reported the route as completed, but three of its ten steps failed. Watchdog flags it as completed with issues and ranks two findings for the operator, each with dispatch, watch and dismiss buttons.">
    {/* What the robot reports */}
    <text x="24" y="30" className="t-small t-muted">ROBOT REPORT</text>
    <text x="24" y="48" className="t-title">M014 · Autowalk Route 14</text>
    <text x="24" y="63" className="t-small t-muted">26 MIN · BATTERY 68% → 22%</text>
    <rect x="410" y="30" width="126" height="26" className="stroke fill-raised" />
    <text x="473" y="47" textAnchor="middle" className="t-small">STATUS: COMPLETED</text>

    {/* The route, step by step */}
    <line x1={stepX(0)} x2={stepX(STEPS.length - 1)} y1={ROUTE.y} y2={ROUTE.y} className="stroke-muted" />
    {STEPS.map((step, i) => {
      const x = stepX(i);
      return (
        <g key={i}>
          {step.ok ? (
            <circle cx={x} cy={ROUTE.y} r="6" className="stroke fill-raised" />
          ) : (
            <g>
              <circle cx={x} cy={ROUTE.y} r="8" className="stroke-signal fill-signal-soft" />
              <path d={`M${x - 3.5} ${ROUTE.y - 3.5}l7 7m0 -7l-7 7`} className="stroke-signal" />
            </g>
          )}
          <text x={x} y={ROUTE.y + 24} textAnchor="middle" className={step.ok ? "t-small t-muted" : "t-small t-signal"}>
            {step.wp}
          </text>
        </g>
      );
    })}
    <text x="24" y={ROUTE.y - 18} className="t-small t-muted">10 STEPS ON THE ROUTE</text>

    {/* Watchdog reads every step */}
    <line x1="280" x2="280" y1="128" y2="146" className="stroke flow" />
    <ArrowHead x={280} y={152} dir="down" />
    <rect x="24" y="152" width="512" height="44" className="stroke fill-raised" />
    <text x="38" y="171" className="t-title">Watchdog</text>
    <text x="38" y="186" className="t-small t-muted">READS EVERY STEP, READING AND FINDING</text>
    <g className="blink">
      <rect x="346" y="163" width="178" height="22" className="stroke-signal fill-signal-soft" />
      <text x="435" y="178" textAnchor="middle" className="t-small t-signal">COMPLETED WITH ISSUES</text>
    </g>

    {STATS.map((stat, i) => {
      const x = 24 + i * 176;
      return (
        <g key={stat.label}>
          <line x1={x + 2} x2={x + 2} y1="200" y2="212" className="stroke-muted" />
          <text x={x} y="240" className="t-big">{stat.value}</text>
          <text x={x + 24} y="239" className="t-small t-muted">{stat.label}</text>
        </g>
      );
    })}

    {/* What the operator sees first */}
    <text x="24" y="276" className="t-small">NEEDS A DECISION FIRST · SEVERITY × CRITICALITY</text>
    {PROBLEMS.map((problem, i) => {
      const y = ROW.y + i * (ROW.h + ROW.gap);
      return (
        <g key={problem.rank} className={i ? "dim" : undefined}>
          <rect x="24" y={y} width="512" height={ROW.h} className={i ? "stroke-muted fill-raised" : "stroke fill-raised"} />
          <text x="36" y={y + 22} className="t-small t-signal">{problem.rank}</text>
          <text x="62" y={y + 22} className="t-title">{problem.asset}</text>
          <text x="62" y={y + 40} className="t-small t-muted">{problem.where}</text>
          <text x="524" y={y + 18} textAnchor="end" className="t-small">{problem.priority}</text>
          {ACTIONS.map((action, j) => {
            const bx = 338 + j * 64;
            return (
              <g key={action}>
                <rect x={bx} y={y + 28} width="58" height="17" className={j === 0 && !i ? "stroke fill-signal-soft" : "stroke-muted"} />
                <text x={bx + 29} y={y + 40} textAnchor="middle" className="t-small">{action}</text>
              </g>
            );
          })}
        </g>
      );
    })}
  </Svg>
);
