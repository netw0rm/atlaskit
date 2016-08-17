/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';

const PRIMARY = 'primary';
const STANDARD = 'standard';
const SUBTLE = 'subtle';
const SELECTED = 'selected';

const APPEARANCE = {
  PRIMARY, STANDARD, SUBTLE, SELECTED,
};

const APPEARANCES = {
  attribute: 'appearance',
  values: Object.keys(APPEARANCE).map(key => APPEARANCE[key]),
};

const definition = {
  props: {
    /**
     * @description Style of the button. One of:
     * 'primary', 'standard', 'subtle', 'selected'.
     * @memberof Button
     * @default 'standard'
     * @type {string}
     * @example @html <ak-button appearance="primary"></ak-button>
     * @example @js button.appearance = 'primary';
     */
    appearance: enumeration(APPEARANCES)({
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
  },
  render(elem) {
    const classes = [shadowStyles.locals.akButton];

    if (elem.disabled) {
      classes.push(shadowStyles.locals.disabled);
    } else if (elem.appearance) {
      classes.push(shadowStyles.locals[elem.appearance]);
    }

    return (
      <div className={shadowStyles.locals.container}>
        <style>{shadowStyles.toString()}</style>
        <button
          className={classNames(classes)}
          disabled={elem.disabled}
          onmousedown={(e) => e.preventDefault()}
        >
          <slot />
        </button>
      </div>
    );
  },
};

const AkButton = define('ak-button', definition);

export default AkButton;

export {
  APPEARANCE,
};
