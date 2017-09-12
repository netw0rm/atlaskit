// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layer from '@atlaskit/layer';

import type { ComponentType, ElementType, FunctionType } from '../types';
import SpotlightRegistry from './SpotlightRegistry';
import { DIALOG_WIDTH, Dialog, DialogPositioner, FillScreen } from '../styled/Dialog';
import Blanket from '../styled/Blanket';
import { ClickTarget, Target } from '../styled/Target';

type Props = {|
  /** The elements rendered in the modal */
  children: ElementType,
  /** The elements rendered in the modal */
  onClick?: FunctionType,
  /** Where the dialog should appear, relative to the contents of the children. */
  position?: 'top left' | 'top center' | 'top right' | 'right top' | 'right middle' | 'right bottom' | 'bottom left' | 'bottom center' | 'bottom right' | 'left top' | 'left middle' | 'left bottom',
  /** whether or not to display a pulse animation around the spotlighted element */
  pulse?: bool,
  /** the border-radius of the element being highlighted */
  radius?: number,
  /** alternative element to render than the wrapped target */
  renderElement?: ComponentType,
  /** the name to reference later */
  target?: string,
  /** width of the dialog */
  width?: 'small' | 'medium' | 'large' | 'x-large',
|};
type State = {
  scrollDistance: number,
}

function getScrollDistance() {
  return window.pageYOffset
  || document.documentElement.scrollTop
  || document.body.scrollTop
  || 0;
}
function getInitialState() {
  return {
    scrollDistance: getScrollDistance(),
  };
}

/* eslint-disable react/sort-comp */
export default class Spotlight extends Component {
  props: Props;
  state: State = getInitialState();

  static contextTypes = {
    spotlightRegistry: PropTypes.instanceOf(SpotlightRegistry).isRequired,
  };
  static defaultProps = {
    pulse: true,
    width: 'medium',
  };

  handleChildClick = (event) => {
    const { onClick, target } = this.props;

    if (onClick) onClick({ event, target });
  }

  renderChild() {
    const { spotlightRegistry } = this.context;
    const { onClick, pulse, radius, renderElement: AltElement, target } = this.props;

    if (!target) return null;

    const { element, ref } = spotlightRegistry.get(target);
    const { height, left, top, width } = ref.getBoundingClientRect();
    const dimensions = { height, left, top, width };

    return AltElement ? (
      <AltElement {...dimensions} />
    ) : (
      <Target pulse={pulse} radius={radius} style={dimensions}>
        {element}
        <ClickTarget onClick={onClick && this.handleChildClick} />
      </Target>
    );
  }

  render() {
    const { children, position, target, width } = this.props;
    const { scrollDistance } = this.state;
    const dialog = <Dialog tabIndex="-1">{children}</Dialog>;

    // If a custom width (number or percentage) is supplied, set inline style
    // otherwise allow styled component to consume as named prop
    const acceptedWidths = Object.keys(DIALOG_WIDTH);
    const widthName = acceptedWidths.includes(width) ? width : null;
    const widthValue = widthName ? null : width;

    const element = target ? (
      <Layer
        content={dialog}
        offset="0 8"
        position={position}
      >
        {this.renderChild()}
      </Layer>
    ) : (
      <FillScreen scrollDistance={scrollDistance}>
        <DialogPositioner
          widthName={widthName}
          widthValue={widthValue}
        >
          {dialog}
        </DialogPositioner>
      </FillScreen>
    );

    return (
      <div>
        <Blanket isTinted />
        {element}
      </div>
    );
  }
}
