import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!./style.less';
import Blanket from '@atlaskit/blanket';

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

  // Detects click directly on the full-height modal container, to make sure that clicks in that
  // blanket region trigger onDialogDismissed as expected.
  handlePositionerDirectClick = (e) => {
    const { target } = e;
    if (target && target.classList.contains(styles.modalPositioner)) {
      this.props.onDialogDismissed(e);
    }
  }

  render() {
    // don't render anything if open = false
    if (!this.props.isOpen) return null;

    const { onDialogDismissed, header, children, footer, width } = this.props;

    // If a custom width (number of percentage) is supplied, set inline style
    const customStyle = WIDTH_ENUM.values.indexOf(width) === -1 ? (
      { style: { width } }
    ) : {};

    const hasHeader = !!header;
    const hasFooter = !!footer;

    // disables the following eslint rule to allow onClick on .modalPositioner
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={styles.modalWrapper}>
        <Blanket isTinted onBlanketClicked={onDialogDismissed} />
        <div
          className={classNames([
            styles.modalPositioner,
            {
              [styles.small]: width === 'small',
              [styles.medium]: width === 'medium',
              [styles.large]: width === 'large',
              [styles.xLarge]: width === 'x-large',
            },
          ])}
          {...customStyle}
          onClick={this.handlePositionerDirectClick}
        >
          {
            header ? <div className={styles.headerFlex}>{header}</div> : null
          }
          <div
            className={classNames([
              styles.contentFlex,
              {
                [styles.withHeader]: hasHeader,
                [styles.withFooter]: hasFooter,
                [styles.withoutHeader]: !hasHeader,
                [styles.withoutFooter]: !hasFooter,
              },
            ])}
          >
            {children}
          </div>
          {
            footer ? <div className={styles.footerFlex}>{footer}</div> : null
          }
        </div>
      </div>
    );
  }
}
