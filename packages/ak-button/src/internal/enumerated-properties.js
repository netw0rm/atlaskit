import { enumeration } from 'akutil-common';


/**
 * @description Helper function to convert an array of strings into
 * an object, which represents the array's values as an enumeration.
 * @private
 * @param {Array} values
 * @returns {Object}
 * @example attributeValuesToEnumObject(['foo', 'bar']) === { FOO: 'foo', BAR: 'bar'}
 */
const attributeValuesToEnumObject = values =>
  values.reduce((acum, val) => {
    acum[val.toUpperCase()] = val;
    return acum;
  }, {});

  /**
   * @description Helper function to export ak-button enumerated attributes.
   * @private
   * @param {String} name - The name of the attribute
   * @param {Array} values - String Array containing valid values for this attribute
   * @param {Object} opts - Optional fields for akutil-common `enumeration` function param.
   * @returns {Object}
   */
const createEnumeration = (name, values, opts = {}) => {
  const enumeratedValues = attributeValuesToEnumObject(values);
  const propertyValues = { attribute: name, values };
  Object.assign(propertyValues, opts);
  return {
    enumeration: enumeration(propertyValues)({ attribute: true }),
    values: enumeratedValues,
  };
};

export const appearance = createEnumeration('appearance', [
  'primary',
  'standard',
  'subtle',
  'link',
]);

export const type = createEnumeration('type', ['button', 'submit'], {
  missingDefault: 'button',
  invalidDefault: 'button',
});

export const spacing = createEnumeration('spacing', ['normal', 'compact', 'none'], {
  missingDefault: 'normal',
  invalidDefault: 'normal',
});
