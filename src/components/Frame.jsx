const COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const ROWS = ["1", "2", "3", "4", "5", "6"];

// The border and zone markers of an engineering drawing, fixed to the
// viewport so the page scrolls underneath it. Desktop only (see base.css).
export const Frame = () => (
  <div className="frame" aria-hidden="true">
    <div className="frame__zones frame__zones--top">
      {COLUMNS.map((zone) => (
        <span key={zone}>{zone}</span>
      ))}
    </div>
    <div className="frame__zones frame__zones--bottom">
      {COLUMNS.map((zone) => (
        <span key={zone}>{zone}</span>
      ))}
    </div>
    <div className="frame__zones frame__zones--left">
      {ROWS.map((zone) => (
        <span key={zone}>{zone}</span>
      ))}
    </div>
    <div className="frame__zones frame__zones--right">
      {ROWS.map((zone) => (
        <span key={zone}>{zone}</span>
      ))}
    </div>
  </div>
);
