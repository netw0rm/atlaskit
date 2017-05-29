import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from '../styles.less';

export default class NothingWasFound extends PureComponent {
  static propTypes = {
    noMatchesFound: PropTypes.string,
  }

  render() {
    return (
      <div className={styles.nothing}>
        { this.props.noMatchesFound }
      </div>
    );
  }
}
