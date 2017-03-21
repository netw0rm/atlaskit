import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!./style.less';
import Blanket from '@atlaskit/blanket';
import {
  ModalWrapper,
  Modal,
  HeaderWrapper,
  ContentWrapper,
  FooterWrapper,
} from './styled';

const WIDTH_ENUM = {
  values: ['small', 'medium', 'large', 'x-large'],
  defaultValue: 'medium',
};

const PADDING_ENUM = {
  values: ['none', 'default'],
  defaultValue: 'default',
};

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
    padding: PropTypes.oneOf(PADDING_ENUM.values),
    onDialogDismissed: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
    onDialogDismissed: () => {},
    width: WIDTH_ENUM.defaultValue,
    padding: PADDING_ENUM.defaultValue,
  };

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const escapeKeyCode = 27;
    if (e.keyCode === escapeKeyCode) {
      this.props.onDialogDismissed(e);
    }
  }

  render() {
    // don't render anything if open = false
    if (!this.props.isOpen) return null;

    const { onDialogDismissed, header, children, footer, width, padding } = this.props;

    return (
      <div>
        <Blanket isTinted onBlanketClicked={onDialogDismissed} />
        <ModalWrapper>
          <Modal width={width} padding={padding}>
            { header ? <HeaderWrapper padding={padding}>{header}</HeaderWrapper> : null }
            <ContentWrapper>
              {children}
            </ContentWrapper>
            { footer ? <FooterWrapper padding={padding}>{footer}</FooterWrapper> : null }
          </Modal>
        </ModalWrapper>
      </div>
    );
  }
}
