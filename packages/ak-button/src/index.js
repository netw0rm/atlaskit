import merge from 'lodash.merge';
import { vdom, define, prop, props } from 'skatejs';
import { themeable } from 'ak-theme';
import { style } from 'akutil-common';
import { appearance, type } from './enumeratedProperties';
import Slot from './Slot';
import Button from './Button';
import createStyles from './styles';
import variables from './styles/variables';

const APPEARANCE = appearance.values;
const TYPE = type.values;

export { APPEARANCE, TYPE };

/**
 * @description Creates instances of ak-button programmatically, or using markup.
 * @class Button
 * @example @js import Button from 'ak-button';
 * const button = new Button();
 */
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
     * @default button
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
    const themeVars = elem.themeProps || {};
    const vars = merge(JSON.parse(JSON.stringify(variables)), themeVars);
    const css = createStyles(vars);
    const styles = style(vdom, css);
    return (
      <Button {...props(elem)} styles={styles}>
        <Slot styles={styles} name="before" />
        <Slot styles={styles} />
        <Slot styles={styles} name="after" />
      </Button>
    );
  },
};

const AkButton = define('ak-button', themeable(definition));
export default AkButton;
