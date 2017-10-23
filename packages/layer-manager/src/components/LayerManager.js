// @flow
import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import { GatewayDest, GatewayProvider } from './gateway';
import type { ChildrenType } from '../types';

type Props = { children: ChildrenType};

// NOTE: lock the app wrapper to a 0 z-index. This allows layer manager to
// render all gateways hierarchically, on top of the app, without needing
// incremental z-indexes.
const AppWrapper = styled.div`
  position: relative,
  z-index: 0;
`;

/* eslint-disable react/sort-comp */
export default class LayerManager extends PureComponent {
  props: Props
  state = { ariaHiddenNode: null }
  static childContextTypes = { ariaHiddenNode: PropTypes.object }

  getChildContext() {
    return {
      ariaHiddenNode: this.state.ariaHiddenNode,
    };
  }
  getAppRef = (ref) => {
    if (this.state.ariaHiddenNode) return;

    this.setState({ ariaHiddenNode: ref });
  }

  render() {
    const { children } = this.props;

    return (
      <GatewayProvider>
        <AppWrapper ref={this.getAppRef}>
          {Children.only(children)}
        </AppWrapper>
        <GatewayDest name="modal" component={TransitionGroup} />
        <GatewayDest name="spotlight" />
        <GatewayDest name="tooltip" component={TransitionGroup} />
      </GatewayProvider>
    );
  }
}
