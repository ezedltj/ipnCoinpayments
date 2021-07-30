import { O } from 'ts-toolbelt';
import {
  BaseIPN,
  IPN_TYPES,
  with2Currency,
  withFee,
  withBuyerInfo,
  withItemName,
  withItemNumber,
  withInvoice,
  withCustom,
  withCommon,
  withTx,
} from './common.types';

export type ApiIPNHead = O.Merge<BaseIPN, { type: IPN_TYPES.API }>;

export type ApiIPNFields = O.MergeAll<
  {},
  [
    with2Currency,
    withFee,
    withBuyerInfo,
    Partial<withItemName>,
    Partial<withItemNumber>,
    withInvoice,
    withCustom,
    withCommon,
    withTx,
  ]
>;

export type ApiIPN = O.Merge<ApiIPNHead, ApiIPNFields>;

export type ApiIPNLike = O.Merge<ApiIPNHead, O.Record<string, string>>;
