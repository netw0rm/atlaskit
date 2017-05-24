import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from '../styles.less';
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
