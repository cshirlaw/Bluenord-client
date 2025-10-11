export const brand = {
  deep: '#0A2A4A',
  light: '#00A3E0',
  grid: '#E5E7EB',
  text: '#0f172a',
  sub: '#475569',
};

export const fmt = {
  k: (n: number) => (Math.abs(n) >= 1000 ? `${(n/1000).toFixed(1)}k` : `${n}`),
  percent: (v: number) => `${(v * 100).toFixed(0)}%`,
};