import { EMAIL_REGEX } from './regex';

export function isEmail(url: string): boolean {
  return EMAIL_REGEX.test(url);
}

// http:, https:, ftp:, mailto:
export function hasProtocol(url: string): boolean {
  return /^[a-zA-Z0-9]+:(\/\/)?/.test(url);
}

// #hash, /path, ./path
export function isRelative(url: string) {
  return /^[#\/]|(\.\/)/.test(url);
}

/**
 * Adds protocol to url if needed.
 */
export function normalizeUrl(url: string) {
  if (!url || hasProtocol(url) || isRelative(url)) {
    return url;
  }

  if (isEmail(url)) {
    return `mailto:${url}`;
  }

  return `http://${url}`;
}
