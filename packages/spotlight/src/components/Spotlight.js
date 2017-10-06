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

type Props = {|
  /** The elements rendered in the modal */
  children: ElementType,
  /** The appearance of the dialog */
  dialogAppearance?: 'help' | 'default',
  /** Where the dialog should appear, relative to the contents of the children. */
  dialogPlacement?: 'top left' | 'top center' | 'top right' | 'right top' | 'right middle' | 'right bottom' | 'bottom left' | 'bottom center' | 'bottom right' | 'left top' | 'left middle' | 'left bottom',
  /** width of the dialog */
  dialogWidth?: number | 'small' | 'medium',
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
    // NOTE: `scrollY` is NOT public API, so is undocumented
    const {
      children, dialogAppearance, dialogPlacement, dialogWidth,
      footer, header, scrollY, target, // eslint-disable-line react/prop-types
    } = this.props;

    // If an appearance is supplied use that. Otherwise use help when a target
    // is present and default when modal
    const appearance = dialogAppearance || (target ? 'help' : 'default');

    // If a custom width (number or percentage) is supplied, set inline style
    // otherwise allow styled component to consume as named prop
    const size = dialogWidth || (target ? 'small' : 'medium');

    const dialog = (
      <FocusScope>
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
      <FillScreen in scrollDistance={scrollY}>
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
          <DialogPositioner in size={size}>
            {dialog}
          </DialogPositioner>
        )}
      </FillScreen>
    );
  }
}

export default withScrollMeasurements(
  withRenderTarget(
    {
      target: 'spotlight',
      wrapWithTransitionGroup: false,
    },
    Spotlight
  )
);
