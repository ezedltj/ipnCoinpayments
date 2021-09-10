import * as RA from 'fp-ts/ReadonlyArray';
import { pipe, apply } from 'fp-ts/function';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as N from 'fp-ts/number';
import * as Boolean from 'fp-ts/boolean';
import * as Semi from 'fp-ts/Semigroup';

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
