// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Gateway, GatewayRegistry } from './gateway';
import Portal from './Portal';
import type { ComponentType } from '../types';

export default function withRenderTarget(
  { target, withTransitionGroup }:
  { target: string, withTransitionGroup: boolean },
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
        <GatewayOrPortal into={target} withTransitionGroup={withTransitionGroup}>
          <WrappedComponent {...this.props} />
        </GatewayOrPortal>
      );
    }
  };
}
