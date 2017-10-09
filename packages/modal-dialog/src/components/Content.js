// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tabbable from 'tabbable';
import rafSchedule from 'raf-schd';

import Footer from './Footer';
import Header from './Header';
import ScrollLock from './ScrollLock';

import type {
  AppearanceType,
  ChildrenType,
  ComponentType,
  ElementType,
  FunctionType,
  KeyboardOrMouseEvent,
} from '../types';
import * as focusScope from '../utils/focus-scope';
import * as focusStore from '../utils/focus-store';
import { Body, keylineHeight, Wrapper } from '../styled/Content';

function getInitialState() {
  return {
    showFooterKeyline: false,
    showHeaderKeyline: false,
    tabbableElements: [],
  };
}

type Props = {
  /**
    Buttons to render in the footer
  */
  actions?: Array<{
    onClick?: FunctionType,
    text?: string,
  }>,
  /**
    Appearance of the primary action. Also adds an icon to the heading, if provided.
  */
  appearance?: AppearanceType,
  /**
    Boolean OR Function indicating which element to focus when the component mounts
    TRUE will automatically find the first "tabbable" element within the modal
    Providing a function should return the element you want to focus
  */
  autoFocus?: boolean | FunctionType,
  /**
    Content of the modal
  */
  children?: ChildrenType,
  /**
    HTMLElement representing the dialog, used for focus scope bounds
  */
  dialogNode: ElementType,
  /**
    Component to render the header of the modal.
  */
  header?: ComponentType,
  /**
    Component to render the footer of the moda.l
  */
  footer?: ComponentType,
  /**
    Function that will be called to initiate the exit transition.
  */
  onClose: (KeyboardOrMouseEvent) => void,
  /**
    Function that will be called when the modal changes position in the stack.
  */
  onStackChange?: (number) => void,
  /**
    Boolean indicating if pressing the `esc` key should close the modal
  */
  shouldCloseOnEscapePress?: boolean,
  /**
    Boolean indicating content should be rendered on a transparent background.
  */
  isChromeless?: boolean,
  /**
    Number representing where in the stack of modals, this modal sits
  */
  stackIndex?: number,
  /**
    The modal title; rendered in the header.
  */
  heading?: string,
};

export default class Content extends Component {
  props: Props // eslint-disable-line react/sort-comp
  static defaultProps = {
    autoFocus: false,
    isChromeless: false,
    stackIndex: 0,
  }
  static contextTypes = {
    /** available when invoked within @atlaskit/layer-manager */
    appId: PropTypes.string,
  }

  constructor(props: Props, context: mixed) {
    super(props, context);
    this.determineKeylines = rafSchedule(this.determineKeylines);
  }

  state = getInitialState();

  componentDidMount() {
    this._isMounted = true;
    this._hideElement = document.getElementById(this.context.appId);

    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('keyup', this.handleKeyUp, false);

    window.addEventListener('resize', this.determineKeylines, false);
    this.scrollContainer.addEventListener('scroll', this.determineKeylines, false);
    this.determineKeylines();

    focusStore.storeFocus();
    this.initialiseFocus();

    if (this._hideElement) this._hideElement.setAttribute('aria-hidden', true);
  }
  componentWillReceiveProps(nextProps) {
    const { stackIndex } = this.props;

    // update focus scope and let consumer know when stack index has changed
    if (nextProps.stackIndex !== stackIndex) {
      this.handleStackChange(nextProps.stackIndex);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;

    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('keyup', this.handleKeyUp, false);

    window.removeEventListener('resize', this.determineKeylines, false);
    this.scrollContainer.removeEventListener('scroll', this.determineKeylines, false);

    if (this._hideElement) this._hideElement.removeAttribute('aria-hidden');

    focusScope.unscopeFocus();

    // wait one tick to restore focus; element may still be transitioning
    setTimeout(() => focusStore.restoreFocus());
  }

  setTabbableElements = (dialogNode) => {
    const tabbableElements = tabbable(dialogNode);

    if (tabbableElements.length) {
      this.setState({ tabbableElements });
    }
  }
  initialiseFocus() {
    const { autoFocus } = this.props;

    if (!this._isMounted) return;

    const { dialogNode } = this.props;
    const hasFocusFunc = typeof autoFocus === 'function';
    const focusFirstAvailable = autoFocus && !hasFocusFunc;

    this.setTabbableElements(dialogNode);

    focusScope.scopeFocus(dialogNode, focusFirstAvailable);

    if (hasFocusFunc) {
      const focusTarget = autoFocus();

      // DOCS: we've been given a focusTarget so assume it should work, and
      // if not we should warn the consumer
      if (!focusTarget || typeof focusTarget.focus !== 'function') {
        console.warn('Invalid `autoFocus` provided:', focusTarget); // eslint-disable-line no-console
        return;
      }

      focusTarget.focus();
    }
  }

  determineKeylines = () => {
    if (!this.scrollContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = this.scrollContainer;
    const scrollableDistance = scrollHeight - clientHeight;
    const showHeaderKeyline = scrollTop > keylineHeight;
    const showFooterKeyline = scrollTop <= (scrollableDistance - keylineHeight);

    this.setState({ showHeaderKeyline, showFooterKeyline });
  }
  getScrollContainer = (ref) => {
    if (!ref) return;
    this.scrollContainer = ref;
  }
  handleKeyUp = () => {
    this.escapeIsHeldDown = false;
  }
  handleKeyDown = (event) => {
    const { onClose, shouldCloseOnEscapePress, stackIndex } = this.props;

    // avoid consumers accidently closing multiple modals if they hold escape.
    if (this.escapeIsHeldDown) return;
    if (event.key === 'Escape') this.escapeIsHeldDown = true;

    // only the foremost modal should be interactive.
    if (!this._isMounted || stackIndex > 0) return;

    switch (event.key) {
      case 'Escape':
        if (shouldCloseOnEscapePress) onClose();
        break;
      case 'Tab':
        this.handleTabLoop(event);
        break;
      default:
    }
  }
  handleStackChange = (stackIndex) => {
    const { dialogNode, onStackChange } = this.props;
    const node = stackIndex === 0 ? null : dialogNode;

    focusScope.unscopeFocus(node);

    if (onStackChange) onStackChange(stackIndex);
  }
  handleTabLoop = (event) => {
    const { tabbableElements: nodes } = this.state;
    const { target, shiftKey } = event;

    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    if (target === last && !shiftKey) {
      first.focus();
      event.preventDefault();
    } else if (target === first && shiftKey) {
      last.focus();
      event.preventDefault();
    }
  }

  render() {
    const {
      actions, appearance, children, footer,
      header, heading, onClose, isChromeless,
    } = this.props;
    const { showFooterKeyline, showHeaderKeyline } = this.state;

    return (
      <Wrapper>
        {!isChromeless && <Header
          appearance={appearance}
          component={header}
          heading={heading}
          onClose={onClose}
          showKeyline={showHeaderKeyline}
        />}
        <Body
          innerRef={this.getScrollContainer}
          isChromeless={isChromeless}
        >
          {children}
        </Body>
        {!isChromeless && <Footer
          actions={actions}
          appearance={appearance}
          component={footer}
          onClose={onClose}
          showKeyline={showFooterKeyline}
        />}
        <ScrollLock />
      </Wrapper>
    );
  }
}
