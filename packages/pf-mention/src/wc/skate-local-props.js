import { prop } from 'skatejs'; // eslint-disable-line no-unused-vars

const object = prop.create({
  default: () => undefined,
  deserialize: JSON.parse,
  serialize: JSON.stringify,
});

const reference = prop.create({
  set(elem, data) {
    const ref = data.newValue;
    if (ref) {
      ref(elem);
    }
  },
});

export const localProp = {
  object,
  reference,
};
