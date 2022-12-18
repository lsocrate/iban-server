/**
 * Parses IBAN according to each country rules.
 * @see https://en.wikipedia.org/wiki/International_Bank_Account_Number#Validating_the_IBAN
 *
 * The general structure follows a step by step approach, where `undefined`
 * signals a parsing failure. If this module starts getting too complex, using
 * Monads could be a good solution.
 *
 */
import { Rules, rulesForCountry } from "./countryRules.js";

const InvalidCountry = Symbol("Invalid Country");
const InvalidLength = Symbol("Invalid length");
const InvalidCharacter = Symbol("Invalid character");
const InvalidCheckDigits = Symbol("Invalid Check Digits");
export const PARSER_ERROR = {
  InvalidCountry,
  InvalidLength,
  InvalidCharacter,
  InvalidCheckDigits,
} as const;

type Result =
  | { success: false; error: typeof PARSER_ERROR[keyof typeof PARSER_ERROR] }
  | { success: true; iban: string };

export const parseIban = (input: string): Result => {
  const compacted = compactInput(input);

  const rules = rulesForCountry(readCountry(compacted));
  if (!rules) {
    return { success: false, error: InvalidCountry };
  }

  if (!isValidLength(rules, compacted)) {
    return { success: false, error: InvalidLength };
  }

  const converted = toInteger(rearrange(compacted));
  if (converted === undefined) {
    return { success: false, error: InvalidCharacter };
  }

  if (!hasValidCheckDigits(converted)) {
    return { success: false, error: InvalidCheckDigits };
  }

  return { success: true, iban: compacted };
};

const compactInput = (input: string): string => input.replace(/\s/g, "");

const readCountry = (compacted: string): string => compacted.slice(0, 2);

const isValidLength = (rules: Rules, compacted: string): boolean =>
  compacted.length === rules.charCount;

const rearrange = (compacted: string): string => {
  const head = compacted.slice(0, 4); // Country Code + Check Digits
  const tail = compacted.slice(4); // Rest of IBAN
  return `${tail}${head}`;
};

const toInteger = (rearranged: string): undefined | bigint => {
  const numeric = replaceLettersWithNumbers(rearranged);
  if (numeric === undefined) return undefined;

  return safeParseBigInt(numeric);
};

const hasValidCheckDigits = (converted: bigint): boolean =>
  converted % 97n === 1n;

const replaceLettersWithNumbers = (input: string): undefined | string => {
  let output = "";
  for (let char of input) {
    const parsedChar = parseChar(char);
    if (parsedChar === undefined) {
      return undefined;
    } else {
      output += parsedChar;
    }
  }
  return output;
};

/**
 * The IBAN *MUST* be converted to bigint, or some other type capable of
 * handling 219-bit unsigned integers. JS number isn't enough.
 */
const safeParseBigInt = (input: string): undefined | bigint => {
  try {
    return BigInt(input);
  } catch (e) {
    return undefined;
  }
};

/**
 * At its core IBAN is just a base 36 system
 * 1. validate it's uppercase
 * 2. parse as base 36
 * 3. turn into string, if valid, otherwise invalid
 */
const parseChar = (char: string): undefined | string => {
  if (char !== char.toUpperCase()) {
    return undefined;
  }

  const parsed = parseInt(char, 36);
  return isNaN(parsed) ? undefined : parsed.toString();
};
