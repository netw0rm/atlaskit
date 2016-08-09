/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';

const APPEARANCES = ['primary', 'standard', 'subtle', 'selected'];

const handleSlotClick = (component) =>
  (e) => {
    if (component.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

const definition = {
  props: {
    appearance: prop.string({ attribute: true }),
    disabled: prop.boolean({ attribute: true, default: false }),
    type: prop.string({ attribute: true }),
  },
  render(elem) {
    const classes = [shadowStyles.locals.akButton];
    // TODO: constraint buttonType to only be button or submit
    const buttonType = (elem.type) ? elem.type : 'button';

    if (elem.appearance) {
      const index = APPEARANCES.indexOf(elem.appearance);
      if (index >= 0) {
        classes.push(shadowStyles.locals[APPEARANCES[index]]);
      }
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
          type={buttonType}
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
