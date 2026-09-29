import { ArrowHead, Svg } from "./kit";

const DAYS = ["MON 3", "TUE 4", "WED 5", "THU 6", "FRI 7", "SAT 8", "SUN 9"];
const COL = 512 / 7;
const SLOTS = [238, 284, 330];

// [day, slot, shift, hours + employee, isBeingAssigned]
const SHIFTS = [
  [0, 0, "OPEN", "7–3 ANA"],
  [0, 1, "CLOSE", "3–11 LEO"],
  [1, 0, "OPEN", "7–3 SAM"],
  [1, 2, "NIGHT", "11–7 KAI"],
  [2, 0, "OPEN", "7–3 ANA"],
  [2, 1, "MID", "11–7 RIA"],
  [2, 2, "CLOSE", "3–11 LEO"],
  [3, 0, "OPEN", "7–3 SAM"],
  [3, 1, "MID", "+ ASSIGN", true],
  [4, 0, "OPEN", "7–3 KAI"],
  [4, 1, "CLOSE", "3–11 RIA"],
  [5, 1, "MID", "11–7 ANA"],
];

const Column = ({ x, heading, items, itemClass = "" }) => (
  <g>
    <text x={x} y="138" className="t-small t-muted">{heading}</text>
    {items.map((item, i) => (
      <text key={item} x={x} y={152 + i * 14} className={`t-small ${itemClass}`}>
        {item}
      </text>
    ))}
  </g>
);

export const SchedulingFigure = () => (
  <Svg title="Employee Scheduling System architecture: a React client calls a Spring Boot API over REST, and the API's controller, service and repository layers persist employees, shifts and assignments through JPA to H2, with PostgreSQL planned. Below, a weekly calendar grid for November 3 to 9 with shifts assigned to employees.">
    {/* Client */}
    <rect x="24" y="24" width="150" height="88" className="stroke fill-raised" />
    <text x="38" y="46" className="t-title">React client</text>
    <text x="38" y="64" className="t-small t-muted">VITE · ROUTER</text>
    <text x="38" y="78" className="t-small t-muted">AXIOS · DATE-FNS</text>
    <text x="38" y="98" className="t-small t-blue">3 PAGES</text>

    {/* API */}
    <rect x="205" y="24" width="150" height="88" className="stroke fill-raised" />
    <text x="219" y="46" className="t-title">Spring Boot API</text>
    {["CONTROLLER", "SERVICE", "REPOSITORY"].map((layer, i) => (
      <g key={layer}>
        <rect x="219" y={55 + i * 17} width="122" height="13" className="stroke-blue fill-blue-soft" />
        <text x="280" y={64.5 + i * 17} textAnchor="middle" className="t-small">
          {layer}
        </text>
      </g>
    ))}

    {/* Database */}
    <rect x="386" y="24" width="150" height="88" className="stroke fill-raised" />
    <path d="M427 42v38a34 8 0 0 0 68 0V42" className="stroke fill-raised" />
    <ellipse cx="461" cy="42" rx="34" ry="8" className="stroke fill-raised" />
    <path d="M427 58a34 8 0 0 0 68 0" className="stroke-muted" />
    <text x="461" y="104" textAnchor="middle" className="t-small">H2 → POSTGRES</text>

    {/* Wires */}
    <line x1="180" x2="199" y1="68" y2="68" className="stroke flow" />
    <ArrowHead x={174} y={68} dir="left" />
    <ArrowHead x={205} y={68} />
    <text x="189.5" y="60" textAnchor="middle" className="t-small t-muted">REST</text>
    <line x1="361" x2="380" y1="68" y2="68" className="stroke flow" />
    <ArrowHead x={355} y={68} dir="left" />
    <ArrowHead x={386} y={68} />
    <text x="370.5" y="60" textAnchor="middle" className="t-small t-muted">JPA</text>

    <Column x={24} heading="PAGES" items={["SCHEDULE", "EMPLOYEES", "SHIFTS"]} />
    <Column x={205} heading="ROUTES" itemClass="t-blue" items={["/employees", "/shifts", "/assignments"]} />
    <Column x={386} heading="ENTITIES" items={["EMPLOYEE", "SHIFT", "ASSIGNMENT"]} />
    <text x="355" y="138" textAnchor="end" className="t-small t-muted">17 TOTAL</text>

    {/* Week view */}
    <text x="24" y="204" className="t-small">WEEK 45 · NOV 3–9, 2025</text>
    <text x="536" y="204" textAnchor="end" className="t-small t-muted">‹ PREV · TODAY · NEXT ›</text>
    <rect x="24" y="212" width="512" height="194" className="stroke-muted fill-bg" />
    <line x1="24" x2="536" y1="232" y2="232" className="stroke-muted" />
    {DAYS.map((day, i) => (
      <g key={day}>
        {i > 0 && <line x1={24 + i * COL} x2={24 + i * COL} y1="212" y2="406" className="stroke-muted" />}
        <text x={24 + i * COL + COL / 2} y="226" textAnchor="middle" className="t-small">
          {day}
        </text>
        <circle cx={24 + i * COL + COL / 2} cy="390" r="7" className="stroke-muted" />
        <path
          d={`M${24 + i * COL + COL / 2 - 3} 390h6M${24 + i * COL + COL / 2} 387v6`}
          className="stroke-muted"
        />
      </g>
    ))}

    {SHIFTS.map(([day, slot, name, detail, assigning]) => {
      const x = 24 + day * COL + 5;
      const y = SLOTS[slot];
      return (
        <g key={`${day}-${slot}`} className={assigning ? "blink" : undefined}>
          <rect
            x={x}
            y={y}
            width={COL - 10}
            height="40"
            className={assigning ? "stroke-signal dashed fill-signal-soft" : "stroke-blue fill-blue-soft"}
          />
          <text x={x + 6} y={y + 16} className="t-small" style={{ fontWeight: 600 }}>
            {name}
          </text>
          <text x={x + 6} y={y + 30} className={assigning ? "t-small t-signal" : "t-small t-muted"}>
            {detail}
          </text>
        </g>
      );
    })}
    <text x={24 + 6 * COL + COL / 2} y="262" textAnchor="middle" className="t-small t-muted">
      NO SHIFTS
    </text>
  </Svg>
);
