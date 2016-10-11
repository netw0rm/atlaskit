import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import 'ak-icon/glyph/edit';

function handleMouseEnter() {
  // console.log('Mouse entered');
}

function handleMouseLeave() {
  // console.log('Mouse left');
}

/* eslint-disable react/prop-types */
export default () => (
  <div
    className={shadowStyles.locals.viewModeWrapper}
    onmouseenter={() => handleMouseEnter()}
    onmouseleave={() => handleMouseLeave()}
  >
    <slot name="viewmode" />
    <ak-icon-edit className={shadowStyles.locals.editIcon} />
  </div>
);
