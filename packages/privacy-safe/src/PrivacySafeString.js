const SafeString = value => ({
  get value() {
    return value;
  },
  set value(x) {
    // do nothing
  },

  get isPrivacySafeString() {
    return typeof value === 'string';
  },
  set isPrivacySafeString(x) {
    // do nothing
  },

  valueOf: () => value,
  toString: () => value,
});

export const isPrivacySafeString = object => Boolean(Boolean(object) && typeof object === 'object' && object.isPrivacySafeString);

export const privacySafeString = value => (isPrivacySafeString(value) ? value : SafeString(value));

/**
 * Use this when you explicitly need to collect user entered data. Such as NPS survey responses.
 * @param value
 */
export const dangerouslyCreateSafeString = privacySafeString;

/**
 * Provide a list of acceptable values to ensure we do not unintentionally capture user data
 * @param {Array} allowedStrings - Static string values representing allowed words for this property
 * @returns {SafeString}
 */
export const markAsSafe = (...allowedStrings) => value => (
  allowedStrings.includes(value) ? SafeString(value) : value
);
