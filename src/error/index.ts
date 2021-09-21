import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import { pipe, constant } from 'fp-ts/function';
import * as t from 'io-ts';

export const handleError = (errorMessage: string) => (value: unknown) => ({
  message: errorMessage,
  given: value,
});

export const handleValidationError =
  (errorMessage: string) => (validationError: t.ValidationError[]) =>
    pipe(
      validationError,
      RA.head,
      O.map(validationError => validationError.context),
      O.chain(RA.head),
      O.map(context => context.actual),
      O.map(handleError(errorMessage)),
      O.getOrElse(constant({ message: 'Unexpected Error' })),
    );

export const CoinpaymentsIPNError =
  (message: string) =>
  <T extends any>(given: T) =>
    new (class CoinpaymentsIPNError extends Error {
      public message: string;
      public given: Record<string, unknown>;
      constructor(message, given) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.message = message;
        this.given = given;
        Object.setPrototypeOf(this, CoinpaymentsIPNError);
      }
    })(message, given);
