import { O } from 'ts-toolbelt';

import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withBuyerInfoFull,
  withCommon,
  withCustom,
  withExtra,
  withFee,
  withInvoice,
  withItemAmount,
  withNet,
  withItemName,
  withTx,
  withShippingFee,
  withSingleItemOptions,
  withSubtotal,
  withTax,
  withQuantity,
  withItemNumber,
} from './common.types';

import { withShipping } from './util.types';

export type ButtonIPNHead = O.Merge<BaseIPN, { type: IPN_TYPES.BUTTON }>;

export type ButtonIPNFields = O.MergeAll<
  {},
  [
    with2Currency,
    withSubtotal,
    withSingleItemOptions,
    withShippingFee,
    withTax,
    withFee,
    withNet,
    Partial<withItemNumber>,
    withItemName,
    withItemAmount,
    withInvoice,
    withQuantity,
    withCustom,
    withExtra,
    withCommon,
    withTx,
    withBuyerInfoFull,
  ]
>;

export type ButtonIPN =
  | O.Merge<ButtonIPNHead, ButtonIPNFields>
  | O.Merge<ButtonIPNHead, withShipping<ButtonIPNFields>>;

export type ButtonIPNLike = O.Merge<ButtonIPNHead, O.Record<string, string>>;
