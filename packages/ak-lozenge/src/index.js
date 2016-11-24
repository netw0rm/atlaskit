/** @jsx vdom */

import { define, prop, vdom } from 'skatejs';
import classNames from 'classnames';
import { enumeration } from 'akutil-common';

import shadowStyles from './shadow.less';

const APPEARANCE_ENUM = {
  values: ['default', 'success', 'removed', 'inprogress', 'new', 'moved'],
  missingDefault: 'default',
  invalidDefault: 'default',
};
/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Lozenge
 * @example @js import Lozenge from 'ak-lozenge';
 * const component = new Lozenge();
 */
const definition = {
  render(elem) {
    const classes = classNames([shadowStyles.locals.lozenge, shadowStyles.locals[elem.appearance]]);
    return (
      <span className={classes} bold={elem.bold}>
        <style>{shadowStyles.toString()}</style>
        <span className={shadowStyles.locals.content}><slot /></span>
      </span>
    );
  },
  props: {
    /**
     * @description Affects the visual style of the badge.
     * Allowed values are: 'default', 'success', 'removed', 'inprogress', 'new', 'moved'.
     * @memberof AkLozenge
     * @instance
     * @type {string}
     * @default default
     */
    appearance: enumeration(APPEARANCE_ENUM)({
      attribute: true,
    }),
    /**
     * @description Toggles the bolder appearance.
     * @memberof AkLozenge
     * @instance
     * @type {boolean}
     * @default false
     */
    bold: prop.boolean({
      attribute: true,
      default: false,
    }),
  },
};

export default define('ak-lozenge', definition);
