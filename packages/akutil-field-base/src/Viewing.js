import { vdom } from 'skatejs';
import { KeyPressHandler } from 'akutil-common';
import shadowStyles from './shadow.less';
import 'ak-icon/glyph/edit';


function addKeyHandlers(callback, elem) {
  // we have to wrap the callback here so that the keydown event doesnt get
  // caught after the view switches, causing the input text to be replaced with a space.
  const safeCallback = (e) => {
    e.preventDefault();
    callback();
  };
  // eslint-disable-next-line  no-unused-vars
  const handler = new KeyPressHandler('SPACE', safeCallback, elem);
}

/* eslint-disable react/prop-types */
export default (props) => (
  <div
    className={shadowStyles.locals.viewModeWrapper}
    ref={ref => addKeyHandlers(props.switchToEditingCallback, ref)}
    onClick={props.switchToEditingCallback}
    tabIndex="0"
  >
    <slot name="viewmode" />
    <ak-icon-edit className={shadowStyles.locals.editIcon} />
  </div>
);
