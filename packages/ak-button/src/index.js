/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';

const classKeys = shadowStyles.locals;

const attributeValuesToEnumObject = values =>
  values.reduce((acum, val) => {
    acum[val.toUpperCase()] = val;
    return acum;
  }, {});

const getClasses = elem => {
  const classes = [classKeys.button];

  if (elem.compact) {
    classes.push(classKeys.compact);
  }

  if (elem.disabled) {
    classes.push(classKeys.disabled);
  } else {
    if (elem.selected) {
      classes.push(classKeys.selected);
    } else if (elem.appearance) {
      classes.push(classKeys[elem.appearance]);
    }
  }
  return classes;
};

const APPEARANCE_VALUES = [
  'primary',
  'standard',
  'subtle',
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

const definition = {
  props: {
    /**
     * @description Predefined appearances of an ak-button. One of:
     * 'primary', 'standard', 'subtle', 'compact'
     * @memberof Button
     * @default 'standard'
     * @type {string}
     * @example @html <ak-button appearance="primary"></ak-button>
     * @example @js button.appearance = 'primary';
     */
    appearance: enumeration(appearancePropertyValues)({
      attribute: true,
    }),
    /**
     * @description Type of the ak-button. One of:
     * 'button', 'submit'.
     * @memberof Button
     * @default 'button'
     * @type {string}
     * @example @html <ak-button type="submit"></ak-button>
     * @example @js button.type = 'submit';
     */
    type: enumeration(typePropertyValues)({
      attribute: true,
    }),
    /**
     * @description Option to disable button and every click event
     * @memberof Button
     * @default false
     * @type {boolean}
     * @example @html <ak-button disabled></ak-button>
     * @example @js button.disabled = true;
     */
    disabled: prop.boolean({ attribute: true }),
    /**
     * @description Option to make a button compact
     * @memberof Button
     * @default false
     * @type {boolean}
     * @example @html <ak-button compact></ak-button>
     * @example @js button.compact = true;
     */
    compact: prop.boolean({ attribute: true }),
    /**
     * @description Option to make a button selected
     * @memberof Button
     * @default false
     * @type {boolean}
     * @example @html <ak-button selected></ak-button>
     * @example @js button.selected = true;
     */
    selected: prop.boolean({ attribute: true }),
  },
  render(elem) {
    const classes = getClasses(elem);

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <button
          className={classNames(classes)}
          type={elem.type}
          disabled={elem.disabled}
          onmousedown={(e) => e.preventDefault()}
        >
          <slot className={classKeys.slot} />
        </button>
      </div>
    );
  },
};

const AkButton = define('ak-button', definition);
export default AkButton;

export {
  APPEARANCE,
  TYPE,
};
