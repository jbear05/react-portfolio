import { useEffect, useState } from "react";

function format(timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short",
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("hour")}:${get("minute")} ${get("timeZoneName")}`;
}

// Local time somewhere else, refreshed on the minute.
export function useClock(timeZone) {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    let interval;
    const tick = () => setTime(format(timeZone));
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, msToNextMinute);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [timeZone]);

  return time;
}
