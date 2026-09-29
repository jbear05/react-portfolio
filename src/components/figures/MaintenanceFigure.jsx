import { ArrowHead, Svg } from "./kit";
import { noise } from "./noise";

// Chart space: cycles 0–300 on x, health index 0–1 on y.
const X = (cycle) => 64 + cycle * (472 / 300);
const Y = (health) => 316 - health * 272;

const THRESHOLD = 0.2;
const FAILURE = 252;
const ALERT = FAILURE - 48;

const failing = (c) => (c < 90 ? 0.9 : 0.9 - 0.7 * ((c - 90) / 162) ** 2.3);
const healthy = (c) => 0.87 - 0.07 * (c / 300) ** 2;

const toPath = (points) =>
  points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");

const unitFailing = [];
for (let c = 0; c < FAILURE; c += 4) unitFailing.push([X(c), Y(failing(c) + noise(c) * 0.035)]);
unitFailing.push([X(FAILURE), Y(THRESHOLD)]);

const unitHealthy = [];
for (let c = 0; c <= 300; c += 4) unitHealthy.push([X(c), Y(healthy(c) + noise(c + 500) * 0.03)]);

const alertPoint = [X(ALERT), Y(failing(ALERT) + noise(ALERT) * 0.035)];
const failPoint = [X(FAILURE), Y(THRESHOLD)];

const PIPELINE = ["21 SENSORS", "197 FEATURES", "XGBOOST", "ALERT ≤ 48"];

export const MaintenanceFigure = () => (
  <Svg title="Chart of an engine's health index falling over 252 operating cycles until it crosses the failure threshold. The model raises an alert at cycle 204, 48 cycles before failure, while a healthy engine stays flat. Below: 21 sensors feed 197 features into an XGBoost model that raises the alert.">
    {/* Legend */}
    <line x1="64" x2="84" y1="26" y2="26" className="stroke" />
    <text x="90" y="29.5" className="t-small">UNIT 017</text>
    <line x1="160" x2="180" y1="26" y2="26" className="stroke-thin" />
    <text x="186" y="29.5" className="t-small t-muted">UNIT 041 · HEALTHY</text>

    {/* Grid and axes */}
    {[0.25, 0.5, 0.75, 1].map((v) => (
      <line key={v} x1="64" x2="536" y1={Y(v)} y2={Y(v)} className="stroke-muted dotted" />
    ))}
    {[100, 200, 300].map((c) => (
      <line key={c} x1={X(c)} x2={X(c)} y1="44" y2="316" className="stroke-muted dotted" />
    ))}
    <path d="M64 44V316H536" className="stroke" />
    {[
      [1, "1.0"],
      [0.5, "0.5"],
      [0, "0"],
    ].map(([v, label]) => (
      <text key={label} x="56" y={Y(v) + 3.5} textAnchor="end" className="t-small t-muted">
        {label}
      </text>
    ))}
    {[0, 100, 200, 300].map((c) => (
      <text key={c} x={X(c)} y="332" textAnchor="middle" className="t-small t-muted">
        {c}
      </text>
    ))}
    <text x="536" y="348" textAnchor="end" className="t-small t-muted">OPERATING CYCLES</text>
    <text x="22" y="180" textAnchor="middle" transform="rotate(-90 22 180)" className="t-small t-muted">
      HEALTH INDEX
    </text>

    {/* Warning window */}
    <g className="appear" style={{ "--delay": "1.6s" }}>
      <rect x={X(ALERT)} y="44" width={X(FAILURE) - X(ALERT)} height="272" className="fill-signal-soft" />
      <line x1={X(ALERT) + 7} x2={X(FAILURE) - 7} y1="64" y2="64" className="stroke-signal" />
      <ArrowHead x={X(ALERT) + 2} y={64} dir="left" className="fill-signal" />
      <ArrowHead x={X(FAILURE) - 2} y={64} dir="right" className="fill-signal" />
      <text x={(X(ALERT) + X(FAILURE)) / 2} y="57" textAnchor="middle" className="t-small t-signal">
        48 CYCLES
      </text>
      <line x1={X(ALERT)} x2={X(ALERT)} y1="44" y2="316" className="stroke-signal" />
      <text x={X(ALERT) - 7} y="304" textAnchor="end" className="t-small t-signal">
        ALERT · CYCLE {ALERT}
      </text>
    </g>

    {/* Threshold */}
    <line x1="64" x2="536" y1={Y(THRESHOLD)} y2={Y(THRESHOLD)} className="stroke dashed" />
    <text x="72" y={Y(THRESHOLD) - 7} className="t-small t-muted">FAILURE THRESHOLD</text>

    {/* Curves */}
    <path d={toPath(unitHealthy)} className="stroke-thin" />
    <path d={toPath(unitFailing)} pathLength="1" className="stroke draw" style={{ strokeWidth: 1.75 }} />

    <g className="appear" style={{ "--delay": "2s" }}>
      <rect
        x={alertPoint[0] - 5}
        y={alertPoint[1] - 5}
        width="10"
        height="10"
        transform={`rotate(45 ${alertPoint[0]} ${alertPoint[1]})`}
        className="fill-signal"
      />
      <path
        d={`M${failPoint[0] - 5} ${failPoint[1] - 5}l10 10m0 -10l-10 10`}
        className="stroke"
        style={{ strokeWidth: 2 }}
      />
      <text x={failPoint[0] + 9} y={failPoint[1] - 8} className="t-small">FAILURE</text>
    </g>

    {/* Model pipeline */}
    {PIPELINE.map((label, i) => {
      const x = 64 + i * 124;
      return (
        <g key={label}>
          <rect
            x={x}
            y="368"
            width="100"
            height="30"
            className={i === PIPELINE.length - 1 ? "stroke-signal fill-signal-soft" : "stroke fill-raised"}
          />
          <text x={x + 50} y="387" textAnchor="middle" className={i === PIPELINE.length - 1 ? "t-small t-signal" : "t-small"}>
            {label}
          </text>
          {i < PIPELINE.length - 1 && (
            <>
              <line x1={x + 100} x2={x + 118} y1="383" y2="383" className="stroke flow" />
              <ArrowHead x={x + 124} y={383} />
            </>
          )}
        </g>
      );
    })}
  </Svg>
);
