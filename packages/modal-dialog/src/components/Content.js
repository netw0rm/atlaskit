// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rafSchedule from 'raf-schd';
import { ScrollLock } from '@atlaskit/layer-manager';

import Footer from './Footer';
import Header from './Header';

import type {
  AppearanceType,
  ChildrenType,
  ComponentType,
  FunctionType,
  KeyboardOrMouseEvent,
} from '../types';
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
    Content of the modal
  */
  children?: ChildrenType,
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
    Whether or not the body content should scroll
  */
  shouldScroll?: boolean,
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

    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('keyup', this.handleKeyUp, false);

    if (this.scrollContainer) {
      window.addEventListener('resize', this.determineKeylines, false);
      this.scrollContainer.addEventListener('scroll', this.determineKeylines, false);
      this.determineKeylines();
    }
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

    if (this.scrollContainer) {
      window.removeEventListener('resize', this.determineKeylines, false);
      this.scrollContainer.removeEventListener('scroll', this.determineKeylines, false);
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
      default:
    }
  }
  handleStackChange = (stackIndex) => {
    const { onStackChange } = this.props;

    if (onStackChange) onStackChange(stackIndex);
  }

  render() {
    const {
      actions, appearance, children, footer, header, heading, onClose,
      isChromeless, shouldScroll,
    } = this.props;
    const { showFooterKeyline, showHeaderKeyline } = this.state;

    if (isChromeless) {
      return (
        <Wrapper>
          {children}
          <ScrollLock />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <Header
          appearance={appearance}
          component={header}
          heading={heading}
          onClose={onClose}
          showKeyline={showHeaderKeyline}
        />
        <Body innerRef={this.getScrollContainer} shouldScroll={shouldScroll}>
          {children}
        </Body>
        <Footer
          actions={actions}
          appearance={appearance}
          component={footer}
          onClose={onClose}
          showKeyline={showFooterKeyline}
        />
        <ScrollLock />
      </Wrapper>
    );
  }
}
