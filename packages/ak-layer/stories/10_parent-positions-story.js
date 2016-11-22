import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';

import styles from 'style!./styles.less';
import AKLayer from '../src/index';
import { name } from '../package.json';

const ExampleAlignment = props => (
  <AKLayer position={props.position}>
    <div className={styles.alignmentContainer}>{props.content || ''}</div>
    <div>{props.position}</div>
  </AKLayer>
);
ExampleAlignment.propTypes = {
  position: React.PropTypes.string,
  content: React.PropTypes.string,
};

storiesOf(name, module)
  .add('Parent position: fixed', () => (
    <div style={{ height: '100%' }}>
      <div className={styles.storyRoot}>
        <div className={styles.fixedParent}>
          <ExampleAlignment position="bottom center" content="Target is position: fixed" />
        </div>
      </div>
    </div>
  ))
  .add('Parent position: absolute', () => (
    <div style={{ height: '100%' }}>
      <div className={styles.storyRoot}>
        <div className={styles.absoluteParent}>
          <ExampleAlignment position="bottom center" content="Target is position: absolute" />
        </div>
      </div>
    </div>
  ))
  .add('Parent position: relative', () => (
    <div style={{ height: '100%' }}>
      <div className={styles.storyRoot}>
        <div className={styles.relativeParent}>
          <ExampleAlignment position="bottom center" content="Target is position: relative" />
        </div>
      </div>
    </div>
  ));
