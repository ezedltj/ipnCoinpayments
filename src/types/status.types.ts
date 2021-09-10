import * as t from 'io-ts';
import { isNumberLT, isNumberGT } from '../util';
import { Number } from './util.types';

export const PaypalRefundStatus = t.literal(-2);
export const CancelledOrTimeoutStatus = t.literal(-1);
export const UnknownNegative = Number(isNumberLT(0));

export const WaitingForBuyerStatus = t.literal(0);
export const ReceivedStatus = t.literal(1);
export const NightlyStatus = t.literal(2);
export const PaypalPendingStatus = t.literal(3);
export const InEscrowStatus = t.literal(5);
export const PaymentCompleteStatus = t.literal(100);
export const UnknownPositive = Number(isNumberGT(100));

export const NagativeStatus = t.union([
  UnknownNegative,
  PaypalRefundStatus,
  CancelledOrTimeoutStatus,
]);

export const PendingStatus = t.union([
  WaitingForBuyerStatus,
  ReceivedStatus,
  ReceivedStatus,
  PaypalPendingStatus,
  InEscrowStatus,
]);
export const PositiveStatus = t.union([
  PaymentCompleteStatus,
  NightlyStatus,
  UnknownPositive,
]);

export const IPNStatus = t.union([
  NagativeStatus,
  PendingStatus,
  PositiveStatus,
]);
