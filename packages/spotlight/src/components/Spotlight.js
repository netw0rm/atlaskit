// @flow
/* eslint-disable react/sort-comp, react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRenderTarget } from '@atlaskit/layer-manager';
import Layer from '@atlaskit/layer';
import type { ComponentType, ElementType, FunctionType } from '../types';
import { DIALOG_WIDTH, Dialog, DialogPositioner, FillScreen } from '../styled/Dialog';
import Blanket from '../styled/Blanket';
import { ClickTarget, Target } from '../styled/Target';

import SpotlightRegistry from './SpotlightRegistry';
import { Fade, SlideUp } from './Animation';

// Rename transition components for easier parsing of the render method
const Fill = props => <Fade component={FillScreen} {...props} />;
const Positioner = props => <SlideUp component={DialogPositioner} {...props} />;

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
  /** the name of the SpotlightTarget */
  target?: string,
  /** the background color of the element being highlighted */
  targetBgColor?: string,
  /** The elements rendered in the modal */
  targetOnClick?: FunctionType,
  /** the border-radius of the element being highlighted */
  targetRadius?: number,
  /** alternative element to render than the wrapped target */
  targetReplacementComponent?: ComponentType,
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

/* eslint-disable react/prop-types, react/no-danger */
const Clone = ({ html }) => (
  <div
    dangerouslySetInnerHTML={{ __html: html }}
    style={{ pointerEvents: 'none' }}
  />
);
/* eslint-enable react/prop-types, react/no-danger */

class Spotlight extends Component {
  props: Props;
  state: State = getInitialState();

  static defaultProps = {
    pulse: true,
    dialogWidth: 'medium',
  };

  handleTargetClick = (event) => {
    const { targetOnClick, target } = this.props;

    if (targetOnClick) targetOnClick({ event, target });
  }

  renderTargetClone() {
    const {
      // NOTE: we don't document the spotlightRegistry prop type because it
      // is provided by the HOC and not part of the public API.
      // eslint-disable-next-line react/prop-types
      spotlightRegistry,
      pulse,
      target,
      targetBgColor,
      targetOnClick,
      targetRadius,
      targetReplacementComponent: Replacement,
    } = this.props;

    if (!target) {
      throw Error(`Spotlight couldn't find a target matching "${target}".`);
    }
    if (!spotlightRegistry) {
      throw Error('`Spotlight` requires `SpotlightManager` as an ancestor.');
    }

    const node = spotlightRegistry.get(target);

    const { height, left, top, width } = node.getBoundingClientRect();
    const dimensions = { height, left, top, width };
    const onClick = targetOnClick && this.handleTargetClick;

    return Replacement ? (
      <Replacement {...dimensions} />
    ) : (
      <Target pulse={pulse} bgColor={targetBgColor} radius={targetRadius} style={dimensions}>
        <Clone html={node.outerHTML} />
        <ClickTarget onClick={onClick} />
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

    // NOTE: the `in` property is not part of the public API and should NOT be documented
    // eslint-disable-next-line react/prop-types
    return target ? this.props.in && (
      <Layer
        content={dialog}
        offset="0 8"
        position={dialogPlacement}
        style={{ transition: 'all 240ms cubic-bezier(0.075, 0.82, 0.165, 1)' }}
      >
        {this.renderTargetClone()}
        <Blanket />
      </Layer>
    ) : (
      <Fill scrollDistance={scrollDistance} {...this.props}>
        <Blanket />
        <Positioner
          {...this.props}
          widthName={widthName}
          widthValue={widthValue}
        >
          {dialog}
        </Positioner>
      </Fill>
    );
  }
}

const SpotlightWithRenderTarget = withRenderTarget({ target: 'spotlight' }, Spotlight);

class SpotlightWrapper extends Component {
  static contextTypes = {
    spotlightRegistry: PropTypes.instanceOf(SpotlightRegistry).isRequired,
  };
  render() {
    return <SpotlightWithRenderTarget {...this.props} {...this.context} />;
  }
}

export default SpotlightWrapper;
