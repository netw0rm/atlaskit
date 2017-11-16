import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import { head } from './sample-data';

export default class extends PureComponent {
  state = {
    isLoading: true,
  }
  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({
            isLoading: !this.state.isLoading,
          })}
        >Toggle loading</Button>
        <DynamicTableStateless
          head={head}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}
