import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './styles.less';

export default class AkButtonGroup extends PureComponent {
  static propTypes = {
    /** Button elements to be displayed inside the group. */
    children: PropTypes.node,
  }
  componentDidMount() {
    // eslint-disable-next-line no-console
    console.warn('This package has been deprecated. Please import ButtonGroup from @atlaskit/button package instead.');
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.children}
      </div>
    );
  }
}
