// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Gateway, GatewayRegistry } from '../../gateway';
import { WIDTH_ENUM } from '../shared-variables';

import {
  DialogPositioner as StyledDialogPositioner,
  Dialog,
  FillScreen as StyledFillScreen,
  Overlay,
} from '../styled/Modal';
import { Fade, SlideUp } from './Animation';
import Content from './Content';
import Portal from './Portal';

// Rename animation imports for easier parsing of the render method
const DialogPositioner = props => <SlideUp component={StyledDialogPositioner} {...props} />;
const FillScreen = props => <Fade component={StyledFillScreen} {...props} />;

function getInitialState() {
  return {
    dialogNode: null,
    isBackground: false,
    tabDirection: null,
  };
}

export default class Modal extends Component {
  static propTypes = {
    /** Buttons to render in the footer */
    actions: PropTypes.arrayOf(PropTypes.shape({
      onClick: PropTypes.function,
      text: PropTypes.string,
    })),
    /** Appearance of the modal */
    appearance: PropTypes.oneOf(['error', 'warning']),
    /**
      Boolean OR Function indicating which element to focus when the component mounts
      TRUE will automatically find the first "tabbable" element within the modal
      Providing a function should return the element you want to focus
    */
    autoFocus: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    /**
      Content of the modal
    */
    children: PropTypes.node,
    /** Elements to render in the header of the modal. */
    header: PropTypes.node,
    /** Elements to render in the footer of the moda.l */
    footer: PropTypes.node,
    /** Whether or not the modal is visible */
    isOpen: PropTypes.bool,
    /** Height of the modal. If not set, the modal grows to fit the content until it
    runs out of vertical space, at which point scrollbars appear. If a number is
    provided, the height is set to that number in pixels. A string including pixels,
    or a percentage, will be directly applied as a style. Several size options are
    also recognised. */
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    /** Width of the modal. This can be provided in three different ways.
    If a number is provided, the width is set to that number in pixels.
    A string including pixels, or a percentage, will be directly applied as a style.
    Several size options are also recognised. */
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.oneOf(WIDTH_ENUM.values),
    ]),
    /**
      Function that will be run after the modal has opened.
    */
    onOpenComplete: PropTypes.func,
    /**
      Function that will be run when the modal changes position in the stack
    */
    onStackChange: PropTypes.func,
    /**
      Function that will be run when the modal is requested to be closed, prior to actually closing.
    */
    onDialogDismissed: PropTypes.func.isRequired,
    /**
      Boolean indicating if clicking the overlay should close the modal
    */
    shouldCloseOnOverlayClick: PropTypes.bool,
    /**
      Boolean indicating if pressing the `esc` key should close the modal
    */
    shouldCloseOnEscapePress: PropTypes.bool,
    /** The header title */
    title: PropTypes.string,
    /**
      Number representing where in the stack of modals, this modal sits
    */
    stackIndex: PropTypes.number,
  }
  static defaultProps = {
    autoFocus: false,
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    stackIndex: 0,
    width: WIDTH_ENUM.defaultValue,
  }
  static contextTypes = {
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry),
  }

  state = getInitialState();

  getDialogNode = (dialogNode) => {
    if (dialogNode) {
      this.setState(state => !state.dialogNode && ({ dialogNode }));
    }
  }

  handleOverlayClick = () => {
    if (this.props.shouldCloseOnOverlayClick) {
      this.props.onDialogDismissed();
    }
  }
  handleDialogClick = (event) => {
    event.stopPropagation();
  }

  render() {
    const {
      actions, appearance, autoFocus, children, header, height, footer, isOpen,
      onOpenComplete, onDialogDismissed, onStackChange, shouldCloseOnEscapePress,
      stackIndex, width, title,
    } = this.props;
    const { dialogNode } = this.state;
    const { gatewayRegistry } = this.context;

    const isBackground = stackIndex > 0;
    const GatewayOrPortal = gatewayRegistry ? Gateway : Portal;

    // If a custom width (number or percentage) is supplied, set inline style
    // otherwise allow styled component to consume as named prop
    const namedWidth = WIDTH_ENUM.values.includes(width) ? width : null;
    const dialogStyle = namedWidth ? null : { width };

    return (
      <GatewayOrPortal into="modal">
        <FillScreen in={isOpen}>
          <Overlay
            key="overlay"
            aria-hidden={isBackground}
            onClick={this.handleOverlayClick}
          />
          <DialogPositioner
            in={isOpen}
            height={height}
            width={namedWidth}
            onClick={this.handleOverlayClick}
          >
            <Dialog
              autoFocus={autoFocus}
              innerRef={this.getDialogNode}
              isBackground={isBackground}
              onClick={this.handleDialogClick}
              onEnterComplete={onOpenComplete}
              role="dialog"
              stackIndex={stackIndex}
              style={dialogStyle}
              tabIndex="-1"
            >
              <Content
                actions={actions}
                appearance={appearance}
                dialogNode={dialogNode}
                footer={footer}
                title={title}
                header={header}
                onClose={shouldCloseOnEscapePress && onDialogDismissed}
                onStackChange={onStackChange}
                stackIndex={stackIndex}
              >
                {children}
              </Content>
            </Dialog>
          </DialogPositioner>
        </FillScreen>
      </GatewayOrPortal>
    );
  }
}
