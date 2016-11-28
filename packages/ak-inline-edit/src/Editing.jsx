import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Button from 'ak-button';

import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
const RightGutter = props =>
  <div className={shadowStyles.locals.rightGutter}>
    <Button
      appearance="subtle"
      onClick={props.onConfirm}
      className={shadowStyles.locals.editConfirm}
    >
      <div className={shadowStyles.locals.fakeIcon}>✔</div>
    </Button>
    <Button
      appearance="subtle"
      onClick={props.onCancel}
      className={shadowStyles.locals.editCancel}
    >
      <div className={shadowStyles.locals.fakeIcon}>✖</div>
    </Button>
  </div>;

/* eslint-disable react/prop-types */
export default class Editing extends PureComponent {
  render() {
    const props = this.props;
    const slotWrapperClasses = classNames(shadowStyles.locals.editModeSlotWrapper, {
      [shadowStyles.locals.focused]: props.focused,
    });

    if (props.hide) {
      return null;
    }

    return (
      <div className={shadowStyles.locals.editModeWrapper}>
        <div className={slotWrapperClasses}>
          {props.children}
        </div>
        <RightGutter onConfirm={props.onConfirm} onCancel={props.onCancel} />
      </div>
    );
  }
}
