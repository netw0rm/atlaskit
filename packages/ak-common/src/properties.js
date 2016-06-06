import assign from 'object-assign';
import { computeEnumValue } from './attributes';

/* Helper function for creating new extensions to existing properties */
function prop (def) {
  return function (...args) {
      args.unshift({}, def);
      return assign.apply(null, args);
  };
}

/**
  This property extension can be used with skate.
  Usage:
  ```
  properties: {
      respondsTo: properties.enum({values: ['toggle', 'hover'], missingDefault: 'toggle', invalidDefault: 'toggle'})({

      })
  }
  ```
 */
function enum(enumOptions) {
  return prop({
      coerce: value => computeEnumValue(enumOptions, value),
      default: enumOptions.missingDefault,
      deserialize: value => value === null ? undefined : value,
      serialize: value => typeof value === 'undefined' ? value : String(value)
  })
}

export {
  enum,
}
