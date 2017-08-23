// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tabbable from 'tabbable';
import Button from '@atlaskit/button';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import { ChildrenType, ElementType, FunctionType } from '../types';
import * as focusScope from '../utils/focus-scope';
import * as focusStore from '../utils/focus-store';
import {
  Actions,
  ActionItem,
  Body,
  BodyInner,
  Footer as StyledFooter,
  Header as StyledHeader,
  KeylineMask,
  Title,
  TitleIcon,
  Wrapper,
} from '../styled/Content';

function getInitialState() {
  return {
    tabbableElements: [],
  };
}

const icon = {
  error: ErrorIcon,
  warning: WarningIcon,
};
const Icon = ({ appearance }: { appearance: 'error' | 'warning' }) => {
  if (!appearance) return null;

  const IconType = icon[appearance];

  return (
    <TitleIcon appearance={appearance}>
      <IconType />
    </TitleIcon>
  );
};

const JustifyShim = props => <span {...props} />;
type Props = {
  /** Buttons to render in the footer */
  actions?: Array<{
    onClick?: FunctionType,
    text?: string,
  }>,
  /** Appearance of the primary button. Also adds an icon to the title, if provided. */
  appearance?: 'danger' | 'warning',
  /**
    Boolean OR Function indicating which element to focus when the component mounts
    TRUE will automatically find the first "tabbable" element within the modal
    Providing a function should return the element you want to focus
  */
  autoFocus?: boolean | FunctionType,
  /** Content of the modal */
  children?: ChildrenType,
  /** HTMLElement representing the dialog, used for focus scope bounds */
  dialogNode: ElementType,
  /** Component to render in the header of the modal. */
  header?: FunctionType,
  /** Component to render in the footer of the moda.l */
  footer?: FunctionType,
  /** Function that will be run when the modal changes position in the stack */
  onStackChange?: FunctionType,
  /** Function to close the dialog */
  onClose: FunctionType,
  /** Number representing where in the stack of modals, this modal sits */
  stackIndex?: number,
  /** The header title */
  title?: string,
};

export default class Content extends Component {
  props: Props // eslint-disable-line react/sort-comp
  static defaultProps = {
    autoFocus: false,
    stackIndex: 0,
  }
  static contextTypes = {
    /** available when invoked within @atlaskit/layer-manager */
    appId: PropTypes.string,
  }

  state = getInitialState();

  componentDidMount() {
    this._isMounted = true;
    this._hideElement = document.getElementById(this.context.appId);

    document.addEventListener('keydown', this.handleKeyDown, false);

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

    if (this._hideElement) this._hideElement.removeAttribute('aria-hidden');

    focusScope.unscopeFocus();
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

    // DOCS: explain deferral of focus to allow for refs to be resolved
    setTimeout(() => {
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
    });
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

  handleKeyDown = (event) => {
    if (!this._isMounted) return;

    if (event.key === 'Escape' && this.props.onClose) {
      this.props.onClose();
    } else if (event.key === 'Tab') {
      this.handleTabLoop(event);
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
        <JustifyShim />
        <Actions>
          {actions.map(({ text, ...rest }, idx) => {
            const variant = idx ? 'default' : (appearance || 'primary');
            return (
              <ActionItem key={idx}>
                <Button appearance={variant} autoFocus={!idx} {...rest}>
                  {text}
                </Button>
              </ActionItem>
            );
          })}
        </Actions>
      </StyledFooter>
    );
  }

  render() {
    const { actions, children, header, footer, title } = this.props;

    const hasHeader = Boolean(header || title);
    const hasFooter = Boolean(footer || actions);

    const Header = this.renderHeader;
    const Footer = this.renderFooter;

    return (
      <Wrapper>
        <Header />
        <Body hasHeader={hasHeader} hasFooter={hasFooter}>
          {hasHeader && <KeylineMask position="header" />}
          <BodyInner>
            {children}
          </BodyInner>
          {hasFooter && <KeylineMask position="footer" />}
        </Body>
        <Footer />
      </Wrapper>
    );
  }
}
