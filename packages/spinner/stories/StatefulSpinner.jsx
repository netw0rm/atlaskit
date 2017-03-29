import React, { PureComponent } from 'react';

import Spinner from '../src/index';
/**
 * @description Spinner component with event handlers and state for use in storybook
 * It's state can either be spinning, completing or completed
 */
export default class StatefulSpinner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      state: 'spinning',
    };
  }

  handleClick = () => {
    this.setState({
      active: !this.state.active,
      state: this.state.active ? 'removing' : 'spinning',
    });
  }

  handleOnComplete = () => {
    this.setState({
      state: 'completed',
    });
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const containerStyles = {
      display: 'inline-block',
      padding: '5px',
      border: '1px solid',
    };
    return (
      <div>
        <div onClick={this.handleClick} style={containerStyles}>
          <Spinner isCompleting={!this.state.active} onComplete={this.handleOnComplete} />
        </div>
        <div>Click the spinner to see it&#39;s fade in and out animations.</div>
        <div>There should be a 100ms delay between clicking it and the spinner showing</div>
        <div>
          <code>isCompleting</code> is currently set to <code>{`${!this.state.active}`}</code>
        </div>
        <div>
          <code>state</code> is currently set to <code>{`${this.state.state}`}</code>
        </div>
      </div>
    );
  }
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}
