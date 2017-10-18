// @flow
import React, { Component } from 'react';

import type { ComponentType, ElementType, PlacementType, PositionType } from '../types';
import { Tooltip as StyledTooltip } from '../styled/Tooltip';

import Portal from './Portal';
import TooltipMarshall from './Marshall';
import Transition from './Transition';
import Target from './Target';
import { getPosition } from './utils';

type Props = {|
  children: ComponentType | ElementType,
  description: string,
  placement: PlacementType,
|};
type State = {|
  isVisible: bool,
  placement: PlacementType,
  position: PositionType,
|};

// global tooltip marshall
const marshall = new TooltipMarshall();

function getInitialState(props) {
  return {
    isVisible: false,
    placement: props.placement,
    position: { left: 0, top: 0 },
  };
}

export default class Tooltip extends Component {
  props: Props // eslint-disable-line react/sort-comp
  state: State = getInitialState(this.props)
  static defaultProps = { placement: 'bottom' }

  handleTargetRef = (ref) => {
    this.target = ref;
  }

  handleMeasureRef = (tooltip) => {
    if (!tooltip) return;

    const { placement } = this.props;
    const { target } = this;

    this.setState(getPosition({ placement, target, tooltip }));
  }

  renderTooltip() {
    const { description } = this.props;
    const { immediate, isVisible, placement, position } = this.state;

    if (!isVisible) return null;

    // render node for measuring
    if (!position) {
      return (
        <Portal>
          <StyledTooltip innerRef={this.handleMeasureRef} style={{ visibility: 'hidden' }}>
            {description}
          </StyledTooltip>
        </Portal>
      );
    }

    // render tooltip when position available
    const transitionProps = { immediate, placement, position };
    return (
      <Transition {...transitionProps}>
        {description}
      </Transition>
    );
  }

  show = ({ immediate } = { immediate: false }) => {
    this.setState({ immediate, isVisible: true, position: null });
  }
  hide = ({ immediate } = { immediate: false }) => {
    this.setState({ immediate, isVisible: false, position: null });
  }

  handleMouseEnter = () => {
    marshall.show(this);
  }
  handleMouseLeave = () => {
    marshall.hide(this);
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Target
          innerRef={this.handleTargetRef}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {children}
        </Target>
        {this.renderTooltip()}
      </div>
    );
  }
}
