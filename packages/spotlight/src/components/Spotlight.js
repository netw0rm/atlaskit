// @flow
/* eslint-disable react/sort-comp, react/no-multi-comp */
import React, { Component } from 'react';
import { FocusScope, withRenderTarget } from '@atlaskit/layer-manager';
import Layer from '@atlaskit/layer';
import { layers } from '@atlaskit/theme';

import type { ComponentType, ElementType, FunctionType } from '../types';
import { Dialog, DialogBody, DialogPositioner, FillScreen } from '../styled/Dialog';
import { TargetOverlay, TargetOuter, TargetInner } from '../styled/Target';
import withScrollMeasurements from '../hoc/withScrollMeasurements';
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

  static defaultProps = {
    pulse: true,
  };

  handleTargetClick = (event) => {
    const { targetOnClick, target } = this.props;

    targetOnClick({ event, target });
  }

  renderTargetClone() {
    // NOTE: `clone` & `rect` are NOT public API
    const {
      clone, // eslint-disable-line react/prop-types
      pulse,
      rect, // eslint-disable-line react/prop-types
      target,
      targetBgColor,
      targetOnClick,
      targetRadius,
      targetReplacementComponent: Replacement,
    } = this.props;

    if (!target) {
      throw Error(`Spotlight couldn't find a target matching "${target}".`);
    }

    return Replacement ? (
      <Replacement {...rect} />
    ) : (
      <TargetOuter style={rect}>
        <TargetInner pulse={pulse} bgColor={targetBgColor} radius={targetRadius} style={rect}>
          <Clone html={clone} />
          <TargetOverlay onClick={targetOnClick && this.handleTargetClick} />
        </TargetInner>
      </TargetOuter>
    );
  }

  render() {
    // NOTE: `in` & `scrollY` are NOT public API, so are undocumented
    const {
      children, dialogAppearance, dialogPlacement, dialogWidth,
      footer, header, in: inProp, scrollY, target, // eslint-disable-line react/prop-types
    } = this.props;

    // NOTE: the `in` property is provided by a container -- react-transition-group.
    // It is not part of the public API, so should NOT be documented.
    // eslint-disable-next-line react/prop-types
    // if (!this.props.in) return null;

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

    // console.log('props', this.props);

    return (
      <Fill scrollDistance={scrollY} in={inProp}>
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
          <Positioner in={inProp} size={size}>
            {dialog}
          </Positioner>
        )}
      </Fill>
    );
  }
}

export default withScrollMeasurements(
  withRenderTarget(
    { target: 'spotlight' },
    Spotlight
  )
);
