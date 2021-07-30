import { ApiIPN } from './api-ipn.types';
import { ButtonIPN } from './button-ipn.types';
import { CartIPN } from './cart-ipn.types';
import { DepositIPN } from './deposit-ipn.types';
import { DonationIPN } from './donation-ipn.types';
import { SimpleIPN } from './simple-ipn.types';
import { WithdrawalIPN } from './withdrawal-ipn.types';
import { UnknownIPN } from './unknown-ipn.types';
import { O } from 'ts-toolbelt';
import { BaseIPN, IPN_TYPES } from './common.types';

export type CoinpaymentsIPN =
  | SimpleIPN
  | ButtonIPN
  | DonationIPN
  | CartIPN
  | ApiIPN
  | DepositIPN
  | WithdrawalIPN
  | UnknownIPN;

export type IPN_TYPES_ALL =
  | IPN_TYPES.API
  | IPN_TYPES.BUTTON
  | IPN_TYPES.CART
  | IPN_TYPES.DEPOSIT
  | IPN_TYPES.DONATION
  | IPN_TYPES.SIMPLE
  | IPN_TYPES.WITHDRAWAL;

export type CoinpaymentsIPNLike = O.MergeAll<
  BaseIPN,
  [{ type: IPN_TYPES_ALL }, O.Record<PropertyKey, unknown>]
>;
