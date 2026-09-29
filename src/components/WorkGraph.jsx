import { useEffect, useRef } from "react";
import { graph, tour } from "../data/graph";

// A live, dial-shaped map of everything in data/graph.js. Roles (solid
// squares) and projects (circles) sit on an inner ring; the tools they used
// (small squares) sit on an outer ring, each placed beside the work that used
// it. Current pulses along the wires, the dial tours its roles and projects
// when idle, and the pointer traces whatever node it's on.

const SEED = 20241018;
const TOUR_MS = 3200;
const FONT = '500 10px "IBM Plex Mono", ui-monospace, monospace';
const FONT_BOLD = '600 10px "IBM Plex Mono", ui-monospace, monospace';
const TAU = Math.PI * 2;

function mulberry32(seed) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function readColors() {
  const styles = getComputedStyle(document.documentElement);
  const get = (name) => styles.getPropertyValue(name).trim();
  return {
    bg: get("--bg"),
    ink: get("--ink"),
    ink2: get("--ink-2"),
    ink3: get("--ink-3"),
    blue: get("--blue"),
    signal: get("--signal"),
  };
}

// `region` is the open rectangle, in canvas coordinates, the dial may use.
function buildGraph(region) {
  const rand = mulberry32(SEED);
  const cx = region.x + region.w / 2;
  const cy = region.y + region.h / 2;
  const outer = Math.max(60, Math.min(region.w, region.h) / 2 - 14);
  const inner = outer * 0.52;

  // Small dials only keep the tools shared by two or more items.
  const usage = new Map();
  graph.forEach((item) => item.tools.forEach((t) => usage.set(t, (usage.get(t) || 0) + 1)));
  const keepTool = (tool) => outer > 150 || usage.get(tool) > 1;

  const nodes = [];
  const index = new Map();
  const add = (label, kind) => {
    if (!index.has(label)) {
      index.set(label, nodes.length);
      nodes.push({ label, kind, x: 0, y: 0, angle: 0 });
    }
    return index.get(label);
  };
  graph.forEach((item) => add(item.label, item.kind));
  graph.forEach((item) => item.tools.filter(keepTool).forEach((tool) => add(tool, "tool")));

  const edges = [];
  const seen = new Set();
  const link = (a, b) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || seen.has(key)) return;
    seen.add(key);
    edges.push([a, b]);
  };
  graph.forEach((item) => {
    const a = index.get(item.label);
    item.tools.filter(keepTool).forEach((tool) => link(a, index.get(tool)));
    (item.projects || []).forEach((project) => link(a, index.get(project)));
  });

  const adjacency = nodes.map(() => []);
  edges.forEach(([a, b]) => {
    adjacency[a].push(b);
    adjacency[b].push(a);
  });

  // Inner ring: roles and projects, clockwise from the top, in data order.
  const items = nodes.filter((node) => node.kind !== "tool");
  items.forEach((node, i) => {
    node.angle = -Math.PI / 2 + (i / items.length) * TAU;
    node.x = cx + Math.cos(node.angle) * inner;
    node.y = cy + Math.sin(node.angle) * inner;
  });

  // Outer ring: each tool wants to sit at the average angle of the items that
  // use it. Keep that order, space them evenly, then rotate the whole ring to
  // stay as close to those wishes as possible.
  const tools = nodes.filter((node) => node.kind === "tool");
  tools.forEach((tool) => {
    let sx = 0;
    let sy = 0;
    adjacency[index.get(tool.label)].forEach((j) => {
      sx += Math.cos(nodes[j].angle);
      sy += Math.sin(nodes[j].angle);
    });
    tool.wish = Math.atan2(sy, sx);
  });
  tools.sort((a, b) => a.wish - b.wish);
  const spacing = TAU / Math.max(tools.length, 1);
  let ox = 0;
  let oy = 0;
  tools.forEach((tool, i) => {
    ox += Math.cos(tool.wish - i * spacing);
    oy += Math.sin(tool.wish - i * spacing);
  });
  const offset = Math.atan2(oy, ox);
  tools.forEach((tool, i) => {
    tool.angle = offset + i * spacing;
    tool.x = cx + Math.cos(tool.angle) * outer;
    tool.y = cy + Math.sin(tool.angle) * outer;
  });

  const pulses = edges.length
    ? Array.from({ length: Math.min(12, edges.length) }, () => {
        const [from, to] = edges[Math.floor(rand() * edges.length)];
        return { from, to, t: rand(), speed: 30 + rand() * 36 };
      })
    : [];

  return {
    nodes,
    edges,
    adjacency,
    pulses,
    center: { x: cx, y: cy },
    rings: { inner, outer },
    tour: tour.map((label) => index.get(label)).filter((i) => i !== undefined),
  };
}

function step(net, dt) {
  for (const pulse of net.pulses) {
    const a = net.nodes[pulse.from];
    const b = net.nodes[pulse.to];
    const length = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    pulse.t += (pulse.speed * dt) / length;
    if (pulse.t < 1) continue;
    const options = net.adjacency[pulse.to].filter((i) => i !== pulse.from);
    const next = options.length
      ? options[Math.floor(Math.random() * options.length)]
      : pulse.from;
    pulse.from = pulse.to;
    pulse.to = next;
    pulse.t = 0;
  }
}

// Labels sit on the outside of the dial: to the right of nodes on its right
// half, to the left on its left half. On wide screens, tool labels on the
// outer ring run outward along their spokes instead, so neighbors fan out
// rather than collide.
function drawLabel(ctx, node, center, width, colors, color, bold) {
  ctx.font = bold ? FONT_BOLD : FONT;
  const label = node.label.toUpperCase();
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = colors.bg;
  ctx.fillStyle = color;

  if (node.kind === "tool" && width >= 900) {
    const angle = Math.atan2(node.y - center.y, node.x - center.x);
    const flip = Math.cos(angle) < 0;
    ctx.save();
    ctx.translate(node.x, node.y);
    ctx.rotate(flip ? angle + Math.PI : angle);
    ctx.textAlign = flip ? "right" : "left";
    ctx.strokeText(label, flip ? -12 : 12, 3.5);
    ctx.fillText(label, flip ? -12 : 12, 3.5);
    ctx.restore();
    return;
  }

  const w = ctx.measureText(label).width;
  const rightSide = node.x >= center.x;
  let left = rightSide ? node.x + 11 : node.x - 11 - w;
  left = Math.min(Math.max(8, left), width - 16 - w);
  ctx.strokeText(label, left, node.y + 3.5);
  ctx.fillText(label, left, node.y + 3.5);
}

function drawDial(ctx, net, colors) {
  const { x, y } = net.center;
  const { inner, outer } = net.rings;

  ctx.strokeStyle = colors.ink;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.22;
  ctx.setLineDash([3, 5]);
  for (const radius of [inner, outer]) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, TAU);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Degree ticks, like the rim of a protractor (one path per tick length)
  for (const long of [false, true]) {
    ctx.globalAlpha = long ? 0.45 : 0.25;
    ctx.beginPath();
    for (let degree = 0; degree < 360; degree += 5) {
      if ((degree % 30 === 0) !== long) continue;
      const a = (degree * Math.PI) / 180 - Math.PI / 2;
      const r0 = outer + 16;
      const r1 = r0 + (long ? 8 : 4);
      ctx.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0);
      ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1);
    }
    ctx.stroke();
  }

  // Registration mark at the center
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.lineTo(x + 10, y);
  ctx.moveTo(x, y - 10);
  ctx.lineTo(x, y + 10);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, TAU);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function draw(ctx, net, size, colors, pointer, active, animate) {
  const { width, height } = size;
  ctx.clearRect(0, 0, width, height);
  drawDial(ctx, net, colors);

  const tracing = active !== null;
  const lit = new Set(tracing ? [active, ...net.adjacency[active]] : []);

  // Wires, batched into one path per style: role wires, project wires, and
  // the wires of whatever is being traced.
  const wires = [
    { color: colors.ink, alpha: 0.3 * (tracing ? 0.5 : 1), width: 1, edges: [] },
    { color: colors.blue, alpha: 0.34 * (tracing ? 0.5 : 1), width: 1, edges: [] },
    { color: colors.signal, alpha: 0.95, width: 1.5, edges: [] },
  ];
  for (const edge of net.edges) {
    const [a, b] = edge;
    const fromProject = net.nodes[a].kind === "project" || net.nodes[b].kind === "project";
    const on = tracing && (a === active || b === active);
    wires[on ? 2 : fromProject ? 1 : 0].edges.push(edge);
  }
  for (const wire of wires) {
    if (!wire.edges.length) continue;
    ctx.strokeStyle = wire.color;
    ctx.globalAlpha = wire.alpha;
    ctx.lineWidth = wire.width;
    ctx.beginPath();
    for (const [a, b] of wire.edges) {
      ctx.moveTo(net.nodes[a].x, net.nodes[a].y);
      ctx.lineTo(net.nodes[b].x, net.nodes[b].y);
    }
    ctx.stroke();
  }

  // Current moving through the wires
  if (animate) {
    ctx.fillStyle = colors.signal;
    ctx.globalAlpha = 0.85;
    for (const pulse of net.pulses) {
      const a = net.nodes[pulse.from];
      const b = net.nodes[pulse.to];
      ctx.fillRect(a.x + (b.x - a.x) * pulse.t - 1.5, a.y + (b.y - a.y) * pulse.t - 1.5, 3, 3);
    }
  }

  // Nodes
  net.nodes.forEach((node, i) => {
    const on = lit.has(i);
    ctx.globalAlpha = tracing && !on ? 0.5 : 1;
    ctx.lineWidth = 1.25;
    if (node.kind === "role") {
      const s = i === active ? 13 : 11;
      ctx.fillStyle = on ? colors.signal : colors.ink;
      ctx.fillRect(node.x - s / 2, node.y - s / 2, s, s);
    } else if (node.kind === "project") {
      ctx.fillStyle = i === active ? colors.signal : colors.bg;
      ctx.strokeStyle = on ? colors.signal : colors.blue;
      ctx.beginPath();
      ctx.arc(node.x, node.y, i === active ? 6.5 : 5, 0, TAU);
      ctx.fill();
      ctx.stroke();
    } else {
      const s = on ? 7 : 5.5;
      ctx.fillStyle = i === active ? colors.signal : colors.bg;
      ctx.strokeStyle = on ? colors.signal : colors.ink3;
      ctx.fillRect(node.x - s / 2, node.y - s / 2, s, s);
      ctx.strokeRect(node.x - s / 2, node.y - s / 2, s, s);
    }
  });

  // Labels: roles always, plus whatever is being traced
  net.nodes.forEach((node, i) => {
    if (i === active) return;
    if (lit.has(i)) {
      ctx.globalAlpha = 1;
      drawLabel(ctx, node, net.center, width, colors, colors.ink2, false);
    } else if (node.kind === "role") {
      ctx.globalAlpha = tracing ? 0.55 : 1;
      drawLabel(ctx, node, net.center, width, colors, colors.ink, true);
    }
  });
  ctx.globalAlpha = 1;
  if (tracing) drawLabel(ctx, net.nodes[active], net.center, width, colors, colors.ink, true);

  // Crosshair and coordinates under the pointer, like a CAD cursor
  if (pointer) {
    ctx.globalAlpha = 0.8;
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pointer.x - 9, pointer.y);
    ctx.lineTo(pointer.x + 9, pointer.y);
    ctx.moveTo(pointer.x, pointer.y - 9);
    ctx.lineTo(pointer.x, pointer.y + 9);
    ctx.stroke();
    if (tracing) {
      const node = net.nodes[active];
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.arc(node.x, node.y, 13, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    const pad = (value) => String(Math.round(value)).padStart(4, "0");
    ctx.font = FONT;
    ctx.fillStyle = colors.ink3;
    ctx.fillText(`X ${pad(pointer.x)}  Y ${pad(pointer.y)}`, pointer.x + 12, pointer.y + 22);
  }
  ctx.globalAlpha = 1;
}

function nearest(net, point, radius) {
  let best = null;
  let bestD = radius;
  net.nodes.forEach((node, i) => {
    const d = Math.hypot(node.x - point.x, node.y - point.y);
    if (d < bestD) {
      best = i;
      bestD = d;
    }
  });
  return best;
}

export const WorkGraph = ({ theme, className }) => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const redrawRef = useRef(() => {});

  // Re-read the palette whenever the theme flips.
  useEffect(() => {
    colorsRef.current = readColors();
    redrawRef.current();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!colorsRef.current) colorsRef.current = readColors();

    let net = null;
    let size = { width: 0, height: 0 };
    let pointer = null;
    let hovered = null;
    let pinned = null;
    let tourStart = performance.now();
    let frame = 0;
    let pending = 0;
    let last = 0;
    let running = false;
    let visible = true;
    let disposed = false;

    const activeNode = (time) => {
      if (hovered !== null) return hovered;
      if (pinned !== null) return pinned;
      if (reducedMotion.matches || !net.tour.length) return null;
      return net.tour[Math.floor((time - tourStart) / TOUR_MS) % net.tour.length];
    };

    const render = (time = performance.now()) => {
      if (!net) return;
      draw(ctx, net, size, colorsRef.current, pointer, activeNode(time), !reducedMotion.matches);
    };

    const loop = (now) => {
      step(net, Math.min(0.05, (now - last) / 1000));
      last = now;
      render(now);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion.matches || !visible || document.hidden || !net) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // When the loop is idle (offscreen or reduced motion), draw on demand.
    const requestRender = () => {
      if (running) return;
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => render());
    };
    redrawRef.current = requestRender;

    // The hero reserves an empty box for the dial (a column beside the intro
    // on wide screens, a band under it on narrow ones). Draw inside it.
    const measure = (rect) => {
      const space = host.querySelector(".hero__graph-space");
      if (!space) return { x: rect.width * 0.55, y: 160, w: rect.width * 0.4, h: rect.height - 260 };
      const r = space.getBoundingClientRect();
      return { x: r.left - rect.left, y: r.top - rect.top, w: r.width, h: r.height };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = { width: rect.width, height: rect.height };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      net = buildGraph(measure(rect));
      hovered = null;
      pinned = null;
      requestRender();
      start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionChange = () => {
      if (reducedMotion.matches) stop();
      else start();
      requestRender();
    };

    const toLocal = (event) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerMove = (event) => {
      if (event.pointerType !== "mouse" || !net) return;
      pointer = toLocal(event);
      hovered = nearest(net, pointer, 28);
      requestRender();
    };
    const onPointerLeave = (event) => {
      if (event.pointerType !== "mouse") return;
      pointer = null;
      if (hovered !== null) tourStart = performance.now();
      hovered = null;
      requestRender();
    };
    // Touch: tap a node to pin it, tap empty space to resume the tour.
    const onPointerDown = (event) => {
      if (event.pointerType === "mouse" || !net) return;
      pinned = nearest(net, toLocal(event), 36);
      if (pinned === null) tourStart = performance.now();
      requestRender();
    };

    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionChange);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("pointerdown", onPointerDown);
    // Web fonts change the hero's layout, so measure again once they load.
    document.fonts?.ready.then(() => !disposed && resize());

    return () => {
      disposed = true;
      stop();
      cancelAnimationFrame(pending);
      redrawRef.current = () => {};
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
