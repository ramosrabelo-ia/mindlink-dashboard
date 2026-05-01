# MindLink Dashboard - AI Agent Guidelines

## Architecture Overview
This is a single-page React application built with Vite, serving as a landing page and interactive dashboard for visualizing mental health hospitalizations in Brazil's SUS system. The app focuses on CID-10 Chapter V disorders, with São Paulo as the pilot state.

Key components are defined inline in `App.jsx` (600+ lines), including:
- Interactive Brazil map with bubble chart visualization
- State-specific readouts with trend charts
- National and regional rankings
- CID-10 pressure analysis by disorder category
- Age profile and cost/stay metrics

Data flows from static JSON-like structures in `data.js` (UF hospitalizations, CID categories, age groups, costs) through utility functions in `utils.js` (formatting, state building) to Recharts visualizations.

## Development Workflow
- **Local development**: `npm run dev` starts Vite dev server with hot reload
- **Testing**: `npm run test` runs Vitest on `utils.test.js` (data integrity checks, formatting validation)
- **Build**: `npm run build` generates production bundle for GitHub Pages deployment
- **Preview**: `npm run preview` serves built files locally

## Project Conventions
- **Formatting**: Use Portuguese locale (`pt-BR`) for numbers, currency (BRL), and percentages (e.g., `formatNumber(1500)` → "1,5 mil", `formatPercent(24.234)` → "24,2%")
- **Color scheme**: Brand colors defined in `BRAND` object in `data.js` (navy `#1E3A5F`, teal `#0E7C7B`, coral `#E07856`, etc.) - use for charts, accents, and UI consistency
- **Data structure**: Hospitalizations by UF/year in `ufRows`, CID breakdowns in `spCidRows` with `values` object per year
- **Icons**: Custom SVG icons in `icons.jsx` - reference by name (e.g., `<Icon name="brain" />`)
- **Styling**: Tailwind CSS with custom brand colors; components use rounded corners (`rounded-[1.6rem]`), shadows (`ring-1 ring-slate-200`), and motion animations (`framer-motion`)
- **Charts**: Recharts with custom tooltips (`CustomTooltip`), gradients, and responsive containers - always include `margin` props for proper spacing

## Key Files
- `App.jsx`: Entire app logic and components - modify here for new features or UI changes
- `data.js`: Static data sources - update for new years, UFs, or metrics
- `utils.js`: Data processing and formatting - add new formatters or calculations here
- `utils.test.js`: Tests for data integrity - extend for new data validations

## Integration Points
- **Data source**: Public DATASUS/SIH-SUS data, manually curated for CID-10 Chapter V
- **Deployment**: GitHub Pages with base path from repo name (handled in `vite.config.js`)
- **No external APIs**: All data is static and bundled

## Common Patterns
- State management with `useState` for year/metric selections
- `useMemo` for derived data like top states or filtered CID data
- Map interactions: Click UFs to update selected state, with motion animations
- Responsive grid layouts: `grid-cols-2 xl:grid-cols-4` for adaptive columns
- Custom tooltips with brand colors and formatted values</content>
<parameter name="filePath">C:\mindlink-dashboard\AGENTS.md
