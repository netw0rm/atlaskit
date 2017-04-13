import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import * as Perf from 'react-addons-perf';

import EmojiPicker from '../src/components/picker/EmojiPicker';

import { name } from '../package.json';
import { getEmojiResource, lorem } from './story-data';

export interface PerformanceWrapperProps {
  children?: ReactNode;
}

class PerformanceWrapper extends PureComponent<PerformanceWrapperProps, {}> {

  render() {
    return (
      <div>
        {this.props.children}
        <hr/>
        <div>
          <h3>Peformance tools: see console for output. (Only supported in react dev mode)</h3>
          <p>
            <button onClick={() => { Perf.start(); }}>Start recording</button>
            <button onClick={() => { Perf.stop(); }}>Stop recording</button>
            <button onClick={() => { Perf.printInclusive(Perf.getLastMeasurements()); }}>Print Inclusive</button>
            <button onClick={() => { Perf.printExclusive(Perf.getLastMeasurements()); }}>Print Exclusive</button>
            <button onClick={() => { Perf.printWasted(Perf.getLastMeasurements()); }}>Print Wasted</button>
            <button onClick={() => { Perf.printOperations(Perf.getLastMeasurements()); }}>Print Operations</button>
          </p>
        </div>
      </div>
    );
  }
}

storiesOf(`${name}/Emoji React Performance`, module)
  .add('picker popup', () => (
    <div style={{ padding: '10px' }} >
      <PerformanceWrapper>
        <input
          id="picker-input"
          style={{
            height: '20px',
            margin: '10px',
          }}
        />
        <p style={{ width: '400px' }}>{lorem}</p>
        <EmojiPicker
          emojiProvider={getEmojiResource()}
          onSelection={action('emoji selected')}
          target="#picker-input"
          position="below"
        />
      </PerformanceWrapper>
    </div>
  ));
