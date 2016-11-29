import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';

import styles from 'style!./styles.less';
import { name } from '../package.json';
import ExampleAlignment from './ExampleAlignment';


const AllAlignments = props => (<div className={styles.storyRoot}>
  <div style={{ width: '200vw', border: '1px solid' }}>
    This div is here to give us horizontal scrolling
  </div>

  <div className={styles.flexRow}>
    <ExampleAlignment {...props} position="left top" />
    <ExampleAlignment {...props} position="left middle" />
    <ExampleAlignment {...props} position="left bottom" />
  </div>

  <div className={styles.flexRow}>
    <ExampleAlignment {...props} position="right top" />
    <ExampleAlignment {...props} position="right middle" />
    <ExampleAlignment {...props} position="right bottom" />
  </div>

  <div className={styles.flexRow}>
    <ExampleAlignment {...props} position="top left" />
    <ExampleAlignment {...props} position="top center" />
    <ExampleAlignment {...props} position="top right" />
  </div>

  <div className={styles.flexRow}>
    <ExampleAlignment {...props} position="bottom left" />
    <ExampleAlignment {...props} position="bottom center" />
    <ExampleAlignment {...props} position="bottom right" />
  </div>
</div>);

storiesOf(name, module)
  .add('Alignments', () => (
    <div style={{ height: '100%' }}>
      <AllAlignments />
    </div>
  )).add('Alignments flipping disabled', () => (
    <div style={{ height: '100%' }}>
      <AllAlignments autoPosition={false} />
    </div>
  ));
