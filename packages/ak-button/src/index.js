/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';

const APPEARENCES = {
  attribute: 'appearence',
  values: [
    'primary', 'standard', 'subtle', 'selected',
  ],
};

const preventClickWhenDisabled = (component) =>
  (e) => {
    if (component.disabled) {
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
     * @example @html <ak-button appearence="primary"></ak-button>
     * @example @js button.appearence = 'primary';
     */
    appearence: enumeration(APPEARENCES)({
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
    } else {
      if (elem.appearence) {
        classes.push(shadowStyles.locals[elem.appearence]);
      }
    }

    const classListNames = classNames(classes);

    return (
      <div className={shadowStyles.locals.container}>
        <style>{shadowStyles.toString()}</style>
        <button
          className={classListNames}
          type={elem.type}
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
