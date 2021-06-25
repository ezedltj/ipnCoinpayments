import { ParsedUrlQueryInput } from 'querystring';

type PaypalRefundStatus = -2;
type CancelledOrTimeoutStatus = -1;
type WaitingForBuyerStatus = 0;
type ReceivedStatus = 1;
type NightlyStatus = 2;
type PaypalPendingStatus = 3;
type InEscrowStatus = 5;
type PaymentCompleteStatus = 100;

type NegativeStatus = PaypalRefundStatus | CancelledOrTimeoutStatus;
type NeutralStatus =
  | WaitingForBuyerStatus
  | ReceivedStatus
  | ReceivedStatus
  | NightlyStatus
  | PaypalPendingStatus
  | InEscrowStatus;
type PositiveStatus = PaymentCompleteStatus;

type CoinpaymentIPNStatus = NegativeStatus | NeutralStatus | PositiveStatus;

enum IPN_TYPES {
  SIMPLE = 'simple',
  BUTTON = 'button',
  DONATION = 'donation',
  CART = 'cart',
  API = 'api',
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

interface BaseIPN extends ParsedUrlQueryInput {
  ipn_version: string;
  ipn_mode: 'hmac';
  ipn_id: string;
  merchant: string;
}

interface withCommon {
  status: CoinpaymentIPNStatus;
  status_text: string;
  send_tx: string;
  received_amount: string;
  received_confirms: string;
}

interface withRequiredTX {
  txn_id: string;
}

interface withOptionalTX {
  txn_id?: string;
}

interface with2Currency {
  currency1: string;
  currency2: string;
  amount1: string;
  amount2: string;
}

interface withSubtotal {
  subtotal: string;
}

interface withSingleItemOptions {
  on1?: string;
  ov1?: string;
  on2?: string;
  ov2?: string;
}

interface withShippingFee {
  shipping: string;
}

interface withTax {
  tax: string;
}
interface withFee {
  fee: string;
}
interface withNet {
  net: string;
}
interface withItemAmount {
  item_amount: string;
}
interface withItemDesc {
  item_desc?: string;
}

interface withSomeItemInfo {
  item_name: string;
  item_number?: string;
}
interface withOptionalItemInfo {
  item_name?: string;
  item_number?: string;
}
interface withInvoice {
  invoice?: string;
}
interface withCustom {
  custom?: string;
}
interface withExtra {
  extra?: string;
}

interface withBuyerInfo {
  buyer_name?: string;
  email?: string;
}

interface withBuyerInfoFull {
  first_name: string;
  last_name: string;
  company?: string;
  email: string;
}

interface withBuyerShippingAddress {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  country_name?: string;
  phone?: string;
}
interface withCurrency {
  address: string;
  currency: string;
  amount: string;
  amounti: string;
}

type SimpleIPN = BaseIPN & { type: IPN_TYPES.SIMPLE } & with2Currency &
  withSubtotal &
  withSingleItemOptions &
  withShippingFee &
  withTax &
  withFee &
  withNet &
  withOptionalItemInfo &
  withItemAmount &
  withItemDesc &
  withInvoice &
  withCustom &
  withCommon &
  withRequiredTX &
  withBuyerInfoFull &
  withBuyerShippingAddress;

type ButtonIPN = BaseIPN & { type: IPN_TYPES.BUTTON } & with2Currency &
  withSubtotal &
  withSingleItemOptions &
  withShippingFee &
  withTax &
  withFee &
  withNet &
  withOptionalItemInfo &
  withItemAmount &
  withInvoice &
  withCustom &
  withExtra &
  withCommon &
  withRequiredTX &
  withBuyerInfoFull &
  withBuyerShippingAddress;

type DonationIPN = BaseIPN & { type: IPN_TYPES.DONATION } & with2Currency &
  withSubtotal &
  withSingleItemOptions &
  withShippingFee &
  withTax &
  withFee &
  withNet &
  withOptionalItemInfo &
  withInvoice &
  withCustom &
  withExtra &
  withCommon &
  withRequiredTX &
  withBuyerInfoFull &
  withBuyerShippingAddress;

type CartIPN = BaseIPN & { type: IPN_TYPES.CART } & with2Currency &
  withSubtotal &
  withShippingFee &
  withTax &
  withFee &
  withInvoice &
  withCustom &
  withExtra &
  withCommon &
  withRequiredTX &
  withBuyerInfoFull &
  withBuyerShippingAddress &
  NodeJS.Dict<string>; // item_name_#...

type ApiIPN = BaseIPN & { type: IPN_TYPES.API } & with2Currency &
  withFee &
  withBuyerInfo &
  withSomeItemInfo &
  withInvoice &
  withCustom &
  withCommon &
  withRequiredTX;

type DepositIPN = BaseIPN & { type: IPN_TYPES.DEPOSIT } & withCurrency & {
    dest_tag?: string;
    confirms: number;
    fee?: string; // Only positive
    feei?: string; // Only positive
    fiat_coin: string; // The ticker code of the fiat currency you selected on the Merchant Settings tab of the Account Settings page (USD, EUR, etc.) Make sure to check this for accuracy for security in your IPN handler! Huh?
    fiat_amount: string;
    fiat_amounti: string;
    fiat_fee?: string; // Only positive
    fiat_feei?: string; // Only positive
    label?: string;
  };

type WithdrawalIPN = BaseIPN & { type: IPN_TYPES.WITHDRAWAL } & withCurrency &
  withOptionalTX & {
    id: string;
  };

export {
  SimpleIPN,
  ButtonIPN,
  DonationIPN,
  CartIPN,
  ApiIPN,
  DepositIPN,
  WithdrawalIPN,
};
