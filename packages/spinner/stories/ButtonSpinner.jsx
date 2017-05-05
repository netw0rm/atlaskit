import React, { PureComponent, PropTypes } from 'react';
import AKButton from '@atlaskit/button';

import Spinner from '../src/index';
/**
 * @description Spinner component with event handlers and state for use in storybook
 */
export default class StatefulSpinner extends PureComponent {
  static propTypes = {
    onComplete: PropTypes.func,
  }

  static defaultProps = {
    onComplete: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      active: true,
      state: 'spinning',
    };
  }

  onComplete = () => {
    this.setState({
      state: 'completed',
    });
    this.props.onComplete();
  }

  handleClick = () => {
    this.setState({
      active: !this.state.active,
      state: this.state.active ? 'removing' : 'spinning',
    });
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    return (
      <div>
        <AKButton
          onClick={this.handleClick}
          iconAfter={<Spinner isCompleting={!this.state.active} onComplete={this.onComplete} />}
        >
          Click me!!
        </AKButton>
        <br />
        <AKButton
          appearance="primary"
          onClick={this.handleClick}
          iconAfter={
            <Spinner isCompleting={!this.state.active} onComplete={this.onComplete} invertColor />
          }
        >
          Click me!!
        </AKButton>
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
