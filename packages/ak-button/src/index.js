/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop, props } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';

const classKeys = shadowStyles.locals;

const attributeValuesToEnumObject = values =>
  values.reduce((acum, val) => {
    acum[val.toUpperCase()] = val;
    return acum;
  }, {});

const getClasses = elem => ({
  [classKeys.button]: true,
  [classKeys.compact]: elem.compact,
  [classKeys.disabled]: elem.disabled,
  [classKeys.selected]: elem.selected && !elem.disabled,
  [classKeys.primary]: elem.appearance === 'primary' && !elem.disabled && !elem.selected,
  [classKeys.subtle]: elem.appearance === 'subtle' && !elem.disabled && !elem.selected,
  [classKeys.link]: elem.appearance === 'link' && !elem.selected,
});

const getSlotName = side => side || 'default';

const getSlot = ({ elem, side } = {}) => (
  <span className={classKeys[`${getSlotName(side)}SlotWrapper`]}>
    <slot
      ref={ref => (elem[`${getSlotName(side)}Slot`] = ref)}
      name={side}
      className={classKeys[`${getSlotName(side)}Slot`]}
    />
  </span>
);

const getContent = elem => (
  <span className={classKeys.buttonContent}>
    {elem.notext ? getSlot({ elem, side: 'before' }) : false}
    {getSlot({ elem })}
    {elem.notext ? getSlot({ elem, side: 'after' }) : false}
  </span>
);

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

export const APPEARANCE = attributeValuesToEnumObject(APPEARANCE_VALUES);
export const TYPE = attributeValuesToEnumObject(TYPE_VALUES);

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
    notext: prop.boolean({ attribute: false, default: false }),
  },
  rendered(elem) {
    // console.log(elem.defaultSlot.assignedNodes());
    setTimeout(() => {
      if (elem.defaultSlot.assignedNodes().length === 0 && !elem.notext) {
        props(elem, { _notext: true });
      }
    });
  },
  render(elem) {
    return (
      <span className={classKeys.root}>
        <style>{shadowStyles.toString()}</style>
        <button
          className={classNames(getClasses(elem))}
          type={elem.type}
          disabled={elem.disabled}
          onmousedown={e => e.preventDefault()}
        >
          {getContent(elem)}
        </button>
      </span>
    );
  },
};

const AkButton = define('ak-button', definition);
export default AkButton;
