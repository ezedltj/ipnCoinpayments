import crypto from 'crypto';
import qs from 'querystring';
import CoinpaymentsIPNError from './error';
import {
  CoinpaymentsIPNLike,
  IPN_DATA,
  IPN_TYPES,
  CoinpaymentsIPN,
  IPNType,
  SimpleIPN,
} from './types/index.types';

const parseObject = (obj: unknown): NodeJS.Dict<unknown> | undefined => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return obj as NodeJS.Dict<unknown>;
  }
  return undefined;
};

const parseString = (s: unknown): string | undefined => {
  if (Object.prototype.toString.call(s) === '[object String]') {
    return s as string;
  }
  return undefined;
};

const parseIPNType = (type: string): IPNType | undefined => {
  switch (type) {
    case IPN_TYPES.SIMPLE:
      return IPN_TYPES.SIMPLE;
    case IPN_TYPES.BUTTON:
      return IPN_TYPES.BUTTON;
    case IPN_TYPES.DONATION:
      return IPN_TYPES.DONATION;
    case IPN_TYPES.CART:
      return IPN_TYPES.CART;
    case IPN_TYPES.API:
      return IPN_TYPES.API;
    case IPN_TYPES.DEPOSIT:
      return IPN_TYPES.DEPOSIT;
    case IPN_TYPES.WITHDRAWAL:
      return IPN_TYPES.WITHDRAWAL;
    default:
      return undefined;
  }
};

const parseIPNLike = (ipnData: unknown): CoinpaymentsIPNLike | undefined => {
  const ipnObj = parseObject(ipnData);
  if (!ipnObj) return undefined;
  if (!ipnObj.hasOwnProperty('version') || ipnObj.version !== IPN_DATA.VERSION)
    return undefined;
  if (
    !ipnData.hasOwnProperty('ipn_mode') ||
    ipnObj.ipn_mode !== IPN_DATA.IPN_MODE
  )
    return undefined;
  if (!ipnObj.hasOwnProperty('ipn_id')) return undefined;
  if (!ipnObj.hasOwnProperty('merchant')) return undefined;

  const typeString = parseString(ipnObj.type);
  if (!typeString) return undefined;
  const type = parseIPNType(typeString);
  if (!type) return undefined;

  return ipnObj as CoinpaymentsIPNLike;
};

const verify = (
  hmac: string,
  ipnSecret: string,
  ipnBody: CoinpaymentsIPNLike,
): boolean => {
  if (!hmac.length) throw new CoinpaymentsIPNError(`HMAC cannot be empty`);
  if (!ipnSecret.length)
    throw new CoinpaymentsIPNError(`IPN secret cannot be empty`);

  // Coinpayments backend is PHP
  // http://php.net/manual/en/function.urlencode.php
  const paramString = qs.stringify(ipnBody).replace(/%20/g, `+`);
  const calcHmac = crypto
    .createHmac(`sha512`, ipnSecret)
    .update(paramString)
    .digest(`hex`);

  if (hmac !== calcHmac) return false;
  return true;
};

const processIPN = (
  hmac: string,
  ipnSecret: string,
  ipnData: unknown,
): CoinpaymentsIPN => {
  const ipnLike = parseIPNLike(ipnData);
  if (!ipnLike) throw new CoinpaymentsIPNError('Invalid IPN data', ipnData);

  const verified = verify(hmac, ipnSecret, ipnLike);
  if (!verified)
    throw new CoinpaymentsIPNError('Unverifiable IPN data', ipnLike);

  switch (ipnLike.type) {
    case IPN_TYPES.SIMPLE:
      return parseSimpleIPN(ipnLike);
    case IPN_TYPES.BUTTON:
      return parseButtonIPN(ipnLike);
    case IPN_TYPES.DONATION:
      return parseDonationIPN(ipnLike);
    case IPN_TYPES.CART:
      return parseCartIPN(ipnLike);
    case IPN_TYPES.API:
      return parseApiIPN(ipnLike);
    case IPN_TYPES.DEPOSIT:
      return parseDepositIPN(ipnLike);
    case IPN_TYPES.WITHDRAWAL:
      return parseWithdrawalIPN(ipnLike);
    default:
      return undefined;
  }
};

const parseSimpleIPN = (ipnLike: CoinpaymentsIPNLike): SimpleIPN => {};
const parseButtonIPN = (ipnLike: CoinpaymentsIPNLike): ButtonIPN => {};
const parseDonationIPN = (ipnLike: CoinpaymentsIPNLike): DonationIPN => {};
const parseCartIPN = (ipnLike: CoinpaymentsIPNLike): CartIPN => {};
const parseApiIPN = (ipnLike: CoinpaymentsIPNLike): ApiIPN => {};
const parseDepositIPN = (ipnLike: CoinpaymentsIPNLike): DepositIPN => {};
const parseWithdrawalIPN = (ipnLike: CoinpaymentsIPNLike): WithdrawalIPN => {};

export { processIPN };
