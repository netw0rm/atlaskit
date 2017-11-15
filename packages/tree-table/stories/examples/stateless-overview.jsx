import React, { PureComponent } from 'react';
import { TreeTable } from '@atlaskit/tree-table';

class StatelessTreeTableWrapper extends PureComponent {
  state = { active: false }

  render() {
    return (
      <TreeTable
        label="Power Station"
        onTreeTable={() => this.setState({ active: !this.state.active })}
        isActive={this.state.active}
      />
    );
  }
}

export default (<StatelessTreeTableWrapper />);
