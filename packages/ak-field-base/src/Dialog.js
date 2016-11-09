import { vdom } from 'skatejs';
import { akColorR400 } from 'akutil-shared-styles';
import InlineDialog from 'ak-inline-dialog';
import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <InlineDialog
    border-color={akColorR400}
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
