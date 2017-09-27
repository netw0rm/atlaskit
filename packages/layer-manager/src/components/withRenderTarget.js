// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Gateway, GatewayRegistry } from './gateway';
import Portal from './Portal';
import type { ComponentType } from '../types';

export default function withRenderTarget(
  { target, wrapWithTransitionGroup }:
  { target: string, wrapWithTransitionGroup: boolean },
  WrappedComponent: ComponentType
) {
  return class extends Component {
    static contextTypes = {
      gatewayRegistry: PropTypes.instanceOf(GatewayRegistry),
    }

    render() {
      const { gatewayRegistry } = this.context;
      const GatewayOrPortal = gatewayRegistry ? Gateway : Portal;

      return (
        <GatewayOrPortal into={target} wrapWithTransitionGroup={wrapWithTransitionGroup}>
          <WrappedComponent {...this.props} />
        </GatewayOrPortal>
      );
    }
  };
}
