import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';

import styles from 'style!./styles.less';
import AKLayer from '../src/index';
import { name } from '../package.json';

const ExampleAlignment = props => (
  <AKLayer position={props.position}>
    <div className={styles.alignmentContainer} />
    <div>{props.position}</div>
  </AKLayer>
);
ExampleAlignment.propTypes = { position: React.PropTypes.string };

storiesOf(name, module)
  .add('Alignments', () => (
    <div style={{ height: '100%' }}>
      <div className={styles.storyRoot}>
        <div className={styles.flexRow}>
          <ExampleAlignment position="left top" />
          <ExampleAlignment position="left middle" />
          <ExampleAlignment position="left bottom" />
          <ExampleAlignment position="right top" />
          <ExampleAlignment position="right middle" />
          <ExampleAlignment position="right bottom" />
        </div>

        <div className={styles.flexRow}>
          <ExampleAlignment position="top left" />
          <ExampleAlignment position="top center" />
          <ExampleAlignment position="top right" />
          <ExampleAlignment position="bottom left" />
          <ExampleAlignment position="bottom center" />
          <ExampleAlignment position="bottom right" />
        </div>
      </div>
    </div>
  ));
