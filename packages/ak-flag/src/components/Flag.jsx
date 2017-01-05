import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/Flag.less';
import CancelIcon from 'ak-icon/glyph/cancel';

/**
 * @description Return React Flag component.
 * @class Flag
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class Flag extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    onDismissed: PropTypes.func,
    onAnimationFinished: PropTypes.func,
    isDismissAllowed: PropTypes.bool,
    isEntering: PropTypes.bool,
    isMovingToPrimary: PropTypes.bool,
    isExiting: PropTypes.bool,
  };

  static defaultProps = {
    onDismissed: () => {},
    onAnimationFinished: () => {},
    isDismissAllowed: false,
    isEntering: false,
    isMovingToPrimary: false,
    isExiting: false,
  }

  constructor() {
    super();
    this.state = {
      hasAnimatedIn: false,
    };
  }

  componentDidUpdate() {
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      hasAnimatedIn: true,
    });
  }

  flagDismissed = () => {
    this.props.onDismissed(this.props.id);
  }

  render() {
    return (
      <div
        role="alert"
        className={classNames({
          [styles.root]: true,
          [styles.entering]: (
            !this.state.hasAnimatedIn &&
            !this.props.isExiting &&
            this.props.isEntering
          ),
          [styles.movingToPrimary]: this.props.isMovingToPrimary,
          [styles.exiting]: this.props.isExiting,
        })}
        onAnimationEnd={() => {
          if (this.props.isExiting) {
            this.props.onAnimationFinished(this.props.id);
          }
        }}
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
