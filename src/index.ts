import crypto from 'crypto';
import qs, { ParsedUrlQueryInput } from 'querystring';
import CoinpaymentsIPNError from './error';

interface IPNBodyType extends ParsedUrlQueryInput {
  ipn_version: string;
  ipn_type:
    | 'simple'
    | 'button'
    | 'cart'
    | 'donation'
    | 'deposit'
    | 'withdrawal'
    | 'api';
  ipn_mode: 'hmac';
  ipn_id: string;
  merchant: string;
}

const verify = (hmac: string, ipnSecret: string, IPNBody: IPNBodyType) => {
  if (!hmac || typeof hmac !== `string`)
    throw new CoinpaymentsIPNError(`Invalid hmac`, hmac);
  if (!ipnSecret || typeof ipnSecret !== `string`)
    throw new CoinpaymentsIPNError(`Invalid ipnSecret`, ipnSecret);
  if (typeof IPNBody !== `object`)
    throw new CoinpaymentsIPNError(`Payload is not an object`, IPNBody);

  // Coinpayments backend is PHP
  // http://php.net/manual/en/function.urlencode.php
  const paramString = qs.stringify(IPNBody).replace(/%20/g, `+`);
  const calcHmac = crypto
    .createHmac(`sha512`, ipnSecret)
    .update(paramString)
    .digest(`hex`);

  if (hmac !== calcHmac) return false;
  return true;
};

export { verify };
