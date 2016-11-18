import React, { Component } from 'react';

import Badge from '../src';

export default class OnValueUpdatedDemo extends Component {
  constructor() {
    super();
    this.state = { value: 1 };
  }

  render() {
    return (
      <div>
        <p>Open your browser console and then click the increment button</p>
        <Badge
          value={this.state.value}
          onValueUpdated={(detail) => {
            console.log('onValueUpdated called with:', detail);
          }}
        />
        <button
          onClick={() => this.setState({ value: this.state.value + 1 })}
        >Increment</button>
      </div>
    );
  }
}
