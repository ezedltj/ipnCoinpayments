import * as t from 'io-ts';

import { ApiIPN } from './api-ipn.types';
import { ButtonIPN } from './button-ipn.types';
import { CartIPNPartial } from './cart-ipn.types';
import { DepositIPN } from './deposit-ipn.types';
import { DonationIPN } from './donation-ipn.types';
import { SimpleIPN } from './simple-ipn.types';
import { WithdrawalIPN } from './withdrawal-ipn.types';

export const CoinpaymentsIPN = t.union([
  ApiIPN,
  ButtonIPN,
  CartIPNPartial,
  DepositIPN,
  DonationIPN,
  SimpleIPN,
  WithdrawalIPN,
]);
