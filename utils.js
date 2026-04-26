import { ufNames, ufRows } from "./data";

export function formatNumber(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(2).replace(".", ",")} mi`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".", ",")} mil`;
  return n.toLocaleString("pt-BR");
}

export function formatCurrency(n) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatPercent(n) {
  return `${n.toFixed(1).replace(".", ",")}%`;
}

export function mixColor(a, b, t) {
  const safeT = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
  const ah = a.replace("#", "");
  const bh = b.replace("#", "");
  const ar = parseInt(ah.slice(0, 2), 16);
  const ag = parseInt(ah.slice(2, 4), 16);
  const ab = parseInt(ah.slice(4, 6), 16);
  const br = parseInt(bh.slice(0, 2), 16);
  const bg = parseInt(bh.slice(2, 4), 16);
  const bb = parseInt(bh.slice(4, 6), 16);
  const rr = Math.round(ar + (br - ar) * safeT).toString(16).padStart(2, "0");
  const rg = Math.round(ag + (bg - ag) * safeT).toString(16).padStart(2, "0");
  const rb = Math.round(ab + (bb - ab) * safeT).toString(16).padStart(2, "0");
  return `#${rr}${rg}${rb}`;
}

export function buildStates() {
  const nationalTotal = ufRows.reduce((sum, row) => sum + row.Total, 0);

  return Object.keys(ufNames).map((uf) => {
    const [name, region, x, y] = ufNames[uf];
    const total = ufRows.reduce((sum, row) => sum + row[uf], 0);
    const first = ufRows[0][uf];
    const last = ufRows[ufRows.length - 1][uf];
    const growth = ((last - first) / first) * 100;
    const share = (total / nationalTotal) * 100;

    return { uf, name, region, x, y, total, first, last, growth, share };
  });
}

export function sumUfForYear(row) {
  return Object.keys(ufNames).reduce((sum, uf) => sum + row[uf], 0);
}
