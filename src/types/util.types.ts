import { withBuyerShippingAddress } from './common.types';
import { O } from 'ts-toolbelt';

export type withShipping<T extends object> = O.Merge<
  T,
  withBuyerShippingAddress
>;
