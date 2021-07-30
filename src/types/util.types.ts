import { withBuyerShippingAddress } from './common.types';
import { O } from 'ts-toolbelt';

export type withShipping<T extends object> = O.Merge<
  T,
  withBuyerShippingAddress
>;

export type withIterableKeys<T extends object> = {
  [Property in keyof T as `${string & Property}_${number}`]: T[Property];
};

// Incoming
export type Raw<T extends object> = {
  [P in keyof T]: string;
};
