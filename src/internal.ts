import { ParsedUrlQueryInput, stringify } from 'querystring';
import { createHmac } from 'crypto';
import * as E from 'fp-ts/Either';
import * as S from 'fp-ts/string';
import { pipe, constant } from 'fp-ts/function';

import * as t from 'io-ts';
import { decodeWithMessage, isEqualString } from './util';
import { HMAC, IPNSecret } from './types/common.types';
import { handleError } from './error';
import { CoinpaymentsIPN } from './types/index.types';

export const parseHmac = decodeWithMessage(HMAC)('HMAC cannot be empty');

export const parseIPNSecret = decodeWithMessage(IPNSecret)(
  'IPNSecret cannot be empty',
);

export const parseIPNData = decodeWithMessage(CoinpaymentsIPN)(
  'Could not parse Coinpayments IPN',
);

export const stringifyToPHPEncoding = <T extends Object & ParsedUrlQueryInput>(
  payload: T,
) => pipe(payload, stringify, S.replace(/%20/g, '+'));

// TODO: VerifiedPayload type - Chain first?
export const verifyData =
  (ipnSecret: t.TypeOf<typeof IPNSecret>) =>
  (hmac: t.TypeOf<typeof HMAC>) =>
  <T extends Object & ParsedUrlQueryInput>(payload: T) =>
    pipe(
      payload,
      stringifyToPHPEncoding,
      encodedIpnData =>
        createHmac('sha512', ipnSecret).update(encodedIpnData).digest('hex'),
      E.fromPredicate(
        isEqualString(hmac),
        handleError('Given HMAC and calculcated hmac to not match'),
      ),
      E.map(constant(payload)),
    );

export const processIPNData =
  (ipnSecret: t.TypeOf<typeof IPNSecret>) =>
  (hmac: t.TypeOf<typeof HMAC>) =>
  <T extends Object & ParsedUrlQueryInput>(maybeIpn: T) =>
    pipe(maybeIpn, verifyData(ipnSecret)(hmac), E.chain(parseIPNData));
