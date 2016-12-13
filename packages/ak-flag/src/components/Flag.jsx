import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!../less/Flag.less';
import { CancelIcon } from 'ak-icon';

/**
 * @description Return React Flag component.
 * @class Flag
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class Flag extends PureComponent {
  static propTypes = {
    /**
     * @description The icon displayed in the top-left of the flag.
     * @memberof Flag
     * @instance
     * @type {element}
     */
    icon: PropTypes.element,
    /**
     * @description The bold text shown at the top of the flag.
     * @memberof Flag
     * @instance
     * @type {string}
     */
    title: PropTypes.string.isRequired,
    /**
     * @description The secondary text shown below the flag title.
     * @memberof Flag
     * @instance
     * @type {string}
     */
    description: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.titleRow}>
          <div className={styles.primaryIcon}>
            {this.props.icon}
          </div>
          <span className={styles.title}>
            {this.props.title}
          </span>
          <div className={styles.cancelIcon}>
            <CancelIcon label="Close flag" />
          </div>
        </div>
        <div className={styles.description}>
          {this.props.description}
        </div>
      </div>
    );
  }
}
