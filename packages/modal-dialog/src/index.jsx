import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!./style.less';
import Blanket from 'ak-blanket';

const WIDTH_ENUM = {
  values: ['small', 'medium', 'large', 'x-large'],
  defaultValue: 'medium',
};

/**
 * @description A modal dialog which blankets the page
 * @class ModalDialog
 * @example @js import ModalDialog from 'ak-modal-dialog';
 * ReactDOM.render(<ModalDialog />, container);
 */
export default class ModalDialog extends PureComponent {
  static propTypes = {
    /**
     * @description Whether the modal dialog is open/visible
     * @memberof ModalDialog
     * @instance
     * @type {Boolean}
     * @default false
     */
    isOpen: PropTypes.bool,
    /**
     * @description Elements to be placed at top of modal dialog
     * @memberof ModalDialog
     * @type {element}
     */
    header: PropTypes.node,
    /**
     * @description Content to be placed in the middle of the modal dialog
     * @memberof ModalDialog
     * @type {element}
     */
    children: PropTypes.node,
    /**
     * @description Elements to be placed at bottom of modal dialog
     * @memberof ModalDialog
     * @type {element}
     */
    footer: PropTypes.node,
    /**
     * @description The maximum width tier of the dialog
     * Allowed values are: 'small' (400px), 'medium' (600px), 'large' (800px), 'x-large' (968px),
     * or any integer value defining the pixel width (e.g. 300), or any string value defining the
     * pixel or percentage width including unit (e.g. 300px, 75%).
     * @memberof ModalDialog
     * @instance
     * @type {string}
     * @default default
     */
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.oneOf(WIDTH_ENUM.values),
    ]),
    /**
     * @description Handler function to be called when the blanket is clicked
     * @memberof ModalDialog
     * @instance
     * @type {function}
     */
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
    if (e.key === 'Escape') {
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
        >
          <div className={styles.headerFlex}>
            {header}
          </div>
          <div className={styles.contentFlex}>
            {children}
          </div>
          <div className={styles.footerFlex}>
            {footer}
          </div>
        </div>
      </div>
    );
  }
}
