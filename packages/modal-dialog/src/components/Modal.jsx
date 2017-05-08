import React, { PropTypes, PureComponent } from 'react';
import Blanket from '@atlaskit/blanket';

import ModalWrapper from '../styled/ModalWrapper';
import ModalPositioner from '../styled/ModalPositioner';
import ModalContainer from '../styled/ModalContainer';
import HeaderFooterWrapper from '../styled/HeaderFooterWrapper';
import ContentContainer from '../styled/ContentContainer';
import KeylineMask from '../styled/KeylineMask';

import { WIDTH_ENUM } from '../shared-variables';

export default class ModalDialog extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    header: PropTypes.node,
    children: PropTypes.node,
    footer: PropTypes.node,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.oneOf(WIDTH_ENUM.values),
    ]),
    onDialogDismissed: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
    onDialogDismissed: () => {},
    width: WIDTH_ENUM.defaultValue,
  };

  state = {
    isAnimating: false,
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  // when the isOpen prop is changed, ModalPositioner will detect the change and trigger an
  // animation immediately, so we set isAnimating in state here.
  componentWillReceiveProps = (nextProps) => {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isAnimating: true });
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // If a custom width (number of percentage) is supplied, set inline style
  getCustomWidth = () => (
    WIDTH_ENUM.values.indexOf(this.props.width) === -1 ? (
      { style: { width: this.props.width } }
    ) : {}
  )

  // Helper function to guard the onDialogDismissed prop function. Saved doing the same isOpen
  // check in multiple places.
  dismissModal = (e) => {
    if (this.props.isOpen) {
      this.props.onDialogDismissed(e);
    }
  }

  // Once the ModalPositioner animation finishes, set isAnimating back to false.
  handleAnimationEnd = () => {
    this.setState({ isAnimating: false });
  }

  handleKeyDown = (e) => {
    const escapeKeyCode = 27;
    if (e.keyCode === escapeKeyCode) {
      this.dismissModal(e);
    }
  }

  // Detects click directly on the full-height modal container, to make sure that clicks in that
  // blanket region trigger onDialogDismissed as expected.
  handlePositionerDirectClick = (e) => {
    const { target } = e;
    if (target && target === this.modalPositionerRef) {
      this.dismissModal(e);
    }
  }

  render() {
    const { header, isOpen, children, footer, width } = this.props;

    const hasHeader = !!header;
    const hasFooter = !!footer;

    const OptionalHeader = () => (
      hasHeader ? (
        <HeaderFooterWrapper headerOrFooter="header">{header}</HeaderFooterWrapper>
      ) : null
    );

    const OptionalFooter = () => (
      hasFooter ? (
        <HeaderFooterWrapper headerOrFooter="footer">{footer}</HeaderFooterWrapper>
      ) : null
    );

    const HeaderKeylineMask = () => (
      hasHeader ? (
        <KeylineMask headerOrFooter="header" />
      ) : null
    );

    const FooterKeylineMask = () => (
      hasFooter ? (
        <KeylineMask headerOrFooter="footer" />
      ) : null
    );

    return (
      <ModalWrapper isOpen={isOpen}>
        <Blanket canClickThrough={!isOpen} isTinted={isOpen} onBlanketClicked={this.dismissModal} />
        {
          this.state.isAnimating || isOpen ? (
            <ModalPositioner
              innerRef={(ref) => { this.modalPositionerRef = ref; }}
              isOpen={isOpen}
              width={width}
              {...this.getCustomWidth()}
              onAnimationEnd={this.handleAnimationEnd}
              onClick={this.handlePositionerDirectClick}
            >
              <ModalContainer>
                <OptionalHeader />
                <ContentContainer hasHeader={hasHeader} hasFooter={hasFooter}>
                  <HeaderKeylineMask />
                  {children}
                  <FooterKeylineMask />
                </ContentContainer>
                <OptionalFooter />
              </ModalContainer>
            </ModalPositioner>
          ) : null
        }
      </ModalWrapper>
    );
  }
}
