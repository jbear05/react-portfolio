// Deterministic noise in [-0.5, 0.5), so charts look hand-measured but
// render identically every time.
export const noise = (i) => {
  const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v) - 0.5;
};
