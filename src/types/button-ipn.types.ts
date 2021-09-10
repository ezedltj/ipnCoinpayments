import * as t from 'io-ts';

import {
  IPN_TYPES,
  BaseIPN,
  BuyerInformation,
  ShippingInformation,
} from './common.types';
import { NagativeStatus, PendingStatus, PositiveStatus } from './status.types';

export const ButtonIPNHead = t.intersection([
  BaseIPN,
  t.type({ type: t.literal(IPN_TYPES.BUTTON) }),
]);

export const ButtonIPNRequiredFields = t.type({
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
  item_amount: t.string,
  item_name: t.string,
  quantity: t.number,
});

export const ButtonIPNOptionalFields = t.partial({
  item_number: t.string,
  invoice: t.string,
  custom: t.string,
  on1: t.string,
  ov1: t.string,
  on2: t.string,
  ov2: t.string,
  extra: t.string,
  send_tx: t.string,
  received_amount: t.string,
  received_confirms: t.string,
});

export const ButtonIPNFields = t.intersection([
  ButtonIPNHead,
  ButtonIPNRequiredFields,
  ButtonIPNOptionalFields,
  BuyerInformation,
  ShippingInformation,
]);

export const ButtonIPNDefault = t.intersection([
  ButtonIPNFields,
  t.type({ status: t.union([NagativeStatus, PendingStatus]) }),
]);

export const ButtonIPNPositive = t.intersection([
  ButtonIPNFields,
  t.type({ status: PositiveStatus }),
  t.partial({ send_tx: t.string }),
]);

export const ButtonIPN = t.union([ButtonIPNDefault, ButtonIPNPositive]);
