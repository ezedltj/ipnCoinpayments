import { O } from 'ts-toolbelt';
import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withSubtotal,
  withShippingFee,
  withTax,
  withFee,
  withInvoice,
  withCustom,
  withExtra,
  withCommon,
  withTx,
  withBuyerInfoFull,
  withBuyerShippingAddress,
} from './common.types';
import { withIterableKeys, withShipping } from './util.types';

export type CartIPNHead = O.Merge<BaseIPN, { type: IPN_TYPES.CART }>;

export type CartIPNItemFields = {
  item_name: string;
  item_amount: string;
  item_quantity: string;
  item_number: string;
  item_on1: string;
  item_on2: string;
  item_ov1: string;
  item_ov2: string;
};

export type CartIPNFields = O.MergeAll<
  {},
  [
    with2Currency,
    withSubtotal,
    withShippingFee,
    withTax,
    withFee,
    withInvoice,
    withCustom,
    withExtra,
    withCommon,
    withTx,
    withBuyerInfoFull,
    withBuyerShippingAddress,
    withIterableKeys<CartIPNItemFields>,
  ]
>;

export type CartIPN =
  | O.Merge<CartIPNHead, CartIPNFields>
  | O.Merge<CartIPNHead, withShipping<CartIPNFields>>;

export type CartIPNLike = O.Merge<CartIPNHead, O.Record<string, string>>;
