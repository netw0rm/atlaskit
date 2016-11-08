import { vdom, define, prop, props } from 'skatejs';
import { themeable } from 'ak-theme';
import { style } from 'akutil-common';
import { appearance, type, spacing } from './internal/enumerated-properties';
import Slot from './Slot';
import Button from './Button';
import createStyles from './styles';
import adg2 from './themes/adg2';

const APPEARANCE = appearance.values;
const TYPE = type.values;
const SPACING = spacing.values;

export { APPEARANCE, TYPE, SPACING };
export const themes = { adg2 };

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
     * @description href of the ak-button.
     * If href is set, button will redirect to href url when clicked.
     * @memberof Button
     * @default button
     * @type {string}
     * @example @html <ak-button href="www.atlassian.com"></ak-button>
     * @example @js button.href = 'www.atlassian.com';
     */
    href: prop.string({ attribute: true }),
    /**
     * @description Standard target attribute for hyperlinks
     * @memberof Button
     * @type {string}
     * @example @html <ak-button target="_blank"></ak-button>
     * @example @js button.target = '_blank';
     */
    target: prop.string({ attribute: true }),
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
     * @description Option to change button's padding. One of:
     * 'none', 'compact'
     * @memberof Button
     * @default 'normal'
     * @type {string}
     * @example @html <ak-button spacing="compact"></ak-button>
     * @example @js button.spacing = 'none';
     */
    spacing: spacing.enumeration,
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
    const styles = style(vdom, createStyles(elem.themeProps));
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
