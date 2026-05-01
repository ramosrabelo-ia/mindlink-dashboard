export const BRAND = {
  navy: "#1E3A5F",
  teal: "#0E7C7B",
  coral: "#E07856",
  cream: "#F5F2EC",
  ink: "#2D3142",
  graphite: "#2D3142",
  mist: "#DDEDEA",
  sand: "#E8E2D6",
  white: "#FFFFFF",
};

export const years = [2020, 2021, 2022, 2023, 2024, 2025];

export const ufRows = [
  { year: 2020, RO: 1470, AC: 1011, AM: 266, RR: 163, PA: 3255, AP: 100, TO: 1044, MA: 5009, PI: 2301, CE: 6791, RN: 3033, PB: 2995, PE: 5610, AL: 3274, SE: 875, BA: 4586, MG: 15048, ES: 3091, RJ: 9158, SP: 48425, PR: 17056, SC: 12163, RS: 33807, MS: 1463, MT: 1972, GO: 8639, DF: 3758, Total: 196363 },
  { year: 2021, RO: 1514, AC: 938, AM: 800, RR: 180, PA: 3853, AP: 87, TO: 997, MA: 5504, PI: 2636, CE: 7448, RN: 2944, PB: 3759, PE: 5889, AL: 3322, SE: 853, BA: 5001, MG: 15997, ES: 3043, RJ: 11070, SP: 47683, PR: 17779, SC: 13031, RS: 34334, MS: 1588, MT: 1862, GO: 8972, DF: 3916, Total: 205000 },
  { year: 2022, RO: 1499, AC: 1123, AM: 839, RR: 311, PA: 4181, AP: 130, TO: 1118, MA: 6001, PI: 2801, CE: 8599, RN: 3351, PB: 3947, PE: 6214, AL: 3437, SE: 996, BA: 5710, MG: 19344, ES: 2784, RJ: 12252, SP: 52963, PR: 17907, SC: 16038, RS: 37561, MS: 2502, MT: 2219, GO: 8934, DF: 4277, Total: 227038 },
  { year: 2023, RO: 2455, AC: 1333, AM: 794, RR: 225, PA: 4544, AP: 135, TO: 1388, MA: 6439, PI: 2601, CE: 9636, RN: 3602, PB: 4037, PE: 7054, AL: 3242, SE: 1132, BA: 6300, MG: 23121, ES: 3030, RJ: 12498, SP: 61255, PR: 19136, SC: 19363, RS: 41277, MS: 2529, MT: 2834, GO: 8647, DF: 4310, Total: 252917 },
  { year: 2024, RO: 2150, AC: 1582, AM: 995, RR: 139, PA: 4821, AP: 86, TO: 1409, MA: 6740, PI: 2226, CE: 9595, RN: 2965, PB: 4355, PE: 7753, AL: 3481, SE: 1284, BA: 6448, MG: 24794, ES: 3116, RJ: 13697, SP: 64757, PR: 19605, SC: 21127, RS: 40817, MS: 2421, MT: 2605, GO: 8783, DF: 4026, Total: 261777 },
  { year: 2025, RO: 1892, AC: 1605, AM: 1224, RR: 63, PA: 5346, AP: 33, TO: 1412, MA: 6403, PI: 2239, CE: 10397, RN: 3075, PB: 4199, PE: 9077, AL: 3195, SE: 1402, BA: 6891, MG: 27341, ES: 3109, RJ: 15053, SP: 69688, PR: 20111, SC: 23850, RS: 42283, MS: 2431, MT: 2762, GO: 9907, DF: 4083, Total: 279071 },
];

export const ufNames = {
  RO: ["Rondônia", "Norte", 118, 238], AC: ["Acre", "Norte", 66, 276], AM: ["Amazonas", "Norte", 153, 175], RR: ["Roraima", "Norte", 190, 88], PA: ["Pará", "Norte", 305, 173], AP: ["Amapá", "Norte", 353, 84], TO: ["Tocantins", "Norte", 336, 259],
  MA: ["Maranhão", "Nordeste", 432, 195], PI: ["Piauí", "Nordeste", 475, 235], CE: ["Ceará", "Nordeste", 540, 211], RN: ["Rio Grande do Norte", "Nordeste", 611, 213], PB: ["Paraíba", "Nordeste", 598, 247], PE: ["Pernambuco", "Nordeste", 575, 280], AL: ["Alagoas", "Nordeste", 574, 317], SE: ["Sergipe", "Nordeste", 559, 350], BA: ["Bahia", "Nordeste", 491, 344],
  MT: ["Mato Grosso", "Centro-Oeste", 260, 319], MS: ["Mato Grosso do Sul", "Centro-Oeste", 275, 429], GO: ["Goiás", "Centro-Oeste", 370, 379], DF: ["Distrito Federal", "Centro-Oeste", 413, 353],
  MG: ["Minas Gerais", "Sudeste", 451, 431], ES: ["Espírito Santo", "Sudeste", 541, 444], RJ: ["Rio de Janeiro", "Sudeste", 495, 493], SP: ["São Paulo", "Sudeste", 392, 489],
  PR: ["Paraná", "Sul", 350, 553], SC: ["Santa Catarina", "Sul", 382, 605], RS: ["Rio Grande do Sul", "Sul", 343, 668],
};

export const spCidRows = [
  { cid: "Uso de substâncias psicoativas", short: "Substâncias", values: { 2020: 1828, 2021: 1394, 2022: 1513, 2023: 3878, 2024: 4720, 2025: 4809 }, avgCost: 1387.17, stay: 13.0 },
  { cid: "Esquizofrenia e transtornos delirantes", short: "Esquizofrenia", values: { 2020: 4336, 2021: 4134, 2022: 3823, 2023: 4170, 2024: 4802, 2025: 5026 }, avgCost: 1519.17, stay: 16.8 },
  { cid: "Transtornos de humor [afetivos]", short: "Humor", values: { 2020: 3078, 2021: 2881, 2022: 3017, 2023: 3444, 2024: 3806, 2025: 4112 }, avgCost: 879.68, stay: 13.3 },
  { cid: "Uso de álcool", short: "Álcool", values: { 2020: 1428, 2021: 1120, 2022: 959, 2023: 995, 2024: 1067, 2025: 1063 }, avgCost: 1522.15, stay: 9.6 },
  { cid: "Demência", short: "Demência", values: { 2020: 205, 2021: 159, 2022: 225, 2023: 262, 2024: 246, 2025: 295 }, avgCost: 9802.84, stay: 38.8, insight: "Baixo volume, alto custo médio e maior permanência hospitalar no recorte 2020–2025."},
  { cid: "Transtornos neuróticos/stress/somatoformes", short: "Stress", values: { 2020: 231, 2021: 239, 2022: 188, 2023: 268, 2024: 276, 2025: 307 }, avgCost: 470.93, stay: 9.5 },
  { cid: "Retardo mental", short: "Retardo", values: { 2020: 221, 2021: 202, 2022: 258, 2023: 264, 2024: 276, 2025: 215 }, avgCost: 4315.63, stay: 25.5 },
  { cid: "Outros transtornos mentais", short: "Outros", values: { 2020: 1099, 2021: 1018, 2022: 1139, 2023: 1249, 2024: 1363, 2025: 1444 }, avgCost: 1315.11, stay: 14.7 },
];

export const spAgeRows = [
  { age: "Menor 1", total: 21, v2025: 4 }, { age: "1 a 4", total: 59, v2025: 3 }, { age: "5 a 9", total: 175, v2025: 24 }, { age: "10 a 14", total: 1242, v2025: 188 },
  { age: "15 a 19", total: 5228, v2025: 731 }, { age: "20 a 29", total: 23357, v2025: 4030 }, { age: "30 a 39", total: 24786, v2025: 4390 }, { age: "40 a 49", total: 20990, v2025: 3862 },
  { age: "50 a 59", total: 13298, v2025: 2261 }, { age: "60 a 69", total: 6485, v2025: 1049 }, { age: "70 a 79", total: 2338, v2025: 511 }, { age: "80+", total: 1098, v2025: 218 },
];

export const spAvgCost = [
  { year: 2020, value: 1689.52 }, { year: 2021, value: 1654.3 }, { year: 2022, value: 1535.22 }, { year: 2023, value: 1387.08 }, { year: 2024, value: 1314.36 }, { year: 2025, value: 1264.28 },
];

export const spStay = [
  { year: 2020, value: 13.7 }, { year: 2021, value: 13.0 }, { year: 2022, value: 13.0 }, { year: 2023, value: 14.3 }, { year: 2024, value: 14.9 }, { year: 2025, value: 15.6 },
];
