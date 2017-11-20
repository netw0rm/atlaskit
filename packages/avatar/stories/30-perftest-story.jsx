
/* eslint-disable react/prop-types, react/no-multi-comp */

import { storiesOf } from '@kadira/storybook';

import React, { Component } from 'react';

import { name } from '../package.json';
import Avatar from '../src';
import { AvatarCol, AvatarRow } from './styled';

const PER_RUN = 100;
const TEST_RUNS = 5;
const avatarSource = 'https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg';

const DefaultAvatar = props => <AvatarCol><Avatar {...props} /></AvatarCol>;

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
  renderAvatars() {
    const { count } = this.state;
    const avatars = [];
    for (let i = 1; i <= count; i++) {
      avatars.push(
        <AvatarRow>
          <DefaultAvatar src={avatarSource} size="large" enableTooltip name="test" />
          <DefaultAvatar src={avatarSource} size="large" presence="busy" enableTooltip name="test" />
          <DefaultAvatar src={avatarSource} size="large" presence="offline" enableTooltip name="test" />
          <DefaultAvatar src={avatarSource} size="large" presence="online" enableTooltip name="test" />
        </AvatarRow>
      );
    }
    return avatars;
  }
  render() {
    return (
      <div>
        <button appearance="primary" onClick={this.startTest}>Start Test</button>
        <div>
          {this.renderAvatars()}
        </div>
      </div>
    );
  }
}

storiesOf(name, module).add('performance test', () => <PerfTest />);
