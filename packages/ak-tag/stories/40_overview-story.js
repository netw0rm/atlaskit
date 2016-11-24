import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';

import Tag from '../src/index';
import { name } from '../package.json';
import styles from '../src/shadow.less';

const Component = reactify(Tag);

storiesOf(name, module)
  .add('overview', () => (
    <div>
      <Component
        className={styles.locals.akTag}
        text="Text only"
      />
      <Component
        className={styles.locals.akTag}
        href="https://some.link"
        text="Linked text"
      />
      <Component
        className={styles.locals.akTag}
        text="Removable"
        remove-button-text="Remove me"
      />
      <Component
        className={styles.locals.akTag}
        href="https://some.link"
        text="Removable & linked"
        remove-button-text="Remove me"
      />
      <Component
        className={styles.locals.akTag}
        text="Overflowing text that will be cut off"
      />
      <Component
        className={styles.locals.akTag}
        text="Text with button that will be cut off"
        remove-button-text="Remove me"
      />
    </div>
  ));
