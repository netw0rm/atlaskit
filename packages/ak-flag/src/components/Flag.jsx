import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!../less/Flag.less';
import CancelIcon from 'ak-icon/glyph/cancel';

// eslint-disable-next-line react/prefer-stateless-function
export default class Flag extends PureComponent {
  static propTypes = {
    description: PropTypes.string,
    icon: PropTypes.element.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isDismissAllowed: PropTypes.bool,
    onDismissed: PropTypes.func,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    isDismissAllowed: false,
    onDismissed: () => {},
  }

  flagDismissed = () => {
    this.props.onDismissed(this.props.id);
  }

  render() {
    return (
      <div
        className={styles.root}
        role="alert"
        tabIndex="0"
      >
        <div className={styles.primaryIcon}>
          {this.props.icon}
        </div>
        <div className={styles.textContent}>
          <div className={styles.titleAndDismiss}>
            <span className={styles.title}>
              {this.props.title}
            </span>
            {
              this.props.isDismissAllowed ? (
                <button
                  className={styles.dismissIconButton}
                  onClick={this.flagDismissed}
                >
                  <CancelIcon label="Dismiss flag" />
                </button>
              ) : null
            }
          </div>
          {
            this.props.description ? (
              <div className={styles.description}>
                {this.props.description}
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}
