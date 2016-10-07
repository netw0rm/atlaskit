import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import 'ak-icon/glyph/bitbucket/admin';

function handleMouseEnter() {
  // console.log('Mouse entered');
}

function handleMouseLeave() {
  // console.log('Mouse left');
}

/* eslint-disable react/prop-types */
export default (props) => (
  <div
    className={shadowStyles.locals.viewModeWrapper}
    onclick={() => (props.onClick())}
    onmouseenter={() => handleMouseEnter()}
    onmouseleave={() => handleMouseLeave()}
  >
    <slot name="viewmode" />
    <ak-icon-bitbucket-admin className={shadowStyles.locals.editIcon} />
  </div>
);
