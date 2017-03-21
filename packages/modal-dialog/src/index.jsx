import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!./style.less';
import Blanket from '@atlaskit/blanket';
import {
  ModalWrapper,
  ModalPositioner,
  Modal,
  HeaderWrapper,
  ContentWrapper,
  FooterWrapper,
} from './styled.jsx';

const WIDTH_ENUM = {
  values: ['small', 'medium', 'large', 'x-large'],
  defaultValue: 'medium',
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

  handleKeyDown = (e) => {
    const escapeKeyCode = 27;
    if (e.keyCode === escapeKeyCode) {
      this.props.onDialogDismissed(e);
    }
  }

  render() {
    // don't render anything if open = false
    if (!this.props.isOpen) return null;

    const { onDialogDismissed, header, children, footer, width } = this.props;

    return (
      <ModalWrapper>
        <Blanket isTinted onBlanketClicked={onDialogDismissed} />
        <ModalPositioner width={width}>
          <Modal>
            {
              header
                ? <div className={styles.headerFlex}>
                  {header}
                </div>
                : null
            }
            <div className={styles.contentFlex}>
              {children}
            </div>
            {
              footer
                ? <div className={styles.footerFlex}>
                  {footer}
                </div>
                : null
            }
          </Modal>
        </ModalPositioner>
      </ModalWrapper>
    );
  }
}
