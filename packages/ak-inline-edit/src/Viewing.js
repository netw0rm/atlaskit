import { vdom } from 'skatejs';
import classNames from 'classnames';
import FieldBase from 'ak-field-base';
import { KeyPressHandler } from 'akutil-common';
import 'ak-icon/glyph/edit';


import shadowStyles from './shadow.less';


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
export default (props) => {
  const viewModeWrapperClasses = classNames({
    [shadowStyles.locals.viewModeWrapper]: !props.hideViewing,
    [shadowStyles.locals.hidden]: props.hideViewing,
    [shadowStyles.locals.editButtonFocused]: props.focused,
  });
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={viewModeWrapperClasses}
      ref={ref => addKeyHandlers(props.switchToEditingCallback, ref)}
      onClick={props.switchToEditingCallback}
    >
      <FieldBase className={shadowStyles.locals.viewModeSlotWrapper} label={props.label}>
        <div className={shadowStyles.locals.viewModeSlottedContentWrapper} slot="input-slot">
          <slot name="viewmode" />
          <button
            type="button"
            className={shadowStyles.locals.editButton}
            onFocus={() => props.setFocus(true)}
            onBlur={() => props.setFocus(false)}
          >
            <ak-icon-edit className={shadowStyles.locals.editIcon} />
          </button>
        </div>
      </FieldBase>
    </div>
  );
};
