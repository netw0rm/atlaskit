import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';

import styles from 'style!./styles.less';

const ALIGNMENT_ATTRIBUTE_ENUM = {
  values: ['', 'start', 'end'],
  defaultValue: '',
};

export default class TagGroup extends PureComponent {
  static propTypes = {
    alignment: PropTypes.oneOf(ALIGNMENT_ATTRIBUTE_ENUM.values),
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    alignment: ALIGNMENT_ATTRIBUTE_ENUM.defaultValue,
  }

  render() {
    return (
      <div
        className={classnames({
          [styles.rootNode]: true,
          [styles.endAligned]: this.props.alignment === 'end',
        })}
      >
        {this.props.children}
      </div>
    );
  }
}
