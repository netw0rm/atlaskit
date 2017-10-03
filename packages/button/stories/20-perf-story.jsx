/* eslint-disable react/prop-types, react/no-multi-comp */

import { storiesOf } from '@kadira/storybook';

import React, { Component } from 'react';
import styled from 'styled-components';

import { name } from '../package.json';
import Button from '../src';

class CustomComponent extends Component {
  render() {
    const { children, innerRef, ...props } = this.props; // eslint-disable-line
    return (
      <div {...props}>{children}</div>
    );
  }
}

const Buttons = styled.div`
  padding: 10px;
`;

const PER_RUN = 100; // how many button groups to render
const TEST_RUNS = 5; // how many render passes to run during the test
const BUTTON_COUNT = 5; // the number of buttons per group

class PerfTest extends Component {
  state = {
    count: 0,
  }
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
        let totalButtons = 0;
        for (let i = 1; i <= TEST_RUNS; i++) {
          totalButtons += BUTTON_COUNT * PER_RUN * i;
        }
        console.log('Finished performance test');
        console.log(`Rendered ${totalButtons} buttons in ${time}ms (${TEST_RUNS} runs)`);
        return;
      }
      runs++;
      this.setState({ count: runs * PER_RUN }, run);
    };
    this.setState({ count: 0 }, run);
  }
  renderButtons() {
    const { count } = this.state;
    const buttons = [];
    for (let i = 1; i <= count; i++) {
      const buttonNumber = (i - 1) * BUTTON_COUNT;
      buttons.push(
        <Buttons key={`buttons-${i}`}>
          <Button appearance="default">Button {buttonNumber + 1}</Button>
          <Button appearance="danger">Button {buttonNumber + 2}</Button>
          <Button appearance="primary">Button {buttonNumber + 3}</Button>
          <Button appearance="help">Button {buttonNumber + 4}</Button>
          <Button component={CustomComponent}>Button {buttonNumber + 5}</Button>
        </Buttons>
      );
    }
    return buttons;
  }
  render() {
    return (
      <div>
        <Buttons>
          <Button appearance="primary" onClick={this.startTest}>Start Test</Button>
        </Buttons>
        <div>
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

storiesOf(name, module).add('performance test', () => <PerfTest />);
