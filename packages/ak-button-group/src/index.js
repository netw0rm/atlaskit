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
        <style>{shadowStyles.toString()}</style>
        <slot className={shadowStyles.locals.defaultSlotElement} />
      </div>
    );
  },
});
