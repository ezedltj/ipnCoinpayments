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

enum IPN_DATA {
  VERSION = '1.0',
  IPN_MODE = 'hmac',
}

enum IPN_TYPES {
  SIMPLE = 'simple',
  BUTTON = 'button',
  DONATION = 'donation',
  CART = 'cart',
  API = 'api',
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

type IPNType =
  | IPN_TYPES.SIMPLE
  | IPN_TYPES.BUTTON
  | IPN_TYPES.DONATION
  | IPN_TYPES.CART
  | IPN_TYPES.API
  | IPN_TYPES.DEPOSIT
  | IPN_TYPES.WITHDRAWAL;

type BaseIPN = {
  ipn_version: IPN_DATA.VERSION;
  ipn_mode: IPN_DATA.IPN_MODE;
  ipn_id: string; // The unique identifier of this IPN
  merchant: string; // Your merchant ID
  type: IPNType;
};

type withCommon = {
  status: CoinpaymentIPNStatus; // Numeric status of the payment
  status_text: string; // A text string describing the status of the payment
  send_tx?: string; // The TX ID of the payment to the merchant. Only included when 'status' >= 100 and if the payment mode is set to ASAP or Nightly or if the payment is PayPal Passthru.
  received_amount: string; // The amount of currency2 received at the time the IPN was generated.
  received_confirms: string; // The number of confirms of 'received_amount' at the time the IPN was generated.
};

type withRequiredTX = {
  txn_id: string; // The unique ID of the payment.
};

type withOptionalTX = {
  txn_id?: string; // The coin transaction ID of the withdrawal.
};

type with2Currency = {
  currency1: string; // The original currency/coin submitted in your button.
  currency2: string; // The coin the buyer chose to pay with.
  amount1: string; // The total amount of the payment in your original currency/coin.
  amount2: string; // The total amount of the payment in the buyer's selected coin.
};

type withSubtotal = {
  subtotal: string; // The subtotal of the order before shipping and tax in your original currency/coin.
};

type withSingleItemOptions = {
  on1?: string; // 1st option name. This lets you pass through a buyer option like size or color.
  ov1?: string; // 1st option value. This would be the buyer's selection such as small, large, red, white.
  on2?: string; // 2nd option name. This lets you pass through a buyer option like size or color.
  ov2?: string; // 2nd option value. This would be the buyer's selection such as small, large, red, white.
};

type withShippingFee = {
  shipping: string; // The shipping charged on the order in your original currency/coin.
};

type withTax = {
  tax: string; // The tax on the order in your original currency/coin.
};
type withFee = {
  fee: string; // The fee on the payment in the buyer's selected coin.
};
type withNet = {
  net: string; // The net amount you received of the buyer's selected coin after our fee and any coin TX fees to send the coins to you.
};
type withItemAmount = {
  item_amount: string; // The amount per-item in the original currency/coin.
};
type withItemDesc = {
  item_desc?: string; // Description of the item that was purchased.
};

type withSomeItemInfo = {
  item_name: string; // The name of the donation.
  item_number?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};
type withOptionalItemInfo = {
  item_name?: string; // The name of the item that was purchased.
  item_number?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};
type withInvoice = {
  invoice?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};
type withCustom = {
  custom?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};
type withExtra = {
  extra?: string; // This is a passthru variable for your own use. [not visible to donator/buyer]
};

type withBuyerInfo = {
  buyer_name?: string; // The name of the buyer.
  email?: string; // Buyer's email address.
};

type withBuyerInfoFull = {
  first_name: string; // Buyer's first name.
  last_name: string; // Buyer's last name.
  company?: string; // Buyer's company name.
  email: string; // Buyer's email address.
};

type withBuyerShippingAddress = {
  address1?: string; // Buyer Street / address line 1
  address2?: string; // Buyer Street / address line 2
  city?: string; // Buyer city
  state?: string; // Buyer state/province
  zip?: string; // Buyer zipcode
  country?: string; // Buyer country ISO 3166
  country_name?: string; // Buyer country pretty
  phone?: string; // Buyer phone number
};
type withCurrency = {
  address: string; // Coin address which was sent to.
  currency: string; // The coin the buyer paid with.
  amount: string; // The total amount of the payment
  amounti: string; // The total amount of the payment in Satoshis
};

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
    fee?: string; // The fee deducted by CoinPayments (only sent when status >= 100)
    feei?: string; // The fee deducted by CoinPayments in Satoshis (only sent when status >= 100)
    fiat_coin: string; // The ticker code of the fiat currency you selected on the Merchant Settings tab of the Account Settings page (USD, EUR, etc.) Make sure to check this for accuracy for security in your IPN handler! Huh?
    fiat_amount: string; // The total amount of the payment in the fiat currency you selected on the Merchant Settings tab of the Account Settings page.
    fiat_amounti: string; // The total amount of the payment in the fiat currency you selected in Satoshis
    fiat_fee?: string; // The fee deducted by CoinPayments in the fiat currency you selected (only sent when status >= 100)
    fiat_feei?: string; // The fee deducted by CoinPayments in the fiat currency you selected in Satoshis (only sent when status >= 100)
    label?: string; // The address label if you have one set
  };

type WithdrawalIPN = BaseIPN & { type: IPN_TYPES.WITHDRAWAL } & withCurrency &
  withOptionalTX & {
    id: string; // The ID of the withdrawal ('id' field returned from 'create_withdrawal'.)
  };

type CoinpaymentsIPNLike = BaseIPN & ParsedUrlQueryInput;
type CoinpaymentsIPN =
  | SimpleIPN
  | ButtonIPN
  | DonationIPN
  | CartIPN
  | ApiIPN
  | DepositIPN
  | WithdrawalIPN;

export {
  CoinpaymentsIPNLike,
  CoinpaymentsIPN,
  SimpleIPN,
  ButtonIPN,
  DonationIPN,
  CartIPN,
  ApiIPN,
  DepositIPN,
  WithdrawalIPN,
  IPN_DATA,
  IPN_TYPES,
  IPNType,
};
