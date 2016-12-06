import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';

import Badge from '../src';

export default class OnValueUpdatedDemo extends PureComponent {
  constructor() {
    super();
    this.state = { value: 1 };
  }

  render() {
    return (
      <div>
        <Badge
          value={this.state.value}
          onValueUpdated={(detail) => {
            action(`onValueUpdated called with oldValue ${detail.oldValue}, newValue ${detail.newValue}`)();
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
