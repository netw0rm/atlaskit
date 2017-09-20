// @flow
/* eslint-disable react/sort-comp, react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FocusScope, ScrollLock, withRenderTarget } from '@atlaskit/layer-manager';
import Layer from '@atlaskit/layer';
import { layers } from '@atlaskit/theme';

import type { ComponentType, ElementType, FunctionType } from '../types';
import { Dialog, DialogBody, DialogPositioner, FillScreen } from '../styled/Dialog';
import Blanket from '../styled/Blanket';
import { TargetOverlay, TargetOuter, TargetInner } from '../styled/Target';

import SpotlightRegistry from './SpotlightRegistry';
import { Fade, SlideUp } from './Animation';

// Rename transition components for easier parsing of the render method
const Fill = props => <Fade component={FillScreen} {...props} />;
const Positioner = props => <SlideUp component={DialogPositioner} {...props} />;

type Props = {|
  /** The elements rendered in the modal */
  children: ElementType,
  /** The appearance of the dialog */
  dialogAppearance?: 'help' | 'default',
  /** Where the dialog should appear, relative to the contents of the children. */
  dialogPlacement?: 'top left' | 'top center' | 'top right' | 'right top' | 'right middle' | 'right bottom' | 'bottom left' | 'bottom center' | 'bottom right' | 'left top' | 'left middle' | 'left bottom',
  /** width of the dialog */
  dialogWidth?: 'small' | 'medium',
  /** Optional element rendered below the body */
  footer?: ElementType,
  /** Optional element rendered above the body */
  header?: ElementType,
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
  scrollY: number,
}

function getScrollY() {
  return window.pageYOffset
  || document.documentElement.scrollTop
  || document.body.scrollTop
  || 0;
}
function getInitialState() {
  return {
    scrollY: getScrollY(),
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
  };
  componentWillMount() {
    // NOTE: we don't document the spotlightRegistry prop type because it
    // is provided by the HOC and not part of the public API.
    // eslint-disable-next-line react/prop-types
    const { spotlightRegistry, target } = this.props;

    if (!spotlightRegistry) {
      throw Error('`Spotlight` requires `SpotlightManager` as an ancestor.');
    }

    if (target) {
      this._node = spotlightRegistry.get(target);
      this.measureAndScroll(this._node);
    }
  }

  handleTargetClick = (event) => {
    const { targetOnClick, target } = this.props;

    if (targetOnClick) targetOnClick({ event, target });
  }
  measureAndScroll = (node) => {
    const { height, left, top, width } = node.getBoundingClientRect();
    const gutter = 10; // enough room to be comfortable and not crop the pulse animation

    let adjustedTop = top;

    // get adjusted measurements after scrolling
    if ((top < 0) || (top > window.innerHeight)) {
      adjustedTop = gutter;
      window.scrollTo(0, top - gutter);
    }

    this.setState({
      height,
      left,
      scrollY: getScrollY(),
      top: adjustedTop,
      width,
    });
  }

  renderTargetClone() {
    const {
      pulse,
      target,
      targetBgColor,
      targetRadius,
      targetReplacementComponent: Replacement,
    } = this.props;

    const { height, left, top, width } = this.state;
    const dimensions = { height, left, top, width };

    if (!target) {
      throw Error(`Spotlight couldn't find a target matching "${target}".`);
    }

    return Replacement ? (
      <Replacement {...dimensions} />
    ) : (
      <TargetOuter style={dimensions}>
        <TargetInner pulse={pulse} bgColor={targetBgColor} radius={targetRadius} style={dimensions}>
          <Clone html={this._node.outerHTML} />
          <TargetOverlay onClick={this.handleTargetClick} />
        </TargetInner>
      </TargetOuter>
    );
  }

  render() {
    const {
      children, dialogAppearance, dialogPlacement, dialogWidth, footer, header, target,
    } = this.props;
    const { scrollY } = this.state;

    // NOTE: the `in` property is provided by a container -- react-transition-group.
    // It is not part of the public API, so should NOT be documented.
    // eslint-disable-next-line react/prop-types
    if (!this.props.in) return null;

    // If an appearance is supplied use that. Otherwise use help when a target
    // is present and default when modal
    const appearance = dialogAppearance || (target ? 'help' : 'default');

    // If a custom width (number or percentage) is supplied, set inline style
    // otherwise allow styled component to consume as named prop
    const size = dialogWidth || (target ? 'small' : 'medium');

    const dialog = (
      <FocusScope key={target}>
        <Dialog
          appearance={appearance}
          size={size}
          tabIndex="-1"
        >
          {header}
          <DialogBody>
            {children}
          </DialogBody>
          {footer}
        </Dialog>
      </FocusScope>
    );

    return (
      <Fill scrollDistance={scrollY} in>
        <Blanket />
        <ScrollLock />
        {target ? (
          <Layer
            boundariesElement="scrollParent"
            content={dialog}
            offset="0 8"
            position={dialogPlacement}
            zIndex={layers.spotlight(this.props)}
          >
            {this.renderTargetClone()}
          </Layer>
        ) : (
          <Positioner in size={size}>
            {dialog}
          </Positioner>
        )}
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
