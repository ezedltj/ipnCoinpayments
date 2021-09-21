import * as RA from 'fp-ts/ReadonlyArray';
import { pipe, apply, flow } from 'fp-ts/function';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as N from 'fp-ts/number';
import * as Boolean from 'fp-ts/boolean';
import * as Semi from 'fp-ts/Semigroup';
import * as E from 'fp-ts/Either';
import * as S from 'fp-ts/string';
import * as t from 'io-ts';
import { handleValidationError } from './error';

export const isEqualString = (s1: string) => (s2: string) =>
  S.Eq.equals(s1, s2);

export const matchRegex = (regex: RegExp) => (key: string) => regex.test(key);

export const isLength = (n: number) => (arr: ReadonlyArray<any>) =>
  RA.size(arr) === n;

// Meh
export const runRegex = (regs: RegExp[]) => (as: ReadonlyArray<string>) =>
  pipe(
    regs,
    RA.every(reg => pipe(as, RA.exists<string>(matchRegex(reg)))),
  );

export const isNumberEQ = (n: number) => (input: number) =>
  N.Ord.equals(n, input);

export const isNumberLT = (n: number) => (input: number) =>
  N.Ord.compare(n, input) === 1;

export const isNumberGT = (n: number) => (input: number) =>
  N.Ord.compare(n, input) === -1;

export const isNumberGTE = (n: number) => (input: number) =>
  pipe(
    [isNumberEQ, isNumberGT],
    RNEA.map(apply(n)),
    RNEA.map(apply(input)),
    Semi.concatAll(Boolean.SemigroupAny)(false),
  );

export const isNumberLTE = (n: number) => (input: number) =>
  pipe(
    [isNumberEQ, isNumberLT],
    RNEA.map(apply(n)),
    RNEA.map(apply(input)),
    Semi.concatAll(Boolean.SemigroupAny)(false),
  );

export const decodeWithMessage =
  <T extends t.Decoder<any, any>>(d: T) =>
  (errorMessage: string) =>
    flow(d.decode, E.mapLeft(handleValidationError(errorMessage)));
