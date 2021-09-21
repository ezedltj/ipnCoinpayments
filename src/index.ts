import { apply, pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

import { ParsedUrlQueryInput } from 'querystring';
import { processIPNData, parseIPNSecret, parseHmac } from './internal';

export const processIPN =
  <T extends string>(maybeIPNSecret: T) =>
  <P extends string>(maybeHMAC: P) =>
  <Q extends Object & ParsedUrlQueryInput>(maybeIpn: Q) =>
    pipe(
      E.of(processIPNData),
      E.ap(parseIPNSecret(maybeIPNSecret)),
      E.ap(parseHmac(maybeHMAC)),
      E.chain(apply(maybeIpn)),
    );
