import React, { PureComponent } from 'react';
import { LayerManager } from '@atlaskit/layer-manager';

class StatelessLayerManagerWrapper extends PureComponent {
  state = { active: false }

  render() {
    return (
      <LayerManager
        label="Power Station"
        onLayerManager={() => this.setState({ active: !this.state.active })}
        isActive={this.state.active}
      />
    );
  }
}

export default (<StatelessLayerManagerWrapper />);
