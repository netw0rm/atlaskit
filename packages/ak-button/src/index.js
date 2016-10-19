import { vdom, define, prop, props } from 'skatejs';
import { themeable } from 'ak-theme';
import classNames from 'classnames';
import { style } from 'akutil-common';
import { appearance, type } from './enumeratedProperties';
import getClasses from './internal/getButtonClasses';
import createStyles from './styles';
import adg2 from './themes/adg2';

const APPEARANCE = appearance.values;
const TYPE = type.values;

export { APPEARANCE, TYPE };
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
    const styles = style(vdom, createStyles(elem.themeProps));
    return (
      <span className={styles.root}>
        <button
          className={classNames(getClasses(styles, props(elem)))}
          type={elem.type}
          disabled={elem.disabled}
          onmousedown={e => e.preventDefault()}
        >
          <span className={styles['button-content']}>
            <slot
              name={name}
              className={styles.slot}
            />
          </span>
        </button>
      </span>
    );
  },
};

const AkButton = define('ak-button', themeable(definition));
export default AkButton;
