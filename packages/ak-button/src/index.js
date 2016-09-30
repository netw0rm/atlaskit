/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop, props } from 'skatejs';
import shadowStyles from './shadow.less';
import { appearance, type } from './enumeratedProperties';
import Slot from './Slot';
import Button from './Button';
import Root from './Root';

const classKeys = shadowStyles.locals;

const APPEARANCE = appearance.values;
const TYPE = type.values;

export { APPEARANCE, TYPE };

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
    appearance: appearance.enumeration,
    /**
     * @description Type of the ak-button. One of:
     * 'button', 'submit'.
     * @memberof Button
     * @default 'button'
     * @type {string}
     * @example @html <ak-button type="submit"></ak-button>
     * @example @js button.type = 'submit';
     */
    type: type.enumeration,
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
    return (
      <Root>
        <Button {...props(elem)} >
          <span className={classKeys.buttonContent}>
            <Slot name="before" />
            <Slot />
            <Slot name="after" />
          </span>
        </Button>
      </Root>
    );
  },
};

const AkButton = define('ak-button', definition);
export default AkButton;
