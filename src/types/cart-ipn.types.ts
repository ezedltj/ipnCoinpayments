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
import { withShipping } from './util.types';

export type CartIPNHead = O.Merge<BaseIPN, { type: IPN_TYPES.CART }>;

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
  ]
>;
// item_name_#	The name of the item that was purchased. The # starts with 1.	Yes
// item_amount_#	The amount per-item in the original currency/coin.	Yes
// item_quantity_#	The quantity of items bought.	Yes
// item_number_#	This is a passthru variable for your own use. [visible to buyer]	No
// item_on1_#
// item_ov1_#
// item_on2_#
// item_ov2_#

export type CartIPN =
  | O.Merge<CartIPNHead, CartIPNFields>
  | O.Merge<CartIPNHead, withShipping<CartIPNFields>>;
