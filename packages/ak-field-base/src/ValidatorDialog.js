import { vdom } from 'skatejs';
import InlineDialog from 'ak-inline-dialog';
import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <InlineDialog
    hasBlanket={false}
    padding="3px"
    position="right middle"
    {...props}
  >
    <ul class={shadowStyles.locals.errorList}>
      {children()}
    </ul>
  </InlineDialog>
);
