import { O } from 'ts-toolbelt';
import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withSubtotal,
  withSingleItemOptions,
  withShippingFee,
  withTax,
  withFee,
  withNet,
  withItemName,
  withItemNumber,
  withInvoice,
  withCustom,
  withExtra,
  withCommon,
  withTx,
  withBuyerInfoFull,
} from './common.types';
import { withShipping } from './util.types';

export type DonationIPNHead = O.Merge<BaseIPN, { type: IPN_TYPES.DONATION }>;

export type DonationIPNFields = O.MergeAll<
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
    Partial<withItemNumber>,
    withInvoice,
    withCustom,
    withExtra,
    withCommon,
    withTx,
    withBuyerInfoFull,
  ]
>;

export type DonationIPN =
  | O.Merge<DonationIPNHead, DonationIPNFields>
  | O.Merge<DonationIPNHead, withShipping<DonationIPNFields>>;

export type DonationIPNLike = O.Merge<
  DonationIPNHead,
  O.Record<string, string>
>;
