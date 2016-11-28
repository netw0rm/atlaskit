import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';

import styles from 'style!./styles.less';
import { name } from '../package.json';
import ExampleAlignment from './ExampleAlignment';

storiesOf(name, module)
  .add('Parent position: fixed', () => (
    <div style={{ height: '100%' }}>
      <div className={styles.storyRoot}>
        <div className={styles.fixedParent}>
          <ExampleAlignment position="bottom center" content="Parent is position: fixed" />
        </div>
      </div>
    </div>
  ))
  .add('Parent position: absolute', () => (
    <div style={{ height: '100%' }}>
      <div className={styles.storyRoot}>
        <div className={styles.absoluteParent}>
          <ExampleAlignment position="bottom center" content="Parent is position: absolute" />
        </div>
      </div>
    </div>
  ))
  .add('Parent position: relative', () => (
    <div style={{ height: '100%' }}>
      <div className={styles.storyRoot}>
        <div>This story has a known defect</div>
        <div className={styles.relativeParent}>
          <ExampleAlignment position="bottom center" content="Parent is position: relative" />
        </div>
      </div>
    </div>
  ));
