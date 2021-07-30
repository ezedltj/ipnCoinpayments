import { O } from 'ts-toolbelt';
import { BaseIPN } from './common.types';

// Not in enum
export type UnknownIPNHead = O.Merge<BaseIPN, { type: string }>;
export type UnknownIPNFields = O.Record<PropertyKey, string>;

export type UnknownIPN = O.Merge<UnknownIPNHead, UnknownIPNFields>;
