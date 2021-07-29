import { O } from 'ts-toolbelt';
import { BaseIPN, IPN_TYPES, withCurrency, withTx } from './common.types';

export type withWithdrawalId = {
  id: string; // The ID of the withdrawal ('id' field returned from 'create_withdrawal'.)
};

export type WithdrawalIPNHead = O.Merge<
  BaseIPN,
  { type: IPN_TYPES.WITHDRAWAL }
>;

export type WithdrawalIPNFields = O.MergeAll<
  {},
  [withCurrency, Partial<withTx>, withWithdrawalId]
>;

export type WithdrawalIPN = O.Merge<WithdrawalIPNHead, WithdrawalIPNFields>;
