import React, { PureComponent } from 'react';
import classNames from 'classnames';
import FieldBase from 'ak-field-base';
import Icon from 'ak-icon/glyph/edit';

import shadowStyles from './styles.less';

/* eslint-disable
  react/prop-types,
  jsx-a11y/no-static-element-interactions,
  react/prefer-stateless-function
*/
export default class Viewing extends PureComponent {
  render() {
    const viewModeWrapperClasses = classNames({
      [shadowStyles.locals.viewModeWrapper]: true,
      [shadowStyles.locals.editButtonFocused]: this.props.isFocused,
    });

    return (
      <div
        className={viewModeWrapperClasses}
        onClick={this.props.switchToEditing}
      >
        <FieldBase label={this.props.label}>
          <div className={shadowStyles.locals.viewModeContentWrapper}>
            {this.props.view}
            <span
              className={shadowStyles.locals.editButton}
              onFocus={() => this.props.setFocus(true)}
              onBlur={() => this.props.setFocus(false)}
            >
              <Icon className={shadowStyles.locals.editIcon} />
            </span>
          </div>
        </FieldBase>
      </div>
    );
  }
}
