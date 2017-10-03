import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from '@atlaskit/button';

import Tooltip from '../src/index';
import { name } from '../package.json';

const PER_RUN = 100;
const TEST_RUNS = 5;

function getInitialState() {
  return {
    count: 0,
    tests: 0,
    time: 0,
  };
}

class PerfTest extends Component {
  state = getInitialState()
  startTest = () => {
    console.log('Starting performance test...');

    let runs = 0;
    let startTime;

    const run = () => {
      if (!runs) {
        startTime = Date.now();
      }
      if (runs === TEST_RUNS) {
        const time = Date.now() - startTime;
        console.log(`Finished performance test in ${time}ms`);
        this.setState({ time, tests: this.state.tests + 1 });
        return;
      }
      runs++;
      this.setState({ count: runs * PER_RUN }, run);
    };

    this.setState({ count: 0 }, run);
  }
  clearResults = () => {
    this.setState(getInitialState(), this.renderTooltips);
  }
  renderTooltips() {
    const { count } = this.state;
    const avatars = [];
    for (let i = 1; i <= count; i++) {
      avatars.push(
        <Tooltip key={i} description="Tooltip Content" position="right">
          <button>Hover Me</button>
        </Tooltip>
      );
    }
    return avatars;
  }
  render() {
    const { tests, time } = this.state;

    return (
      <div style={{ padding: '2em' }}>
        <Button appearance="primary" onClick={this.startTest}>
          Start Test {tests + 1}
        </Button>
        {time ? (
          <div style={{ marginTop: '1em' }}>
            <p>Rendered {TEST_RUNS}&times;{PER_RUN} tooltips in <code>{time}ms</code></p>
            <button onClick={this.clearResults}>Clear</button>
          </div>
        ) : (
          <div style={{ marginTop: '1em' }}>
            <p>Start test to see results...</p>
          </div>
        )}
        <div style={{ marginTop: '1em' }}>
          {this.renderTooltips()}
        </div>
      </div>
    );
  }
}

storiesOf(name, module).add('⚡️ Performance Test', () => <PerfTest />);
