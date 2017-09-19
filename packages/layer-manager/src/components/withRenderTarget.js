// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Gateway, GatewayRegistry } from './gateway';
import Portal from './Portal';

// eslint-disable-next-line
export default function withRenderTarget({ target }: string, WrappedComponent: ReactClass<*>) {
  return class extends Component {
    static contextTypes = {
      gatewayRegistry: PropTypes.instanceOf(GatewayRegistry),
    }

    render() {
      const { gatewayRegistry } = this.context;
      const GatewayOrPortal = gatewayRegistry ? Gateway : Portal;

      return (
        <GatewayOrPortal into={target}>
          <WrappedComponent {...this.props} />
        </GatewayOrPortal>
      );
    }
  };
}
