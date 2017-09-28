import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies
import React, { PureComponent } from 'react';
import Layer from '@atlaskit/layer';

import { name } from '../package.json';

const style = {
  content: {
    background: 'palevioletred',
    color: 'papayawhip',
    padding: '5px 10px',
  },
  target: {
    background: 'papayawhip',
    color: 'palevioletred',
    display: 'inline-block',
    marginLeft: '200px',
    padding: '30px',
    position: 'relative',
  },
};

class Toggle extends PureComponent {
  state = { showContent: false }
  toggleContent = () => this.setState(state => ({ showContent: !state.showContent }));
  render() {
    const content = this.state.showContent
      ? <div style={style.content}>Layer Content</div>
      : null;

    return (
      <div>
        <Layer content={content}>
          <div style={style.target}>Target Content</div>
        </Layer>
        <button onClick={this.toggleContent}>Toggle</button>
      </div>
    );
  }
}

storiesOf(name, module)
  .add('🕹 Toggle Content', () => (
    <Toggle />
  ));
