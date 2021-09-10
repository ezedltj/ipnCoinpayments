import * as t from 'io-ts';
import { Predicate } from 'fp-ts/Predicate';

export type Iterate<A> = {
  [Key in keyof A as `${Key & string}${number}`]: A[Key];
};

export const Number = (predicate: Predicate<number>) => {
  return new t.Type<number, number, unknown>(
    'number',
    (input: unknown): input is number => {
      typeof input === 'number' && predicate(input);
      return true;
    },
    (input, context) =>
      typeof input === 'number' && predicate(input)
        ? t.success(input)
        : t.failure(input, context),
    t.identity,
  );
};
