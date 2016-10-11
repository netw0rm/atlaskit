import { vdom } from 'skatejs';
import classNames from 'classnames';
import shadowStyles from './shadow.less';
import Button from 'ak-button';
import 'ak-icon/glyph/bitbucket/create';
import 'ak-icon/glyph/bitbucket/optout';


/* eslint-disable react/prop-types */
export default (props) => {
  const slotWrapperClasses = classNames(shadowStyles.locals.editModeSlotWrapper, {
    [shadowStyles.locals.focused]: props.focus,
  });
  return (
    <div>
      <div
        className={slotWrapperClasses}
      >
        <slot
          className={shadowStyles.locals.editModeSlot}
          name="editmode"
        />
      </div>
      <div className={shadowStyles.locals.confirmationButtons}>
        <Button compact appearance="subtle" onclick={props.onConfirm}>
          ✓
        </Button>
        <Button compact appearance="subtle" onclick={props.onCancel}>
          x
        </Button>
      </div>
    </div>
  );
};
