export const PERIODS = new Map<string, number>([
  ["ANNUAL", 1],
  ["MONTHLY", 12],
  ["FORTNIGHTLY", 26],
  ["WEEKLY", 52],
]);

export type PeriodKey = "ANNUAL" | "MONTHLY" | "FORTNIGHTLY" | "WEEKLY";
