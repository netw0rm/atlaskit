import * as React from 'react';
import * as styles from './styles';

import { whoopsUri } from './icons';

export default () => (
  <div className={styles.mentionListError}>
    <p><img src={whoopsUri} alt="whoops" /></p>
    <p>Something went wrong</p>
  </div>
);
