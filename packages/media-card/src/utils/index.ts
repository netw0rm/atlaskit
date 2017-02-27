import * as bytes from 'bytes';

// tslint:disable-next-line:no-bitwise
const ONE_MEGABYTE_IN_BYTES = 1 << 20;

/**
 * Takes a media (file) size in bytes and returns a human readable string
 */
export function toHumanReadableMediaSize(size: number): string {
  return size < ONE_MEGABYTE_IN_BYTES ?
    bytes.format(size, {unitSeparator: ' ', decimalPlaces: 0}) :
    bytes.format(size, {unitSeparator: ' ', decimalPlaces: 1});
}
