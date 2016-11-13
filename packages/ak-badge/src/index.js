/** @jsx vdom */
import { Component, define, emit, prop, vdom } from 'skatejs';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';

import shadowStyles from './shadow.less';
import * as events from './internal/events';


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
    const displayValue = (() => {
      if (elem.value < 0) {
        return 0;
      }
      if (elem.max > 0 && elem.value > elem.max) {
        return `${elem.max}+`;
      }
      if (elem.value === Infinity) {
        return '\u221E';
      }
      return elem.value;
    })();
    const classes = classNames([shadowStyles.locals.value, shadowStyles.locals[elem.appearance]]);

    return (
      <span class="container">
        <style>{shadowStyles.toString()}</style>
        <span class={classes}>{displayValue}</span>
      </span>
    );
  },
  updated(elem, prev) {
    if (prev && prev.value !== elem.value) {
      emit(elem, events.change, {
        detail: {
          oldValue: prev.value,
          newValue: elem.value,
        },
      });
    }
    return Component.updated(elem, prev);
  },
  props: {
    /**
     * @description The value displayed within the badge.
     * @memberof AkBadge
     * @instance
     * @type {number}
     * @default 0
     */
    value: prop.number({
      attribute: true,
      default: 0,
    }),
    /**
     * @description The max value to display.
     * If value is 100, and max is 50, "50+" will be displayed
     * @memberof AkBadge
     * @instance
     * @type {number}
     * @default 99
     */
    max: prop.number({
      attribute: true,
      default: 99,
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

export { events };
