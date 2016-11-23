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
  static get propTypes() {
    return {
      /**
       * @description Whether the modal dialog is open/visible
       * @memberof ModalDialog
       * @instance
       * @type {Boolean}
       * @default false
       * @example @html <ak-modal-dialog open></ak-modal-dialog>
       */
      isOpen: PropTypes.bool,
      /**
       * @description header
       * @memberof ModalDialog
       * @type {element}
       */
      header: PropTypes.element,
      /**
       * @description children
       * @memberof ModalDialog
       * @type {element}
       */
      children: PropTypes.element,
      /**
       * @description footer
       * @memberof ModalDialog
       * @type {element}
       */
      footer: PropTypes.element,
      /**
       * @description Handler function to be called when the blanket is clicked
       * @memberof ModalDialog
       * @instance
       * @type {function}
       */
      onBlanketClicked: PropTypes.func,
    };
  }

  static defaultProps() {
    return {
      isOpen: false,
      onBlanketClicked: () => {},
    };
  }

  render() {
    const { isOpen, onBlanketClicked, header, children, footer } = this.props;

    // don't render anything if open = false
    if (!isOpen) return null;

    return (
      <div className={styles.blanketPositioner}>
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
