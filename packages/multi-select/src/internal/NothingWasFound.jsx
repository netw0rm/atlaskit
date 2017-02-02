import React, { PureComponent } from 'react';

import { locals as styles } from '../styles.less';

export default class NothingWasFound extends PureComponent {
  render = () => (
    <div
      className={styles.nothing}
    >
      No matches found
    </div>
  )
}
