import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../styles.less';
import typesMapping, { types } from './types';

export default class SelectedIconForType extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(types).isRequired,
  }

  render() {
    const {
      [this.props.type]: {
        icon: SelectedIcon,
        iconColor,
      },
    } = typesMapping;

    return (
      <span
        className={styles.iconWrapper}
        style={{ color: iconColor }}
      >
        <SelectedIcon label="Inline message icon" />
      </span>
    );
  }
}
