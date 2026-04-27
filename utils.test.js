import { describe, expect, it } from "vitest";
import { ufRows } from "./data";
import { buildStates, formatNumber, formatPercent, mixColor, sumUfForYear } from "./utils";

export function buildStates() { const rows = ufRows.filter((row) => row.year >= 2020 && row.year <= 2025);
  const nationalTotal = rows.reduce((sum, row) => sum + row.Total, 0);
  return Object.keys(ufNames).map((uf) => {const [name, region, x, y] = ufNames[uf];
    const total = rows.reduce((sum, row) => sum + row[uf], 0);
    const first = rows.find((row) => row.year === 2020)[uf];
    const last = rows.find((row) => row.year === 2025)[uf];
    const growth = ((last - first) / first) * 100;
    const share = (total / nationalTotal) * 100;

    return { uf,
      name,
      region,
      x,
      y,
      total,
      first,
      last,
      growth,
      share,
    };
  });
}


describe("MindLink data helpers", () => {
  it("soma das UFs bate com total nacional em todos os anos", () => {
    for (const row of ufRows) {
      expect(sumUfForYear(row)).toBe(row.Total);
    }
  });

  it("mantém São Paulo no cadastro e com crescimento calculável", () => {
    const states = buildStates();
    const sp = states.find((state) => state.uf === "SP");

    expect(sp?.name).toBe("São Paulo");
    expect(sp?.growth).toBeGreaterThan(0);
  });

  it("formata número e percentual no padrão pt-BR usado no dashboard", () => {
    expect(formatNumber(1500)).toBe("1,5 mil");
    expect(formatPercent(24.234)).toBe("24,2%");
  });

  it("mistura cores com clamp para evitar valores inválidos", () => {
    expect(mixColor("#000000", "#ffffff", 0.5)).toBe("#808080");
    expect(mixColor("#000000", "#ffffff", 2)).toBe("#ffffff");
    expect(mixColor("#000000", "#ffffff", -1)).toBe("#000000");
  });
});
