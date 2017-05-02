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
      delay: 100,
      state: 'spinning',
    };
  }

  handleSpinnerClick = () => {
    this.setState({
      active: !this.state.active,
      state: this.state.active ? 'removing' : 'spinning',
    });
  }

  handleOnComplete = () => {
    this.setState({ state: 'completed' });
  }

  handleInputChange = (e) => {
    this.setState({ delay: Number.parseInt(e.target.value, 10) });
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const containerStyles = {
      display: 'inline-flex',
      padding: '10px',
      border: '1px solid',
    };
    const inputStyles = {
      marginLeft: '5px',
      width: '5em',
    };
    const labelStyles = {
      marginLeft: '10px',
    };
    return (
      <div>
        <div style={containerStyles}>
          <div onClick={this.handleSpinnerClick}>
            <Spinner
              isCompleting={!this.state.active}
              onComplete={this.handleOnComplete}
              delay={this.state.delay}
            />
          </div>
          <label htmlFor="delayInput" style={labelStyles} >
            Delay
          </label>
          <input type="number" id="delayInput" style={inputStyles} value={this.state.delay} onChange={this.handleInputChange} />
        </div>
        <div>Click the spinner to see it&#39;s fade in and out animations.</div>
        <div>The delay field will modify the delay before the spinner shows.</div>
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
