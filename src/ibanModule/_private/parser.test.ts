import test from "ava";
import { parseIban, PARSER_ERROR } from "./parser.js";

test("Simple pass", (t) => {
  t.deepEqual(parseIban("GB82 WEST 1234 5698 7654 32"), {
    success: true,
    iban: "GB82WEST12345698765432",
  });
});

test("Identifies invalid country code", (t) => {
  t.deepEqual(parseIban("XX82 WEST 1234 5698 7654 32"), {
    success: false,
    error: PARSER_ERROR.InvalidCountry,
  });
});

test("Identifies invalid length", (t) => {
  t.deepEqual(parseIban("GB82 WEST 1234 5698 7654 32XX"), {
    success: false,
    error: PARSER_ERROR.InvalidLength,
  });
});

test("Identifies invalid characters", (t) => {
  t.deepEqual(parseIban("GB82 west 1234 5698 7654 32"), {
    success: false,
    error: PARSER_ERROR.InvalidCharacter,
  });
  t.deepEqual(parseIban("GB82 ÉPÉE 1234 5698 7654 32"), {
    success: false,
    error: PARSER_ERROR.InvalidCharacter,
  });
});

test("Identifies invalid check digits", (t) => {
  t.deepEqual(parseIban("GB81 WEST 1234 5698 7654 32"), {
    success: false,
    error: PARSER_ERROR.InvalidCheckDigits,
  });
});
