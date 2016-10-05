import { enumeration } from 'akutil-common';

const attributeValuesToEnumObject = values =>
  values.reduce((acum, val) => {
    acum[val.toUpperCase()] = val;
    return acum;
  }, {});

const APPEARANCE_VALUES = [
  'primary',
  'standard',
  'subtle',
  'link',
];
const TYPE_VALUES = [
  'button',
  'submit',
];

const APPEARANCE = attributeValuesToEnumObject(APPEARANCE_VALUES);
const TYPE = attributeValuesToEnumObject(TYPE_VALUES);

const appearancePropertyValues = {
  attribute: 'appearance',
  values: APPEARANCE_VALUES,
  invalidDefault: APPEARANCE.STANDARD,
};

const typePropertyValues = {
  attribute: 'type',
  values: TYPE_VALUES,
  missingDefault: 'button',
  invalidDefault: 'button',
};

export const appearance = {
  enumeration: enumeration(appearancePropertyValues)({ attribute: true }),
  values: APPEARANCE,
};

export const type = {
  enumeration: enumeration(typePropertyValues)({ attribute: true }),
  values: TYPE,
};
