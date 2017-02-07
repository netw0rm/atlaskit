import React, { PureComponent, PropTypes } from 'react';
import ExpandIcon from '@atlaskit/icon/glyph/expand';

import { locals as styles } from '../styles.less';

export default class Trigger extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    isOpen: false,
    children: null,
    onClick: () => {},
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render = () => (
    <div
      className={styles.trigger}
      tabIndex="0"
      onClick={this.props.onClick}
    >
      <div className={styles.content}>
        {this.props.children}
      </div>
      <div className={styles.expand}>
        <ExpandIcon label="" />
      </div>
    </div>
  );
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}
