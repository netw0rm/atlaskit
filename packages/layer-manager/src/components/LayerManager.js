// @flow
import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { GatewayDest, GatewayProvider } from './gateway';
import type { ChildrenType } from '../types';

type Props = { children: ChildrenType};

export default class LayerManager extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp
  appId: string;
  static childContextTypes : Object= { appId: PropTypes.string }
  constructor(props: Props, context: mixed) {
    super(props, context);
    this.appId = 'app-wrapper';
  }
  getChildContext() {
    return {
      appId: this.appId,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <GatewayProvider>
        <div>
          <div id={this.appId} style={{ position: 'relative', zIndex: 0 }}>
            {Children.only(children)}
          </div>
          <GatewayDest
            component={TransitionGroup}
            id="gateway-destination-modal"
            name="modal"
          />
        </div>
      </GatewayProvider>
    );
  }
}
