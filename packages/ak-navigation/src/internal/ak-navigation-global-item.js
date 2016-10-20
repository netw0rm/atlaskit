import { vdom, define } from 'skatejs';
import classNames from 'classnames';

import shadowStyles from './ak-navigation-global-item.less';


export default define('ak-navigation-global-item', {
  render(elem) {
    const assignedSlot = elem.children[0];
    const visible = assignedSlot &&
      assignedSlot.assignedNodes &&
      assignedSlot.assignedNodes().length > 0;
    return (
      visible ? <div
        className={classNames(shadowStyles.locals.globalItem)}
      >
        <style>{shadowStyles.toString()}</style>
        <slot />
      </div> : null
    );
  },
});
