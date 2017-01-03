import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';

export default class ComponentTemplate extends PureComponent {
  static propTypes = {
    audienceName: PropTypes.string,
    onTextClicked: PropTypes.func,
  }

  static defaultProps = {
    audienceName: 'world',
    onTextClicked: () => {},
  }

  render = () => (
    <button
      className={styles.root}
      onClick={this.props.onTextClicked}
    >
      Hello {this.props.audienceName}!
    </button>
  )
}
