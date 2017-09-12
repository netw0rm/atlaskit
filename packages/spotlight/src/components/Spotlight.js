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
  /** The appearance of the dialog */
  dialogAppearance?: 'purple' | 'default',
  /** Where the dialog should appear, relative to the contents of the children. */
  dialogPlacement?: 'top left' | 'top center' | 'top right' | 'right top' | 'right middle' | 'right bottom' | 'bottom left' | 'bottom center' | 'bottom right' | 'left top' | 'left middle' | 'left bottom',
  /** width of the dialog */
  dialogWidth?: 'small' | 'medium' | 'large' | 'x-large',
  /** whether or not to display a pulse animation around the spotlighted element */
  pulse?: bool,
  /** alternative element to render than the wrapped target */
  renderElement?: ComponentType,
  /** the name of the spotlight target */
  target?: string,
  /** The elements rendered in the modal */
  targetOnClick?: FunctionType,
  /** the border-radius of the element being highlighted */
  targetRadius?: number,
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
    dialogWidth: 'medium',
  };

  handleTargetClick = (event) => {
    const { targetOnClick, target } = this.props;

    if (targetOnClick) targetOnClick({ event, target });
  }

  renderChild() {
    const { spotlightRegistry } = this.context;
    const { targetOnClick, pulse, targetRadius, renderElement: AltElement, target } = this.props;

    if (!target) {
      // eslint-disable-next-line no-console
      console.warn(`No target found for "${target}".`);
      return null;
    }

    const { element, ref } = spotlightRegistry.get(target);
    const { height, left, top, width } = ref.getBoundingClientRect();
    const dimensions = { height, left, top, width };

    return AltElement ? (
      <AltElement {...dimensions} />
    ) : (
      <Target pulse={pulse} radius={targetRadius} style={dimensions}>
        {element}
        <ClickTarget onClick={targetOnClick && this.handleTargetClick} />
      </Target>
    );
  }

  render() {
    const { dialogAppearance, children, dialogPlacement, target, dialogWidth } = this.props;
    const { scrollDistance } = this.state;

    const dialog = (
      <Dialog appearance={dialogAppearance} tabIndex="-1">
        {children}
      </Dialog>
    );

    // If a custom width (number or percentage) is supplied, set inline style
    // otherwise allow styled component to consume as named prop
    const acceptedWidths = Object.keys(DIALOG_WIDTH);
    const widthName = acceptedWidths.includes(dialogWidth) ? dialogWidth : null;
    const widthValue = widthName ? null : dialogWidth;

    const element = target ? (
      <Layer
        content={dialog}
        offset="0 8"
        position={dialogPlacement}
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
        <Blanket />
        {element}
      </div>
    );
  }
}
