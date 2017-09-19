// @flow
import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { GatewayDest, GatewayProvider } from './gateway';
import type { ChildrenType } from '../types';

type Props = { children: ChildrenType};

/* eslint-disable react/sort-comp */
export default class LayerManager extends PureComponent {
  state = { ariaHiddenNode: null }
  props: Props;
  static childContextTypes : Object = { ariaHiddenNode: PropTypes.object }

  getChildContext() {
    return {
      ariaHiddenNode: this.state.ariaHiddenNode,
    };
  }
  getAppRef = (ref) => !this.state.ariaHiddenNode && this.setState({ ariaHiddenNode: ref })

  render() {
    const { children } = this.props;

    return (
      <GatewayProvider>
        <div>
          <div ref={this.getAppRef} style={{ position: 'relative', zIndex: 0 }}>
            {Children.only(children)}
          </div>
          <GatewayDest
            component={TransitionGroup}
            id="gateway-destination-modal"
            name="modal"
          />
          <GatewayDest
            component={TransitionGroup}
            id="gateway-destination-spotlight"
            name="spotlight"
          />
        </div>
      </GatewayProvider>
    );
  }
}
