import { Iterate } from './util.types';

import * as t from 'io-ts';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as RA from 'fp-ts/ReadonlyArray';
import * as Rec from 'fp-ts/Record';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';

import { pipe, identity, constFalse } from 'fp-ts/lib/function';

import {
  IPN_TYPES,
  BaseIPN,
  BuyerInformation,
  ShippingInformation,
} from './common.types';
import { NagativeStatus, PendingStatus, PositiveStatus } from './status.types';
import { matchRegex, isLength, runRegex } from '../util';

export const CartIPNHead = t.intersection([
  BaseIPN,
  t.type({ type: t.literal(IPN_TYPES.CART) }),
]);

export const CartIPNRequiredFields = t.type({
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
});

export const CartIPNOptionalFields = t.partial({
  invoice: t.string,
  custom: t.string,
  extra: t.string,
  send_tx: t.string,
  received_amount: t.string,
  received_confirms: t.string,
});

export const CartIPNFields = t.intersection([
  CartIPNHead,
  CartIPNRequiredFields,
  CartIPNOptionalFields,
  BuyerInformation,
  ShippingInformation,
]);

export const CartIPNDefault = t.intersection([
  CartIPNFields,
  t.type({
    status: t.union([NagativeStatus, PendingStatus]),
  }),
]);

export const CartIPNPositive = t.intersection([
  CartIPNFields,
  t.type({
    status: PositiveStatus,
  }),
  t.partial({ send_tx: t.string }),
]);

export const CartIPNPartial = t.union([CartIPNDefault, CartIPNPositive]);

type CartIPNPartial = t.TypeOf<typeof CartIPNPartial>;

type ExtraCartIPNRawFields = {
  item_name_: string;
  item_amount_: string;
  item_quantity_: string;
  item_number_?: string;
  item_on1_?: string;
  item_ov1_?: string;
  item_on2_?: string;
  item_ov2_?: string;
};

type ExtraCartIPNFields = Iterate<ExtraCartIPNRawFields>;

export type CartIPN = CartIPNPartial & ExtraCartIPNFields;

const cartIpnIterableFields = new RegExp(
  /^(item_name|item_amount|item_quantity|item_number|item_on1|item_ov1|item_on2|item_ov2)_\d+$/,
);

const requiredCartIpnIterableFields = [
  /item_name/,
  /item_amount/,
  /item_quantity/,
];

export const isCartIPNFull = (cartIPN: CartIPNPartial): cartIPN is CartIPN =>
  pipe(
    cartIPN,
    Object.keys,
    RA.filter(matchRegex(cartIpnIterableFields)),
    RA.map(S.split(/_(?=\d+$)/g)),
    RA.traverse(O.Applicative)(O.fromPredicate(isLength(2))),
    O.map(RNEA.groupBy(([_a, b]) => b)),
    O.map(Rec.map(RNEA.map(RNEA.head))),
    O.map(Rec.map(runRegex(requiredCartIpnIterableFields))),
    O.map(Rec.every<boolean>(identity)),
    O.getOrElse(constFalse),
  );
