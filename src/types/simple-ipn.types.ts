import { O } from 'ts-toolbelt';

import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withBuyerInfoFull,
  withCommon,
  withCustom,
  withFee,
  withInvoice,
  withItemAmount,
  withItemDesc,
  withItemName,
  withItemNumber,
  withNet,
  withShippingFee,
  withSingleItemOptions,
  withSubtotal,
  withTax,
  withTx,
} from './common.types';

import { withShipping } from './util.types';

export type SimpleIPNHead = O.Merge<BaseIPN, { type: IPN_TYPES.SIMPLE }>;

export type SimpleIPNFields = O.MergeAll<
  {},
  [
    with2Currency,
    withSubtotal,
    withSingleItemOptions,
    withShippingFee,
    withTax,
    withFee,
    withNet,
    withItemName,
    withItemAmount,
    withItemDesc,
    Partial<withItemNumber>,
    withInvoice,
    withCustom,
    withCommon,
    withTx,
    withBuyerInfoFull,
  ]
>;

export type SimpleIPN =
  | O.Merge<SimpleIPNHead, SimpleIPNFields>
  | O.Merge<SimpleIPNHead, withShipping<SimpleIPNFields>>;

export type SimpleIPNLike = O.Merge<SimpleIPNHead, O.Record<string, string>>;
