/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';

// const APPEARENCES = ['primary', 'standard', 'subtle', 'selected'];

const APPEARENCES = {
  attribute: 'appearence',
  values: [
    'primary', 'standard', 'subtle', 'selected',
  ],
};

const TYPES = {
  attribute: 'type',
  values: ['button', 'submit'],
  missingDefault: 'button',
  invalidDefault: 'button',
};

const handleSlotClick = (component) =>
  (e) => {
    if (component.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

const definition = {
  props: {
    appearence: enumeration(APPEARENCES)({
      attribute: true,
    }),
    disabled: prop.boolean({ attribute: true, default: false }),
    type: enumeration(TYPES)({
      attribute: true,
    }),
  },
  render(elem) {
    const classes = [shadowStyles.locals.akButton];

    if (elem.appearence) {
      classes.push(shadowStyles.locals[elem.appearence]);
    }

    if (elem.disabled) {
      classes.push(shadowStyles.locals.disabled);
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
          <slot onclick={handleSlotClick(elem)} />
        </button>
      </div>
    );
  },
};

export default define('ak-button', definition);
