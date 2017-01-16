import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../styles.less';
import typesMapping, { types, defaultType } from './types';

export default class InlineMessage extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(types),
  }

  static defaultProps = {
    type: defaultType,
  }

  render = () => {
    const {
      [this.props.type]: {
        icon: IconForType,
        iconColor,
      },
    } = typesMapping;

    return (
      <span
        className={styles.iconWrapper}
        style={{ color: iconColor }}
      >
        <IconForType label="Inline message icon" />
      </span>
    );
  }
}
