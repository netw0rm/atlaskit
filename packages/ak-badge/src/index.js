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

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class AkBadge
 * @example @js import AkBadge from 'ak-badge';
 * const component = new AkBadge();
 */
const definition = {
  render(elem) {
    const displayValue = elem.max > 0 && elem.value > elem.max ? `${elem.max}+` : elem.value;
    const classes = classNames([shadowStyles.locals.value, shadowStyles.locals[elem.appearance]]);

    return (
      <span class="container">
        <style>{shadowStyles.toString()}</style>
        <span class={classes}>{displayValue}</span>
      </span>
    );
  },
  props: {
    /**
     * @description The name of the AkBadge element.
     * @memberof AkBadge
     * @instance
     * @type {number}
     * @default 0
     */
    value: prop.number({
      attribute: true,
      default: 0,
      event: 'change',
    }),
    /**
     * @description The max value to display.
     * If value is 100, and max is 50, "55+" will be displayed
     * @memberof AkBadge
     * @instance
     * @type {number}
     * @default -1
     */
    max: prop.number({
      attribute: true,
      default: -1,
    }),
    /**
     * @description Affects the visual style of the badge.
     * Allowed values are: 'default', 'primary', 'important', 'added', 'removed'.
     * @memberof AkBadge
     * @instance
     * @type {string}
     * @default default
     */
    appearance: enumeration(APPEARANCE_ENUM)({
      attribute: true,
    }),
  },
};

export default define('ak-badge', definition);
