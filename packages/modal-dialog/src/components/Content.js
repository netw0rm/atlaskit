// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tabbable from 'tabbable';
import Button, { ButtonGroup } from '@atlaskit/button';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import * as focusScope from '../utils/focus-scope';
import * as focusStore from '../utils/focus-store';
import {
  Body,
  Footer as StyledFooter,
  Header as StyledHeader,
  KeylineMask,
  TabLoopTerminal,
  Title,
  TitleIcon,
  Wrapper,
} from '../styled/Content';

function getInitialState() {
  return {
    tabbableElements: [],
    tabDirection: null,
  };
}

const icon = {
  error: ErrorIcon,
  warning: WarningIcon,
};
const Icon = ({ appearance }) => {
  if (!appearance) return null;

  const IconType = icon[appearance];

  return (
    <TitleIcon appearance={appearance}>
      <IconType />
    </TitleIcon>
  );
};

const Shim = props => <span {...props} />;

export default class Content extends Component {
  static propTypes = {
    /** Buttons to render in the footer */
    actions: PropTypes.arrayOf([
      PropTypes.shape({
        onClick: PropTypes.function,
        text: PropTypes.string,
      }),
    ]),
    /** Appearance of the content */
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
    /** Content of the modal */
    children: PropTypes.node,
    /** HTMLElement representing the dialog, used for focus scope bounds */
    dialogNode: PropTypes.node.isRequired,
    /** Component to render in the header of the modal. */
    header: PropTypes.function,
    /** Component to render in the footer of the moda.l */
    footer: PropTypes.function,
    /** Function that will be run when the modal changes position in the stack */
    onStackChange: PropTypes.func,
    /** Function to close the dialog */
    onClose: PropTypes.func.isRequired,
    /** Number representing where in the stack of modals, this modal sits */
    stackIndex: PropTypes.number,
    /** The header title */
    title: PropTypes.string,
  }
  static defaultProps = {
    autoFocus: false,
    stackIndex: 0,
  }

  state = getInitialState();

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    focusStore.storeFocus();
    this.initialiseFocus();
    this._isMounted = true;
  }
  componentWillReceiveProps(nextProps) {
    const { stackIndex } = this.props;

    // stack index has changed
    if (nextProps.stackIndex !== stackIndex) {
      this.handleStackChange(nextProps.stackIndex);
    }
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    this._isMounted = false;
    focusScope.unscopeFocus();
    setTimeout(() => focusStore.restoreFocus());
  }

  setTabbableElements = () => {
    const { dialogNode } = this.props;
    const tabbableElements = tabbable(dialogNode);

    if (!this.state.tabbableElements) {
      this.setState({ tabbableElements });
    }
  }
  initialiseFocus() {
    const { autoFocus } = this.props;
    const hasFocusFunc = typeof autoFocus === 'function';

    // DOCS: explain deferral of focus to allow for refs to be resolved
    setTimeout(() => {
      const { dialogNode } = this.props;

      if (!this._isMounted) return;

      this.setTabbableElements();

      focusScope.scopeFocus(dialogNode, autoFocus && !hasFocusFunc);

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
    });
  }

  handleTabLoopEnd = () => {
    const { tabbableElements } = this.state;
    tabbableElements[0].focus();
  }
  handleTabLoopStart = () => {
    const { tabbableElements } = this.state;

    // handle case where user can tab from the dialog to the first element
    const targetIdx = this.state.tabDirection === 'prev'
      ? tabbableElements.length - 1
      : 0;

    const tabTarget = tabbableElements[targetIdx];

    tabTarget.focus();
  }
  handleKeyDown = (event) => {
    if (!this._isMounted) return;

    if (event.key === 'Escape' && this.props.onClose) {
      this.props.onClose();
    } else if (event.key === 'Tab') {
      const tabDirection = event.shiftKey ? 'prev' : 'next';
      const tabDirectionHasChanged = tabDirection !== this.state.tabDirection;

      if (tabDirectionHasChanged) this.setState({ tabDirection });
    }
  }
  handleStackChange = (stackIndex) => {
    const { dialogNode, onStackChange } = this.props;
    const node = stackIndex === 0 ? null : dialogNode;

    focusScope.unscopeFocus(node);
    if (onStackChange) onStackChange(stackIndex);
  }

  renderHeader = () => {
    const { appearance, header: ConsumerHeader, title } = this.props;
    const warning = 'You can provide `header` OR `title`, not both.';

    if (!ConsumerHeader && !title) return null;
    if (ConsumerHeader && title) return console.warn(warning); // eslint-disable-line no-console
    if (ConsumerHeader) return ConsumerHeader;

    return (
      <StyledHeader>
        <Title>
          <Icon appearance={appearance} />
          {title}
        </Title>
      </StyledHeader>
    );
  }
  renderFooter = () => {
    const { appearance, footer: ConsumerFooter, actions } = this.props;
    const warning = 'You can provide `footer` OR `actions`, not both.';

    if (!ConsumerFooter && !actions) return null;
    if (ConsumerFooter && actions) return console.warn(warning); // eslint-disable-line no-console
    if (ConsumerFooter) return ConsumerFooter;

    return (
      <StyledFooter>
        <Shim />
        <ButtonGroup>
          {actions.map((action, idx) => {
            const variant = idx ? 'default' : (appearance || 'primary');

            return (
              <Button appearance={variant} key={idx} onClick={action.onClick}>
                {action.text}
              </Button>
            );
          })}
        </ButtonGroup>
      </StyledFooter>
    );
  }

  render() {
    const { actions, children, header, footer, title } = this.props;
    const { tabbableElements, tabDirection } = this.state;

    const canTab = !!tabbableElements.length;
    const tabStart = canTab && tabDirection && tabDirection === 'prev'
      ? <TabLoopTerminal onFocus={this.handleTabLoopStart} />
      : null;
    const tabEnd = canTab && tabDirection && tabDirection === 'next'
      ? <TabLoopTerminal onFocus={this.handleTabLoopEnd} />
      : null;

    const hasHeader = Boolean(header || title);
    const hasFooter = Boolean(footer || actions);

    const keylineHeader = hasHeader && <KeylineMask headerOrFooter="header" />;
    const keylineFooter = hasFooter && <KeylineMask headerOrFooter="footer" />;

    const Header = this.renderHeader;
    const Footer = this.renderFooter;

    return (
      <Wrapper>
        {tabStart}
        <Header />
        <Body hasHeader={hasHeader} hasFooter={hasFooter}>
          {keylineHeader}
          {children}
          {keylineFooter}
        </Body>
        <Footer />
        {tabEnd}
      </Wrapper>
    );
  }
}
