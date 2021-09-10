import * as t from 'io-ts';
import { BaseIPN, IPN_TYPES } from './common.types';
import { NagativeStatus, PendingStatus, PositiveStatus } from './status.types';

export const ApiIPNHead = t.intersection([
  BaseIPN,
  t.type({ type: t.literal(IPN_TYPES.API) }),
]);

export const ApiIPNRequiredFields = t.type({
  status_text: t.string,
  txn_id: t.string,
  currency1: t.string,
  currency2: t.string,
  amount1: t.string,
  amount2: t.string,
  fee: t.string,
});

export const ApiIPNOptionalFields = t.partial({
  buyer_name: t.string,
  email: t.string,
  item_name: t.string,
  item_number: t.string,
  invoice: t.string,
  custom: t.string,
  received_amount: t.string,
  received_confirms: t.string,
});

export const ApiIPNFields = t.intersection([
  ApiIPNHead,
  ApiIPNRequiredFields,
  ApiIPNOptionalFields,
]);

export const ApiIPNDefault = t.intersection([
  ApiIPNFields,
  t.type({
    status: t.union([NagativeStatus, PendingStatus]),
  }),
]);

export const ApiIPNPositive = t.intersection([
  ApiIPNFields,
  t.type({
    status: PositiveStatus,
  }),
  t.partial({ send_tx: t.string }),
]);

export const ApiIPN = t.union([ApiIPNDefault, ApiIPNPositive]);
