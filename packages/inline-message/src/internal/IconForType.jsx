import React, { PureComponent, PropTypes } from 'react';
import { akColorN60 } from '@atlaskit/util-shared-styles';
import styles from 'style!../styles.less';
import typesMapping, { types } from './types';

export default class SelectedIconForType extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(types).isRequired,
    isDisabled: PropTypes.bool,
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
        style={{ color: this.props.isDisabled ? akColorN60 : iconColor }}
      >
        <SelectedIcon label="Inline message icon" />
      </span>
    );
  }
}
