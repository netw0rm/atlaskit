import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!./style.less';
import Blanket from './AkBlanketTmp';

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
     * @description Handler function to be called when the blanket is clicked
     * @memberof ModalDialog
     * @instance
     * @type {function}
     */
    onBlanketClicked: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
    onBlanketClicked: () => {},
  };

  render() {
    // don't render anything if open = false
    if (!this.props.isOpen) return null;

    const { onBlanketClicked, header, children, footer } = this.props;
    return (
      <div className={styles.modalWrapper}>
        <Blanket onBlanketClicked={onBlanketClicked} />
        <div className={styles.modalPositioner}>
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
