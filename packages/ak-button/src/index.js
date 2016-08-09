/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';
import 'ak-editor-icon';

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

const preventClickWhenDisabled = (component) =>
  (e) => {
    if (component.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

const createIcon = (elem, glyph, id) => {
  if (!glyph) {
    return false;
  }
  let fill;
  if (elem.appearence === 'selected') {
    fill = '#ECEEF1';
  }
  if (elem.disabled) {
    fill = '#B3BAC5';
  }
  return vdom.element('ak-editor-icon', {
    id,
    glyph,
    fill,
  });
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
    leftIcon: prop.string({ attribute: true, default: null }),
    rightIcon: prop.string({ attribute: true, default: null }),
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
          <div
            className={shadowStyles.locals.contentContainer}
            onclick={preventClickWhenDisabled(elem)}
          >
            {createIcon(elem, elem.leftIcon, 'left-icon')}
            <slot />
            {createIcon(elem, elem.rightIcon, 'right-icon')}
          </div>
        </button>
      </div>
    );
  },
};

export default define('ak-button', definition);
