export const URL_REGEX_PREFIX = /\b(((https?|ftps?):\/\/|(www\.))[a-zA-Z0-9\.\$\-_\+!\*',\/\?:@=&%#~;()]+)/;
export const URL_REGEX_EXT = /\b([a-zA-Z0-9\.\$\-_\+!\*',\/\?:=&%#~;()]+\.[com|org|net|int|edu|gov|mil]+)/;
export const EMAIL_REGEX = /\b([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+))/;
export const URL_REGEX_PREFIX_G = /\b(((https?|ftps?):\/\/|(www\.))[a-zA-Z0-9\.\$\-_\+!\*',\/\?:@=&%#~;()]+)/g;
export const URL_REGEX_EXT_G = /\b([a-zA-Z0-9\.\$\-_\+!\*',\/\?:=&%#~;()]+\.[com|net|co]+)/g;
export const EMAIL_REGEX_G = /\b([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+))/g;

/**
 * Following function will ensure perfect match or regex.
 */
export const testURLRegex = (str) => {
  let match = URL_REGEX_PREFIX.exec(str);
  if (match && match[0] === str) {
    return true;
  }
  match = URL_REGEX_EXT.exec(str);
  if (match && match[0] === str) {
    return true;
  }
  return false;
};

export const getURLMatch = (str) => {
  let match = URL_REGEX_PREFIX.exec(str);
  if (match && match[0] === str) {
    return match;
  }
  match = URL_REGEX_EXT.exec(str);
  if (match && match[0] === str) {
    return match;
  }
  return undefined;
};

export const getURLMatchGlobal = (str) => {
  let match = URL_REGEX_PREFIX_G.exec(str);
  if (match && match[0] === str) {
    return match;
  }
  match = URL_REGEX_EXT_G.exec(str);
  if (match && match[0] === str) {
    return match;
  }
  return null;
};
