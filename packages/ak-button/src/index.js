/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';

const definition = {
  props: {
    label: prop.string({ attribute: true }),
    primary: prop.boolean({ attribute: true }),
    disabled: prop.boolean({ attribute: true }),
  },
  render(elem) {
    const classes = [shadowStyles.locals.myClassName];

    if (elem.primary) {
      classes.push(shadowStyles.locals.primary);
    }

    if (elem.disabled) {
      classes.push(shadowStyles.locals.disabled);
    }

    const classListNames = classNames(classes);

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <button
          className={classListNames}
          disabled={elem.disabled}
        >
          {elem.label}
        </button>
      </div>
    );
  },
};

export default define('ak-button', definition);
