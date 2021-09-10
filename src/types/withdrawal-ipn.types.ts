import * as t from 'io-ts';

import { IPN_TYPES, BaseIPN } from './common.types';
import { Number } from './util.types';
import { isNumberLT } from '../util';

export const WithdrawalStatusFailed = Number(isNumberLT(0));
export const WithdrawalStatusEmailConfrimation = t.literal(0);
export const WithdrawalStatusPending = t.literal(1);
export const WithdrawalStatusComplate = t.literal(2);

export const WithdrawalStatus = t.union([
  WithdrawalStatusFailed,
  WithdrawalStatusEmailConfrimation,
  WithdrawalStatusPending,
  WithdrawalStatusComplate,
]);

export const WithdrawalIPNHead = t.intersection([
  BaseIPN,
  t.type({ type: t.literal(IPN_TYPES.WITHDRAWAL) }),
]);

export const WithdrawalIPNRequiredFields = t.type({
  id: t.string,
  status: WithdrawalStatus,
  status_text: t.string,
  address: t.string,
  currency: t.string,
  amount: t.string,
  amounti: t.string,
});

// Questionable -> Status 1 or 2?
export const WithdrawalIPNOptionalFields = t.partial({
  txn_id: t.string,
});

export const WithdrawalIPN = t.intersection([
  WithdrawalIPNHead,
  WithdrawalIPNRequiredFields,
  WithdrawalIPNOptionalFields,
]);
