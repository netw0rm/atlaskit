/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { define, prop, vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';

const APPEARANCE_ENUM = {
  values: ['default', 'primary', 'important', 'added', 'removed'],
  missingDefault: 'default',
  invalidDefault: 'default',
};

const definition = {
  render(elem) {
    const displayValue = elem.max > 0 && elem.value > elem.max ? `${elem.max}+` : elem.value;
    const classes = classNames([shadowStyles.locals.value, shadowStyles.locals[elem.appearance]]);

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <span class={classes}>{displayValue}</span>
      </div>
    );
  },
  props: {
    value: prop.number({
      attribute: true,
      default: 0,
      event: 'change',
    }),
    max: prop.number({
      attribute: true,
      default: -1,
    }),
    appearance: enumeration(APPEARANCE_ENUM)({
      attribute: true,
    }),
  },
};

export default define('ak-badge', definition);
