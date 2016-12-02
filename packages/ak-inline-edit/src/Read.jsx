import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import FieldBase from 'ak-field-base';
import Icon from 'ak-icon/glyph/edit';
import styles from './styles.less';

export default class ReadView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    shouldHideLabel: PropTypes.bool,
    onEditRequested: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    shouldHideLabel: false,
  }

  getWrapperClasses = () =>
    classNames({
      [styles.locals.viewModeWrapper]: true,
      [styles.locals.editButtonFocused]: this.props.isFocused,
    })

  renderFieldBaseContent = () => (
    <div className={styles.locals.viewModeContentWrapper}>
      {this.props.children}
      <span className={styles.locals.editButton}>
        <Icon
          label="Edit"
          className={styles.locals.editIcon}
        />
      </span>
    </div>
  )

  render = () => (
    <div // eslint-disable-line jsx-a11y/no-static-element-interactions
      className={this.getWrapperClasses()}
      onClick={this.props.onEditRequested}
    >
      <FieldBase
        label={this.props.label}
        focused={this.props.isFocused}
        hideLabel={this.props.shouldHideLabel}
      >
        {this.renderFieldBaseContent()}
      </FieldBase>
    </div>
  )
}
