// @flow

import React, { Component } from 'react';
import Button from '@atlaskit/button';

export default class extends Component {
  state = {
    count: 0,
    disabled: true,
  }

  increment = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  }

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  toggleChildren = () => {
    this.setState({
      childrenEls: !this.state.childrenEls,
    });
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        style={{ padding: 40 }}
        onClick={this.increment}
      >
        <p>Disabled button should swallow onClick events when the button does not contain child
           elements (only text) so they do not propagate to parent handlers, just like native
           buttons.
        </p>
        <p>
          <button disabled={this.state.disabled}>
            {this.state.childrenEls ? <div>Disabled native button</div> : 'Disabled native button'}
          </button>
        </p>
        <p>
          <Button isDisabled={this.state.disabled}>
            {this.state.childrenEls ? <div>Disabled AK button</div> : 'Disabled AK button'}
          </Button>
        </p>
        <p>Click count: {this.state.count}</p>
        <p><Button onClick={this.toggleDisabled}>Toggle Disabled</Button></p>
        <p>
          <Button onClick={this.toggleChildren}>Toggle button child elements</Button>
          Child button elements { this.state.childrenEls ? '' : 'do not '}exist
        </p>
      </div>
    );
  }
}
