import { enumeration } from 'akutil-common';

const attributeValuesToEnumObject = values =>
  values.reduce((acum, val) => {
    acum[val.toUpperCase()] = val;
    return acum;
  }, {});

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
