/** @jsx vdom */
import 'style!./host.less';

import { vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class ButtonGroup
 * @example @js import ButtonGroup from 'ak-button-group';
 * const component = new ButtonGroup();
 */
export default define('ak-button-group', {
  render() {
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <div className={shadowStyles.locals.defaultSlotWrapper}>
        {/* This is required for elements in the shadow root to be styled.
           This is wrapped in the <div /> because you can't have more than one
           root element.
        */}
        <style>{shadowStyles.toString()}</style>
        <slot className={shadowStyles.locals.defaultSlotElement} />
      </div>
    );
  },
  props: {
    /**
     * @description The name of the ButtonGroup element.
     * @memberof ButtonGroup
     * @instance
     * @type {string}
     * @default ButtonGroup
     */
    name: {
      default: 'ButtonGroup',
    },
  },
});
