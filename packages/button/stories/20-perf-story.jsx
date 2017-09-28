/* eslint-disable react/prop-types, react/no-multi-comp */

import { storiesOf } from '@kadira/storybook';

import React, { Component } from 'react';
import styled from 'styled-components';

import { name } from '../package.json';
import Button from '../src';

class CustomComponent extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <div {...props}>{children}</div>
    );
  }
}

const Buttons = styled.div`
  padding: 10px;
`;

const PER_RUN = 100;
const TEST_RUNS = 5;

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
        console.log(`Finished performance test in ${time}ms`);
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
      buttons.push(
        <Buttons key={`buttons-${i}`}>
          <Button appearance="default">Button {i}</Button>
          <Button appearance="danger">Button {i}</Button>
          <Button appearance="primary">Button {i}</Button>
          <Button appearance="help">Button {i}</Button>
          <Button component={CustomComponent}>Button {i}</Button>
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
