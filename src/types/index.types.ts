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

interface BaseIPN extends ParsedUrlQueryInput {
  ipn_version: string;
  ipn_mode: 'hmac';
  ipn_id: string;
  merchant: string;
  status: CoinpaymentIPNStatus;
  status_text: string;
  txn_id: string;
}

interface withCommon {
  send_tx: string;
  received_amount: string;
  received_confirms: string;
}

interface with2Currency {
  currency1: string;
  currency2: string;
  amount1: string;
  amount2: string;
  subtotal: string;
  on1: string;
  ov1: string;
  on2: string;
  ov2: string;
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
interface withItemInfo {
  item_name: string;
  item_number: string;
}
interface withInvoice {
  invoice: string;
}
interface withCustom {
  custom: string;
}
interface withExtra {
  extra: string;
}

type CommonGroup1 = with2Currency & withShippingFee & withTax & withFee;

type CommonGroup12 = withItemAmount;

type CommonGroup13 = withItemInfo;

type SimpleIPN = BaseIPN &
  with2Currency &
  withShippingFee &
  withTax &
  withFee &
  withItemInfo &
  withInvoice &
  withCustom &
  withNet &
  withCommon;

interface SimpleIPNz extends BaseIPN {
  // CommonGroup12

  // withCommon;
  type: 'simple';
  item_desc: string;
}
interface ButtonIPN extends BaseIPN {
  // CommonGroup12
  // withItemInfo &
  // withInvoice &
  // withCustom &
  // withCommon;
  // withNet &
  // withExtra
  type: 'button';
  quantity: string;
}
interface DonationIPN extends BaseIPN {
  // CommonGroup1
  // withItemInfo
  // withInvoice
  // withCustom
  // withCommon
  // withExtra
  // withNet
  type: 'donation';
}
interface CartIPN extends BaseIPN {
  // CommonGroup1
  // withInvoice
  // withCustom
  // withCommon
  // withExtra
  type: 'cart';
  item_name_1: string;
  item_amount_1: string;
  item_quantity_1: string;
  item_number_1: string;
  item_on1_1: string;
  item_ov1_1: string;
  item_on2_1: string;
  item_ov2_1: string;
}

// -----------------
interface ApiIPN extends BaseIPN {
  // with2Currency
  // withFee
  // withItemInfo
  // withInvoice
  // withCustom
  // withCommon
  type: 'api';
  buyer_name: string;
  email: string;
}

interface DepositIPN extends BaseIPN {
  type: 'deposit';
  address: string;
  dest_tag?: string;
  currency: string;
  confirms: number;
  amount: string;
  amounti: string;
  fee?: string; // Only positive
  feei?: string; // Only positive
  fiat_coin: string; // The ticker code of the fiat currency you selected on the Merchant Settings tab of the Account Settings page (USD, EUR, etc.) Make sure to check this for accuracy for security in your IPN handler! Huh?
  fiat_amount: string;
  fiat_amounti: string;
  fiat_fee?: string; // Only positive
  fiat_feei?: string; // Only positive
  label?: string;
}
interface WithdrawalIPN extends BaseIPN {
  type: 'withdrawal';
  id: string;
  address: string;
  currency: string;
  amount: string;
  amounti: string;
}

interface BuyerIPN {
  first_name: string;
  last_name: string;
  company: string;
  email: string;
}
interface BuyerWithShippingFeeAddressIPN {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  country_name: string;
  phone: string;
}
