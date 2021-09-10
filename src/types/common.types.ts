import * as t from 'io-ts';

export enum IPN_TYPES {
  SIMPLE = 'simple',
  BUTTON = 'button',
  CART = 'cart',
  DONATION = 'donation',
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  API = 'api',
}

export const BaseIPN = t.type({
  ipn_version: t.literal('1.0'),
  ipn_mode: t.literal('hmac'),
  ipn_id: t.string,
  merchant: t.string,
});

export const BuyerInformationRequiredFields = t.type({
  first_name: t.string,
  last_name: t.string,
  email: t.string,
});

export const BuyerInformationOptionalFields = t.partial({
  company: t.string,
});

export const BuyerInformation = t.intersection([
  BuyerInformationRequiredFields,
  BuyerInformationOptionalFields,
]);

export const ShippingInformation = t.partial({
  address1: t.string,
  address2: t.string,
  city: t.string,
  state: t.string,
  zip: t.string,
  country: t.string,
  country_name: t.string,
  phone: t.string,
});
