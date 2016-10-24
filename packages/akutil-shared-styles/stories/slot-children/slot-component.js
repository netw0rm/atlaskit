/** @jsx h */
import { h, define } from 'skatejs';
import classNames from 'classnames';

import shadowStyles from './slot-component.less';


export default define('x-slot-component', {
  render() {
    return (<div>
      <style>`
        ${shadowStyles.toString()}
      `</style>
      <slot className={classNames(shadowStyles.locals.redSlotClass)} name="red" />
      <slot className={classNames(shadowStyles.locals.blueSlotClass)} name="blue" />
      <slot className={classNames(shadowStyles.locals.defaultSlotClass)} />
    </div>);
  },
});
