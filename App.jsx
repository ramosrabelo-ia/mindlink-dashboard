import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BRAND, years, ufRows, spAgeRows, spAvgCost, spCidRows, spStay } from "./data";
import { buildStates, formatCurrency, formatNumber, formatPercent, mixColor } from "./utils";
import Icon from "./icons";

const states = buildStates();

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-3 text-sm shadow-xl backdrop-blur">
      <p className="mb-1 font-black" style={{ color: BRAND.navy }}>{label}</p>
      {payload.map((entry) => (
        <p key={`${entry.dataKey}-${entry.name}`} className="font-semibold" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString("pt-BR") : entry.value}
        </p>
      ))}
    </div>
  );
}

function SectionKicker({ children }) {
  return <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: BRAND.coral }}>{children}</p>;
}

function StatCard({ iconName, label, value, caption, tone = "teal" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="rounded-[1.6rem] bg-white p-5 shadow-sm ring-1 ring-slate-200"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ backgroundColor: tone === "coral" ? "#F9DED6" : BRAND.mist }}>
          <Icon name={iconName} size={21} color={tone === "coral" ? BRAND.coral : BRAND.teal} />
        </div>
        <Icon name="arrowUpRight" size={18} color="#cbd5e1" />
      </div>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-black tracking-tight" style={{ color: BRAND.navy }}>{value}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{caption}</p>
    </motion.div>
  );
}

function SelectBox({ label, value, onChange, children }) {
  return (
    <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
      {label}
      <div className="relative mt-2">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-black outline-none transition focus:border-teal-600"
          style={{ color: BRAND.navy }}
        >
          {children}
        </select>
        <Icon name="chevronDown" className="pointer-events-none absolute right-3 top-3.5" size={17} color="#94a3b8" />
      </div>
    </label>
  );
}

function BrazilMap({ selectedUf, onSelect, metric, year }) {
  const values = states.map((state) => {
    if (metric === "growth") return state.growth;
    if (metric === "share") return state.share;
    return ufRows.find((row) => row.year === year)?.[state.uf] ?? state.total;
  });
  const min = Math.min(...values);
  const max = Math.max(...values);
  const maxTotal = Math.max(...states.map((state) => state.total));

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-100/80 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" />
      <div className="relative z-10 mb-3 flex items-start justify-between gap-4">
        <div>
          <SectionKicker>Mapa vivo</SectionKicker>
          <h3 className="mt-1 text-2xl font-black" style={{ color: BRAND.navy }}>Pressão assistencial por UF</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">Clique nos estados para atualizar o painel de leitura. O tamanho mostra volume acumulado; a cor mostra a métrica selecionada.</p>
        </div>
        <div className="hidden rounded-2xl bg-slate-50 px-4 py-3 text-right md:block">
          <p className="text-xs text-slate-500">Base</p>
          <p className="font-black" style={{ color: BRAND.navy }}>SIH-SUS</p>
        </div>
      </div>

      <svg viewBox="0 0 680 735" className="relative z-10 h-[530px] w-full" role="img" aria-label="Mapa do Brasil com bolhas por unidade federativa">
        <defs>
          <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1E3A5F" floodOpacity="0.14" />
          </filter>
        </defs>
        <path d="M218 78 C140 108 87 178 81 261 C75 345 141 360 171 418 C205 484 190 541 261 588 C324 629 350 709 427 671 C490 640 450 550 519 500 C594 446 601 375 573 304 C548 238 514 196 450 166 C383 134 315 43 218 78 Z" fill="#F1EEE6" stroke="#DDD8CC" strokeWidth="2" />
        <path d="M210 118 C185 155 181 184 197 213 C218 251 249 260 271 292 C305 342 286 384 319 423 C350 458 407 445 432 409 C459 369 445 315 477 288 C501 268 533 265 546 238" fill="none" stroke="#D4CCC0" strokeDasharray="7 10" strokeLinecap="round" strokeWidth="4" opacity="0.8" />
        {states.map((state) => {
          const current = metric === "growth" ? state.growth : metric === "share" ? state.share : ufRows.find((row) => row.year === year)?.[state.uf] ?? state.total;
          const normalized = max === min ? 0.5 : (current - min) / (max - min);
          const selected = selectedUf === state.uf;
          const radius = 20 + Math.sqrt(state.total / maxTotal) * 17;

          return (
            <g
              key={state.uf}
              onClick={() => onSelect(state.uf)}
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`Selecionar ${state.name}`}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") onSelect(state.uf);
              }}
            >
              <motion.circle
                cx={state.x}
                cy={state.y}
                r={selected ? radius + 5 : radius}
                fill={selected ? BRAND.coral : mixColor(BRAND.mist, BRAND.teal, normalized)}
                stroke={selected ? BRAND.navy : BRAND.white}
                strokeWidth={selected ? 4 : 3}
                filter={selected ? "url(#mapShadow)" : "none"}
                whileHover={{ scale: 1.08 }}
                style={{ transformOrigin: `${state.x}px ${state.y}px` }}
              />
              <text x={state.x} y={state.y + 5} textAnchor="middle" className="select-none text-[14px] font-black" fill={selected ? "white" : BRAND.navy}>{state.uf}</text>
              <title>{`${state.name}: ${metric === "growth" || metric === "share" ? formatPercent(current) : current.toLocaleString("pt-BR")}`}</title>
            </g>
          );
        })}
      </svg>

      <div className="relative z-10 mt-2 flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 p-3 text-xs font-semibold text-slate-500">
        <span>Menor</span>
        <div className="h-3 w-44 rounded-full" style={{ background: `linear-gradient(90deg, ${BRAND.mist}, ${BRAND.teal})` }} />
        <span>Maior</span>
        <span className="ml-auto">Tamanho = total acumulado 2019–2025</span>
      </div>
    </div>
  );
}

function StateReadout({ uf }) {
  const state = states.find((item) => item.uf === uf) || states.find((item) => item.uf === "SP");
  const rank = [...states].sort((a, b) => b.total - a.total).findIndex((item) => item.uf === state.uf) + 1;
  const trend = ufRows.map((row) => ({ year: row.year, value: row[state.uf] }));
  const spShare2025 = (ufRows.find((row) => row.year === 2025).SP / ufRows.find((row) => row.year === 2025).Total) * 100;

  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <SectionKicker>{state.region}</SectionKicker>
          <h3 className="mt-1 text-3xl font-black" style={{ color: BRAND.navy }}>{state.name}</h3>
          <p className="mt-1 text-sm text-slate-500">UF {state.uf} · #{rank} em volume nacional</p>
        </div>
        <div className="rounded-2xl px-4 py-3 text-right text-white" style={{ backgroundColor: BRAND.navy }}>
          <p className="text-xs opacity-75">Total</p>
          <p className="text-2xl font-black">{formatNumber(state.total)}</p>
        </div>
      </div>

      <div className="mt-5 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="ufArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={BRAND.teal} stopOpacity={0.35} />
                <stop offset="100%" stopColor={BRAND.teal} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={BRAND.sand} strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
            <Tooltip content={<CustomTooltip />} />
            <Area name={state.uf} type="monotone" dataKey="value" stroke={BRAND.teal} strokeWidth={3} fill="url(#ufArea)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">2019</p><p className="text-xl font-black" style={{ color: BRAND.navy }}>{formatNumber(state.first)}</p></div>
        <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">2025</p><p className="text-xl font-black" style={{ color: BRAND.navy }}>{formatNumber(state.last)}</p></div>
        <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Variação</p><p className="text-xl font-black" style={{ color: state.growth >= 0 ? BRAND.teal : BRAND.coral }}>{formatPercent(state.growth)}</p></div>
      </div>

      <div className="mt-4 rounded-2xl border-l-4 p-4" style={{ backgroundColor: BRAND.cream, borderColor: state.uf === "SP" ? BRAND.coral : BRAND.teal }}>
        <p className="text-sm font-semibold leading-relaxed" style={{ color: BRAND.ink }}>
          {state.uf === "SP" ? `São Paulo é o eixo piloto: em 2025, respondeu por ${formatPercent(spShare2025)} das internações nacionais por CID-10 Capítulo V.` : "A leitura por UF mostra onde a MindLink pode replicar o modelo de priorização: volume, aceleração e comparação territorial no mesmo painel."}
        </p>
      </div>
    </div>
  );
}

function TopRanking({ data, year }) {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <SectionKicker>Ranking {year}</SectionKicker>
          <h3 className="mt-1 text-xl font-black" style={{ color: BRAND.navy }}>Top UFs por internações</h3>
        </div>
        <Icon name="activity" size={22} color={BRAND.teal} />
      </div>
      <div className="space-y-3">
        {data.map((state, index) => (
          <div key={state.uf}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-bold" style={{ color: BRAND.navy }}>{index + 1}. {state.uf} · {state.name}</span>
              <span className="font-black" style={{ color: index === 0 ? BRAND.coral : BRAND.teal }}>{formatNumber(state.value)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full" style={{ width: `${(state.value / data[0].value) * 100}%`, backgroundColor: index === 0 ? BRAND.coral : BRAND.teal }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NationalTrend() {
  const data = ufRows.map((row) => ({ year: row.year, Brasil: row.Total, SP: row.SP, RS: row.RS, MG: row.MG }));

  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <SectionKicker>Série temporal</SectionKicker>
        <h3 className="mt-1 text-2xl font-black" style={{ color: BRAND.navy }}>Brasil cresce e SP lidera o volume</h3>
        <p className="mt-1 text-sm text-slate-600">Comparativo entre total nacional e três estados de alta pressão acumulada.</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 16, left: -15, bottom: 0 }}>
            <CartesianGrid stroke={BRAND.sand} strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
            <Tooltip content={<CustomTooltip />} />
            <Area name="Brasil" type="monotone" dataKey="Brasil" fill={BRAND.mist} stroke={BRAND.teal} strokeWidth={3} fillOpacity={0.7} />
            <Line name="SP" type="monotone" dataKey="SP" stroke={BRAND.coral} strokeWidth={4} dot={{ r: 4 }} />
            <Line name="RS" type="monotone" dataKey="RS" stroke={BRAND.navy} strokeWidth={2.5} dot={false} />
            <Line name="MG" type="monotone" dataKey="MG" stroke="#8CA7BC" strokeWidth={2.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CidPressure({ data, year }) {
  const total = data.reduce((sum, row) => sum + row.value, 0);
  const pieData = data.slice(0, 5).map((row) => ({ name: row.short, value: row.value }));

  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <SectionKicker>São Paulo · CID-10</SectionKicker>
        <h3 className="mt-1 text-2xl font-black" style={{ color: BRAND.navy }}>Quais transtornos pressionam mais em {year}?</h3>
        <p className="mt-1 text-sm text-slate-600">Ranking de grupos da Lista de Morbidade CID-10 no município de São Paulo.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.65fr_1fr]">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                {pieData.map((entry, index) => <Cell key={entry.name} fill={[BRAND.coral, BRAND.teal, BRAND.navy, "#8CA7BC", "#DDA48E"][index]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {data.slice(0, 6).map((row, index) => (
            <div key={row.short} className="rounded-2xl bg-slate-50 p-3">
              <div className="mb-1 flex justify-between gap-3 text-sm">
                <span className="font-bold" style={{ color: BRAND.navy }}>{row.short}</span>
                <span className="font-black" style={{ color: index === 0 ? BRAND.coral : BRAND.teal }}>{formatNumber(row.value)} · {formatPercent((row.value / total) * 100)}</span>
              </div>
              <div className="h-2 rounded-full bg-white"><div className="h-2 rounded-full" style={{ width: `${(row.value / data[0].value) * 100}%`, backgroundColor: index === 0 ? BRAND.coral : BRAND.teal }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgeProfile() {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <SectionKicker>Perfil de demanda</SectionKicker>
        <h3 className="mt-1 text-2xl font-black" style={{ color: BRAND.navy }}>Faixa etária mais afetada</h3>
        <p className="mt-1 text-sm text-slate-600">Em São Paulo, adultos de 20 a 49 anos concentram a maior parte das internações acumuladas.</p>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={spAgeRows} layout="vertical" margin={{ top: 0, right: 24, left: 42, bottom: 0 }}>
            <CartesianGrid stroke={BRAND.sand} strokeDasharray="4 6" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
            <YAxis dataKey="age" type="category" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} width={70} />
            <Tooltip content={<CustomTooltip />} />
            <Bar name="Total acumulado" dataKey="total" radius={[0, 12, 12, 0]} fill={BRAND.teal}>
              {spAgeRows.map((row) => <Cell key={row.age} fill={["20 a 29", "30 a 39", "40 a 49"].includes(row.age) ? BRAND.coral : BRAND.teal} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CostAndStay() {
  const cidCostData = spCidRows
    .map((row) => ({ short: row.short, avgCost: row.avgCost, stay: row.stay }))
    .sort((a, b) => b.avgCost - a.avgCost)
    .slice(0, 6);
  const costTrend = spAvgCost.map((row, index) => ({ year: row.year, custo: row.value, permanencia: spStay[index].value }));

  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <SectionKicker>Eficiência e capacidade</SectionKicker>
        <h3 className="mt-1 text-2xl font-black" style={{ color: BRAND.navy }}>Custo médio cai, permanência volta a subir</h3>
        <p className="mt-1 text-sm text-slate-600">A combinação de valor médio, permanência e volume ajuda a estimar pressão sobre orçamento e dias-leito.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={costTrend} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={BRAND.sand} strokeDasharray="4 6" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value}`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area yAxisId="left" name="Valor médio" dataKey="custo" type="monotone" fill="#F9DED6" stroke={BRAND.coral} strokeWidth={3} />
              <Line yAxisId="right" name="Permanência média" dataKey="permanencia" type="monotone" stroke={BRAND.teal} strokeWidth={4} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cidCostData} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={BRAND.sand} strokeDasharray="4 6" vertical={false} />
              <XAxis dataKey="short" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(value) => `R$${Math.round(value / 1000)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar name="Valor médio" dataKey="avgCost" radius={[12, 12, 0, 0]} fill={BRAND.teal}>
                <LabelList dataKey="avgCost" position="top" formatter={(value) => formatCurrency(value)} className="text-[10px]" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MethodCard({ iconName, title, text }) {
  return (
    <div className="rounded-[1.6rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl" style={{ backgroundColor: BRAND.mist }}>
        <Icon name={iconName} size={21} color={BRAND.teal} />
      </div>
      <h3 className="text-lg font-black" style={{ color: BRAND.navy }}>{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

function Dashboard() {
  const [year, setYear] = useState("2025");
  const [metric, setMetric] = useState("volume");
  const [selectedUf, setSelectedUf] = useState("SP");
  const selectedYear = Number(year);

  const topStates = useMemo(() => {
    const row = ufRows.find((item) => item.year === selectedYear) || ufRows[ufRows.length - 1];
    return states
      .map((state) => ({ ...state, value: row[state.uf] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [selectedYear]);

  const cidData = spCidRows
    .map((row) => ({
      ...row,
      value: row.values[selectedYear],
      estimatedCost: row.values[selectedYear] * row.avgCost,
      bedDays: row.values[selectedYear] * row.stay,
    }))
    .sort((a, b) => b.value - a.value);

  const totalBr = ufRows.reduce((sum, row) => sum + row.Total, 0);
  const totalSp = ufRows.reduce((sum, row) => sum + row.SP, 0);
  const sp2025 = ufRows.find((row) => row.year === 2025).SP;
  const br2025 = ufRows.find((row) => row.year === 2025).Total;
  const spGrowth = ((sp2025 - ufRows.find((row) => row.year === 2019).SP) / ufRows.find((row) => row.year === 2019).SP) * 100;
  const brGrowth = ((br2025 - ufRows.find((row) => row.year === 2019).Total) / ufRows.find((row) => row.year === 2019).Total) * 100;
  const visibleMetric = metric === "volume" ? "volume" : metric === "growth" ? "growth" : "share";

  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
        <div>
          <SectionKicker>Dashboard interativo</SectionKicker>
          <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl" style={{ color: BRAND.navy }}>Explore a pressão hospitalar em saúde mental</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">A landing page conta a história com dados: começa no panorama nacional, aprofunda no estado piloto e fecha no detalhe por CID-10, faixa etária, permanência e custo médio.</p>
        </div>
        <div className="grid gap-3 rounded-[1.6rem] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2">
          <SelectBox label="Ano" value={year} onChange={setYear}>{years.map((item) => <option key={item} value={item}>{item}</option>)}</SelectBox>
          <SelectBox label="Mapa" value={metric} onChange={setMetric}>
            <option value="volume">Volume anual</option>
            <option value="growth">Variação 2019→2025</option>
            <option value="share">Participação nacional</option>
          </SelectBox>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard iconName="database" label="Brasil · 2019–2025" value={formatNumber(totalBr)} caption="Internações nacionais por transtornos mentais e comportamentais." />
        <StatCard iconName="mapPin" label="São Paulo · 2019–2025" value={formatNumber(totalSp)} caption="Maior volume absoluto entre as unidades federativas." tone="coral" />
        <StatCard iconName="trending" label="Crescimento BR" value={formatPercent(brGrowth)} caption="Variação do volume anual nacional entre 2019 e 2025." />
        <StatCard iconName="hospital" label="Crescimento SP" value={formatPercent(spGrowth)} caption="SP volta a acelerar no pós-2022 e sustenta o piloto da MindLink." />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <BrazilMap selectedUf={selectedUf} onSelect={setSelectedUf} metric={visibleMetric} year={selectedYear} />
        <div className="space-y-6">
          <StateReadout uf={selectedUf} />
          <TopRanking data={topStates} year={selectedYear} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <NationalTrend />
        <CidPressure data={cidData} year={selectedYear} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AgeProfile />
        <CostAndStay />
      </div>
    </section>
  );
}

export default function App() {
  const totalBr = ufRows.reduce((sum, row) => sum + row.Total, 0);
  const totalSp = ufRows.reduce((sum, row) => sum + row.SP, 0);
  const spShare = (totalSp / totalBr) * 100;
  const spCityTotal = 99077;
  const spCity2025 = 17271;

  return (
    <main className="min-h-screen overflow-hidden" style={{ backgroundColor: BRAND.cream }}>
      <nav className="sticky top-0 z-40 border-b border-white/20 bg-[#1E3A5F]/92 px-4 py-3 text-white shadow-sm backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20"><Icon name="brain" size={22} color="#8FE3DD" /></div>
            <div>
              <p className="text-sm font-black tracking-[0.32em] text-[#8FE3DD]">MINDLINK</p>
              <p className="hidden text-[10px] uppercase tracking-[0.22em] text-white/55 sm:block">Mental Insight · Data Connection</p>
            </div>
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-white/75 md:flex">
            <a href="#problema" className="hover:text-white">Problema</a>
            <a href="#dashboard" className="hover:text-white">Dashboard</a>
            <a href="#metodo" className="hover:text-white">Método</a>
            <a href="#impacto" className="hover:text-white">Impacto</a>
          </div>
          <a href="#dashboard" className="rounded-full px-4 py-2 text-sm font-black" style={{ backgroundColor: BRAND.coral }}>Explorar dados</a>
        </div>
      </nav>

      <section id="top" className="relative px-4 py-20 sm:px-8 lg:py-28" style={{ backgroundColor: BRAND.navy }}>
        <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-300/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80 ring-1 ring-white/15"><Icon name="sparkles" size={16} color="#8FE3DD" /> Dados públicos do SUS, traduzidos para decisão</div>
            <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: BRAND.coral }}>Inteligência Hospitalar na Saúde Mental</p>
            <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.96] tracking-tight text-white md:text-7xl">A saúde mental do SUS em uma leitura simples, visual e acionável.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">A MindLink transforma dados do SIH-SUS/DATASUS sobre internações por transtornos mentais em uma experiência executiva: mapa, rankings, tendências, perfil de demanda, custo e permanência média.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#dashboard" className="rounded-full px-6 py-3 font-black text-white shadow-lg" style={{ backgroundColor: BRAND.teal }}>Ver dashboard</a>
              <a href="#metodo" className="rounded-full bg-white/10 px-6 py-3 font-black text-white ring-1 ring-white/15">Como funciona</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }} className="rounded-[2.2rem] bg-white/10 p-4 shadow-2xl ring-1 ring-white/15 backdrop-blur">
            <div className="rounded-[1.8rem] bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: BRAND.coral }}>Resumo nacional</p>
                  <h2 className="mt-1 text-2xl font-black" style={{ color: BRAND.navy }}>Internações CID-10 Cap. V</h2>
                </div>
                <Icon name="heartPulse" size={30} color={BRAND.teal} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl p-4" style={{ backgroundColor: BRAND.cream }}><p className="text-sm text-slate-500">Brasil</p><p className="text-3xl font-black" style={{ color: BRAND.navy }}>{formatNumber(totalBr)}</p></div>
                <div className="rounded-2xl p-4" style={{ backgroundColor: BRAND.cream }}><p className="text-sm text-slate-500">São Paulo</p><p className="text-3xl font-black" style={{ color: BRAND.coral }}>{formatNumber(totalSp)}</p></div>
              </div>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ufRows} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="heroGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={BRAND.teal} stopOpacity={0.45} /><stop offset="100%" stopColor={BRAND.teal} stopOpacity={0.02} /></linearGradient>
                    </defs>
                    <CartesianGrid stroke={BRAND.sand} strokeDasharray="4 6" vertical={false} />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area name="Brasil" type="monotone" dataKey="Total" stroke={BRAND.teal} strokeWidth={3} fill="url(#heroGrad)" />
                    <Line name="SP" type="monotone" dataKey="SP" stroke={BRAND.coral} strokeWidth={4} dot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="problema" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionKicker>O desafio</SectionKicker>
            <h2 className="mt-2 text-4xl font-black md:text-5xl" style={{ color: BRAND.navy }}>Dados existem. A decisão ainda chega tarde.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">O DATASUS concentra uma das bases mais ricas da saúde pública brasileira. A barreira está em transformar tabelas técnicas em leitura rápida para quem precisa planejar leitos, orçamento e rede de cuidado.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard iconName="users" label="Cidade de SP" value={formatNumber(spCityTotal)} caption="Internações municipais no recorte da planilha, com período Fev/2019–Fev/2026." />
            <StatCard iconName="activity" label="2025 em SP capital" value={formatNumber(spCity2025)} caption="Maior patamar anual do período consolidado no município." tone="coral" />
            <StatCard iconName="wallet" label="Participação estadual" value={formatPercent(spShare)} caption="São Paulo concentra quase um quarto do volume nacional acumulado." />
          </div>
        </div>
      </section>

      <Dashboard />

      <section id="metodo" className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <div className="mb-8 max-w-3xl">
          <SectionKicker>Como a MindLink funciona</SectionKicker>
          <h2 className="mt-2 text-4xl font-black md:text-5xl" style={{ color: BRAND.navy }}>Da tabela técnica ao insight de gestão</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">A complexidade fica nos bastidores. O gestor enxerga tendências, gargalos e prioridades em uma interface clara.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MethodCard iconName="database" title="Coleta" text="Extração de dados públicos do SIH-SUS/DATASUS por ano, UF, município, CID-10, idade, custo e permanência." />
          <MethodCard iconName="shield" title="Tratamento" text="Padronização dos períodos, nomes, classificações e indicadores para garantir comparação confiável." />
          <MethodCard iconName="search" title="Indicadores" text="Volume, participação, crescimento, valor médio, dias-leito estimados e ranking de pressão assistencial." />
          <MethodCard iconName="brain" title="Decisão" text="Dashboard e linguagem executiva para apoiar planejamento, priorização da RAPS e alocação de recursos." />
        </div>
      </section>

      <section id="impacto" className="px-4 py-20 sm:px-8" style={{ backgroundColor: BRAND.navy }}>
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: BRAND.coral }}>Impacto esperado</p>
            <h2 className="mt-2 text-4xl font-black text-white md:text-5xl">Menos intuição. Mais evidência para cuidar melhor.</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/72">A MindLink nasce como piloto em São Paulo, mas a arquitetura é replicável para outros estados, municípios e capítulos CID-10.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {["Visão estratégica", "Planejamento hospitalar", "Gestão financeira", "Escalabilidade"].map((title, index) => (
              <div key={title} className="rounded-[1.6rem] bg-white/10 p-5 ring-1 ring-white/15">
                <p className="text-3xl font-black text-white">{index + 1}</p>
                <h3 className="mt-2 font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {index === 0 && "Mapa e rankings para identificar regiões críticas e direcionar investigação."}
                  {index === 1 && "Permanência média e dias-leito estimados como proxy de pressão sobre capacidade."}
                  {index === 2 && "Valor médio e custo estimado para priorizar ações de maior impacto."}
                  {index === 3 && "Pipeline reaproveitável para novas cargas do DATASUS e novos recortes analíticos."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-4 py-10 sm:px-8" style={{ backgroundColor: BRAND.cream }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-slate-200 pt-8 md:flex-row md:items-center md:justify-between">
          <div><p className="font-black tracking-[0.24em]" style={{ color: BRAND.navy }}>MINDLINK</p><p className="mt-1 text-sm text-slate-500">Mental Insight · Data Connection</p></div>
          <p className="text-sm text-slate-500">Fonte dos dados: Ministério da Saúde · SIH-SUS/DATASUS · recorte CID-10 Capítulo V.</p>
          <a href="#top" className="text-sm font-black" style={{ color: BRAND.teal }}>Voltar ao topo ↑</a>
        </div>
      </footer>
    </main>
  );
}
