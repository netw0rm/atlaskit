import React, { PureComponent, PropTypes } from 'react';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import classNames from 'classnames';

import { locals as styles } from '../styles.less';

export default class Trigger extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    isOpen: false,
    children: null,
  }

  render = () => {
    const classes = classNames([styles.trigger, {
      [styles.isOpen]: this.props.isOpen,
    }]);

    return (
      <div
        className={classes}
        tabIndex="0"
      >
        <div className={styles.content}>
          {this.props.children}
        </div>
        <div className={styles.expand}>
          <ExpandIcon label="" />
        </div>
      </div>
    );
  }
}
