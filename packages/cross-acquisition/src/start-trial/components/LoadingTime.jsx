import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';

export class LoadingTimeBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    // crossSell: crossSellShape,
  };

  render() {
    return (
      <div>
        <div>LOADING TIME</div>
        <button onClick={this.props.onComplete}>Next</button>
      </div>
    );
  }
}

export default withCrossSellProvider(LoadingTimeBase, context => context);
