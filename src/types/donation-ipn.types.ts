import * as t from 'io-ts';
import {
  BaseIPN,
  BuyerInformation,
  IPN_TYPES,
  ShippingInformation,
} from './common.types';
import { NagativeStatus, PendingStatus, PositiveStatus } from './status.types';

export const DonationIPNHead = t.intersection([
  BaseIPN,
  t.type({ type: t.literal(IPN_TYPES.DONATION) }),
]);

export const DonationIPNRequiredFields = t.type({
  status_text: t.string,
  txn_id: t.string,
  currency1: t.string,
  currency2: t.string,
  amount1: t.string,
  amount2: t.string,
  subtotal: t.string,
  shipping: t.string,
  tax: t.string,
  fee: t.string,
  net: t.string,
  item_name: t.string,
});

export const DonationIPNOptionalFields = t.partial({
  item_number: t.string,
  invoice: t.string,
  custom: t.string,
  on1: t.string,
  ov1: t.string,
  on2: t.string,
  ov2: t.string,
  extra: t.string,
  received_amount: t.string,
  received_confirms: t.string,
});

export const DonationIPNFields = t.intersection([
  DonationIPNHead,
  DonationIPNRequiredFields,
  DonationIPNOptionalFields,
  BuyerInformation,
  ShippingInformation,
]);

export const DonationIPNDefault = t.intersection([
  DonationIPNFields,
  t.type({ status: t.union([NagativeStatus, PendingStatus]) }),
]);

export const DonationIPNPositive = t.intersection([
  DonationIPNFields,
  t.type({ status: PositiveStatus }),
  t.partial({ send_tx: t.string }),
]);

export const DonationIPN = t.union([DonationIPNDefault, DonationIPNPositive]);
