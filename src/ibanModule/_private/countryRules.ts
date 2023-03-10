import type { Rules } from "./types.js";

export const rulesForCountry = (country: string): undefined | Rules =>
  isSupportedCountry(country) ? countryRules[country] : undefined;

const isSupportedCountry = (
  candidate: string | keyof typeof countryRules
): candidate is keyof typeof countryRules => candidate in countryRules;

const countryRules = {
  AL: { charCount: 28 },
  AD: { charCount: 24 },
  AT: { charCount: 20 },
  AZ: { charCount: 28 },
  BH: { charCount: 22 },
  BY: { charCount: 28 },
  BE: { charCount: 16 },
  BA: { charCount: 20 },
  BR: { charCount: 29 },
  BG: { charCount: 22 },
  CR: { charCount: 22 },
  HR: { charCount: 21 },
  CY: { charCount: 28 },
  CZ: { charCount: 24 },
  DK: { charCount: 18 },
  DO: { charCount: 28 },
  TL: { charCount: 23 },
  EG: { charCount: 29 },
  SV: { charCount: 28 },
  EE: { charCount: 20 },
  FO: { charCount: 18 },
  FI: { charCount: 18 },
  FR: { charCount: 27 },
  GE: { charCount: 22 },
  DE: { charCount: 22 },
  GI: { charCount: 23 },
  GR: { charCount: 27 },
  GL: { charCount: 18 },
  GT: { charCount: 28 },
  HU: { charCount: 28 },
  IS: { charCount: 26 },
  IQ: { charCount: 23 },
  IE: { charCount: 22 },
  IL: { charCount: 23 },
  IT: { charCount: 27 },
  JO: { charCount: 30 },
  KZ: { charCount: 20 },
  XK: { charCount: 20 },
  KW: { charCount: 30 },
  LV: { charCount: 21 },
  LB: { charCount: 28 },
  LY: { charCount: 25 },
  LI: { charCount: 21 },
  LT: { charCount: 20 },
  LU: { charCount: 20 },
  MK: { charCount: 19 },
  MT: { charCount: 31 },
  MR: { charCount: 27 },
  MU: { charCount: 30 },
  MC: { charCount: 27 },
  MD: { charCount: 24 },
  ME: { charCount: 22 },
  NL: { charCount: 18 },
  NO: { charCount: 15 },
  PK: { charCount: 24 },
  PS: { charCount: 29 },
  PL: { charCount: 28 },
  PT: { charCount: 25 },
  QA: { charCount: 29 },
  RO: { charCount: 24 },
  RU: { charCount: 29 },
  LC: { charCount: 32 },
  SM: { charCount: 27 },
  ST: { charCount: 25 },
  SA: { charCount: 24 },
  RS: { charCount: 22 },
  SC: { charCount: 31 },
  SK: { charCount: 24 },
  SI: { charCount: 19 },
  ES: { charCount: 24 },
  SD: { charCount: 18 },
  SE: { charCount: 24 },
  CH: { charCount: 21 },
  TN: { charCount: 24 },
  TR: { charCount: 26 },
  UA: { charCount: 29 },
  AE: { charCount: 23 },
  GB: { charCount: 22 },
  VA: { charCount: 22 },
  VG: { charCount: 24 },
} as const;
