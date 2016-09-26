import { vdom } from 'skatejs';

import 'style!./host.less';
import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props) => (
  <div className={shadowStyles.locals.viewModeWrapper} onclick={() => (props.onClick())}>
    {props.value}
  </div>
);
