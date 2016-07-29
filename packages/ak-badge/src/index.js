/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { define, prop, vdom } from 'skatejs';
import shadowStyles from './shadow.less';

const definition = {
  render(elem) {
    const displayValue = elem.max > 0 && elem.value > elem.max ? `${elem.max}+` : elem.value;

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <span className={shadowStyles.locals.value}>{displayValue}</span>
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
  },
};

export default define('ak-badge', definition);
