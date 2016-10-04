import { vdom } from 'skatejs';
import { DropdownTrigger } from 'ak-dropdown';

import shadowStyles from '../shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <DropdownTrigger slot="trigger" style={{ width: '100%' }}>
    <div
      {...props}
      className={shadowStyles.locals.trigger}
    >
      <style>{shadowStyles.toString()}</style>
      {children()}
    </div>
  </DropdownTrigger>
);
