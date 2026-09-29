import { ArrowHead, Svg } from "./kit";

const FRIENDS = [
  { initial: "A", name: "Alex", tags: "PYTHON · BACKEND", score: 0.92 },
  { initial: "P", name: "Priya", tags: "REACT · FINTECH", score: 0.78 },
  { initial: "M", name: "Marcus", tags: "UX · RESEARCH", score: 0.41 },
];
const THRESHOLD = 0.6;
const CARD = { y: 236, w: 154, h: 124 };
const cardX = (i) => 24 + i * 179;
const BAR = 126;

const Step = ({ x, y, n, children }) => (
  <text x={x} y={y} className="t-small">
    <tspan className="t-signal">{n}</tspan>
    <tspan dx="6">{children}</tspan>
  </text>
);

export const JobNotifierFigure = () => (
  <Svg title="Job Notifier flow: a content script detects a job application confirmation page, sends the job text to Claude with a list of friends, and drafts messages for the friends who score above a 0.6 relevance threshold. Alex (0.92) and Priya (0.78) get drafts; Marcus (0.41) is skipped.">
    {/* Browser window */}
    <rect x="24" y="20" width="300" height="150" className="stroke fill-raised" />
    <line x1="24" x2="324" y1="44" y2="44" className="stroke-muted" />
    {[38, 50, 62].map((cx) => (
      <circle key={cx} cx={cx} cy="32" r="3.5" className="stroke-muted" />
    ))}
    <rect x="76" y="26" width="238" height="13" className="stroke-muted" />
    <text x="82" y="35.5" className="t-small t-muted">boards.greenhouse.io/…/confirmation</text>

    <circle cx="54" cy="78" r="12" className="stroke-signal" />
    <path d="M48 78.5l4 4 8-8.5" className="stroke-signal" />
    <text x="76" y="83" className="t-title">Application submitted</text>
    <text x="76" y="99" className="t-small t-muted">SOFTWARE ENGINEER INTERN</text>
    {[
      [118, 240],
      [130, 196],
      [142, 222],
    ].map(([y, w]) => (
      <rect key={y} x="42" y={y} width={w} height="5" className="fill-line" />
    ))}
    <g className="blink">
      <rect x="244" y="54" width="70" height="18" className="stroke-signal fill-signal-soft" />
      <text x="279" y="66.5" textAnchor="middle" className="t-small t-signal">DETECTED</text>
    </g>
    <Step x={24} y={190} n="01">CONTENT SCRIPT</Step>

    {/* To Claude */}
    <line x1="324" x2="377" y1="95" y2="95" className="stroke flow" />
    <ArrowHead x={383} y={95} />
    <text x="353" y="112" textAnchor="middle" className="t-small t-muted">JOB TEXT</text>

    <rect x="383" y="58" width="153" height="74" className="stroke fill-raised" />
    <text x="397" y="82" className="t-title">Claude</text>
    <text x="397" y="99" className="t-small t-muted">MATCH · SCORE · DRAFT</text>
    <text x="397" y="115" className="t-small t-blue">+ FRIENDS.JSON</text>
    <Step x={383} y={50} n="02">SERVICE WORKER</Step>

    {/* Fan out to friends */}
    <line x1="459.5" x2="459.5" y1="132" y2="206" className="stroke flow" />
    <line x1={cardX(0) + CARD.w / 2} x2="459.5" y1="206" y2="206" className="stroke flow" />
    {FRIENDS.map((friend, i) => {
      const cx = cardX(i) + CARD.w / 2;
      const ok = friend.score >= THRESHOLD;
      return ok ? (
        <g key={friend.name}>
          <line x1={cx} x2={cx} y1="206" y2={CARD.y - 6} className="stroke flow" />
          <ArrowHead x={cx} y={CARD.y} dir="down" />
        </g>
      ) : (
        <line key={friend.name} x1={cx} x2={cx} y1="206" y2={CARD.y} className="stroke-muted dashed" />
      );
    })}

    {FRIENDS.map((friend, i) => {
      const x = cardX(i);
      const y = CARD.y;
      const ok = friend.score >= THRESHOLD;
      return (
        <g key={friend.name} className={ok ? undefined : "dim"}>
          <rect
            x={x}
            y={y}
            width={CARD.w}
            height={CARD.h}
            className={ok ? "stroke fill-raised" : "stroke dashed fill-raised"}
          />
          <circle cx={x + 24} cy={y + 28} r="13" className="stroke" />
          <text x={x + 24} y={y + 32.5} textAnchor="middle" className="t-title">
            {friend.initial}
          </text>
          <text x={x + 46} y={y + 26} className="t-title">{friend.name}</text>
          <text x={x + 46} y={y + 41} className="t-small t-muted">{friend.tags}</text>

          <text x={x + 14} y={y + 70} className="t-small t-muted">MATCH</text>
          <text x={x + 14 + BAR} y={y + 70} textAnchor="end" className="t-small">
            {friend.score.toFixed(2)}
          </text>
          <rect x={x + 14} y={y + 78} width={BAR} height="6" className="fill-line" />
          <rect
            x={x + 14}
            y={y + 78}
            width={BAR * friend.score}
            height="6"
            className={ok ? "fill-signal" : "fill-muted"}
          />
          <line
            x1={x + 14 + BAR * THRESHOLD}
            x2={x + 14 + BAR * THRESHOLD}
            y1={y + 74}
            y2={y + 88}
            className="stroke"
          />
          <text x={x + 14} y={y + 108} className={ok ? "t-small t-signal" : "t-small t-muted"}>
            {ok ? "→ DRAFT READY" : `SKIPPED · < ${THRESHOLD}`}
          </text>
        </g>
      );
    })}

    <Step x={24} y={388} n="03">POPUP · REVIEW, EDIT, SEND IN ONE CLICK</Step>
  </Svg>
);
