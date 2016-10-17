import { vdom } from 'skatejs';
import classNames from 'classnames';
import shadowStyles from './shadow.less';
import Button from 'ak-button';
import 'ak-icon/glyph/bitbucket/pipelines';

/* eslint-disable react/prop-types */
const RightGutter = (props) => {
  if (props.waiting) {
    return (
      <div className={shadowStyles.locals.rightGutter}>
        <ak-icon-bitbucket-pipelines className={shadowStyles.locals.waitingSpinner} />
      </div>
    );
  }
  return (
    <div className={shadowStyles.locals.rightGutter}>
      <Button
        appearance="subtle"
        onclick={props.onConfirm}
        className={shadowStyles.locals.editConfirm}
      >
        <div className={shadowStyles.locals.fakeIcon}>✔</div>
      </Button>
      <Button
        appearance="subtle"
        onclick={props.onCancel}
        className={shadowStyles.locals.editCancel}
      >
        <div className={shadowStyles.locals.fakeIcon}>✖</div>
      </Button>
    </div>
  );
};

/* eslint-disable react/prop-types */
export default (props) => {
  const slotWrapperClasses = classNames(shadowStyles.locals.editModeSlotWrapper, {
    [shadowStyles.locals.focused]: props.focused,
    [shadowStyles.locals.invalid]: props.invalid && !props.focused,
  });
  const editWrapperClasses = classNames({
    [shadowStyles.locals.editModeWrapper]: !props.hideEditing,
    [shadowStyles.locals.hidden]: props.hideEditing,
  });
  return (
    <div className={editWrapperClasses}>
      <div className={slotWrapperClasses}>
        <slot
          className={shadowStyles.locals.editModeSlot}
          name="editmode"
        />
      </div>
      <RightGutter onConfirm={props.onConfirm} onCancel={props.onCancel} waiting={props.waiting} />
    </div>
  );
};
