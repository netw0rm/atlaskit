/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { prop, vdom } from 'skatejs';
import shadowStyles from './shadow.less';

const definition = {
  render(elem) {
    const displayValue = elem.max > 0 && elem.value > elem.max ? `${elem.max}+` : elem.value;

    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <div>
        {/* This is required for elements in the shadow root to be styled.
           This is wrapped in the <div /> because you can't have more than one
           root element.
        */}
        <style>{shadowStyles.toString()}</style>
        <span className={shadowStyles.locals.value}>{displayValue}</span>
      </div>
    );
  },
  props: {
    value: prop.number({
      attribute: true,
      default: 0,
    }),
    max: prop.number({
      attribute: true,
      default: -1,
    }),
  },
};

export default definition;
