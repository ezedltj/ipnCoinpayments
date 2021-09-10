import * as t from 'io-ts';

import { IPN_TYPES, BaseIPN } from './common.types';
import { PositiveStatus, PendingStatus, NagativeStatus } from './status.types';

export const DepositIPNHead = t.intersection([
  BaseIPN,
  t.type({ type: t.literal(IPN_TYPES.DEPOSIT) }),
]);

export const DepositIPNRequiredFields = t.type({
  deposit_id: t.string,
  txn_id: t.string,
  address: t.string,
  status_text: t.string,
  currency: t.string,
  confirms: t.number,
  amount: t.string,
  amounti: t.string,
  fiat_coin: t.string,
  fiat_amount: t.string,
  fiat_amounti: t.string,
});

export const DepositIPNOptionalFields = t.partial({
  dest_tag: t.string,
  label: t.string,
});

export const DepositIPNFields = t.intersection([
  DepositIPNHead,
  DepositIPNRequiredFields,
  DepositIPNOptionalFields,
]);

export const DefaultDepositIPN = t.exact(
  t.intersection([
    DepositIPNFields,
    t.type({ status: t.union([NagativeStatus, PendingStatus]) }),
  ]),
);

export const PositiveDepositIPN = t.exact(
  t.intersection([
    DepositIPNFields,
    t.type({ status: PositiveStatus }),
    t.partial({
      fee: t.string,
      feei: t.string,
      fiat_fee: t.string,
      fiat_feei: t.string,
    }),
  ]),
);

export const DepositIPN = t.union([DefaultDepositIPN, PositiveDepositIPN]);
