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

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown);
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

  handleKeyDown = (e) => {
    const escapeKeyCode = 27;
    if (e.keyCode === escapeKeyCode) {
      this.props.onDialogDismissed(e);
    }
  }

  // Detects click directly on the full-height modal container, to make sure that clicks in that
  // blanket region trigger onDialogDismissed as expected.
  handlePositionerDirectClick = (e) => {
    const { target } = e;
    if (target && target === this.modalPositionerRef) {
      this.props.onDialogDismissed(e);
    }
  }

  render() {
    // don't render anything if isOpen = false
    if (!this.props.isOpen) return null;

    const { onDialogDismissed, header, children, footer, width } = this.props;

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
      <ModalWrapper>
        <Blanket isTinted onBlanketClicked={onDialogDismissed} />
        <ModalPositioner
          innerRef={(ref) => { this.modalPositionerRef = ref; }}
          width={width}
          {...this.getCustomWidth()}
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
      </ModalWrapper>
    );
  }
}
