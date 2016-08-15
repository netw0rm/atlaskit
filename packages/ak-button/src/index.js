/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';

const APPEARANCES = {
  attribute: 'appearance',
  values: [
    'primary', 'standard', 'subtle', 'selected',
  ],
};

const preventClickWhenDisabled = (elem) =>
  (e) => {
    if (elem.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
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
          <slot onclick={preventClickWhenDisabled(elem)} />
        </button>
      </div>
    );
  },
};

export default define('ak-button', definition);
