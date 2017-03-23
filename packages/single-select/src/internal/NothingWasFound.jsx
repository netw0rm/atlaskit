import React, { PureComponent, PropTypes } from 'react';

import { locals as styles } from '../styles.less';

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
