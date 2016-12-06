import styles from 'style!./ak-mention-list-error.less';

import React from 'react';
import { whoopsUri } from './icons';

export default () => (
  <div className={styles.mentionListError}>
    <p><img src={whoopsUri} alt="whoops" /></p>
    <p>Something went wrong</p>
  </div>
);
