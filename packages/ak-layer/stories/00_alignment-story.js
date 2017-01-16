import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';

import styles from 'style!./styles.less';
import { name } from '../package.json';
import AKLayer from '../src';
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
  .add('Simple Layer story', () => {
    const targetStyle = {
      display: 'inline-block',
      position: 'absolute',
      top: '100px',
      left: '150px',
      background: 'red',
      padding: '50px',
    };
    const layerStyles = {
      background: 'green',
      padding: '5px',
    };
    const popperContent = <div style={layerStyles}>LayerContent</div>;
    return (
      <div>
        <AKLayer content={popperContent} position="right bottom">
          <div style={targetStyle}>Target</div>
        </AKLayer>
        <div>Drag the left side bar over until the LayerContent reaches the</div>
      </div>
    );
  })
  .add('Alignments', () => (
    <div style={{ height: '100%' }}>
      <AllAlignments />
      <div>Foo</div>
    </div>
  )).add('Alignments flipping disabled', () => (
    <div style={{ height: '100%' }}>
      <AllAlignments autoPosition={false} />
      <div>Foo</div>
    </div>
  ));
