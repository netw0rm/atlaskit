import * as bytes from 'bytes';

// tslint:disable-next-line:no-bitwise
const ONE_MEGABYTE_IN_BYTES = 1 << 20;

/**
 * Takes a media (file) size in bytes and returns a human readable string
 */
export function toHumanReadableMediaSize(size: number): string {
  const decimalPlaces = size < ONE_MEGABYTE_IN_BYTES ? 0 : 1;
  return bytes.format(size, {unitSeparator: ' ', decimalPlaces});
}

export function getCSSUnitValue(value: number | string): string {
  return typeof value === 'string' ? value : `${value}px`;
}

export * from './errorIcon';
export * from './fileIcon';
export * from './menu';
export * from './placeholder';
export * from './progressBar';
export * from './isRetina';
export * from './ellipsify';
export * from './mediaImage';
