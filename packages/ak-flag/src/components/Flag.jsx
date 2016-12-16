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
    /**
     * @description A unique identifier used for rendering and onDismissed callbacks
     * @memberof Flag
     * @instance
     * @type {string}
     */
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * @description The icon displayed in the top-left of the flag.
     * @memberof Flag
     * @instance
     * @type {element}
     */
    icon: PropTypes.element.isRequired,
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
    description: PropTypes.string,
    /**
     * @description Function to be called when the flag is dismissed by the user
     * @memberof Flag
     * @instance
     * @type {function}
     */
    onDismissed: PropTypes.func,
    isDismissAllowed: PropTypes.bool,
    isEntering: PropTypes.bool,
    isExiting: PropTypes.bool,
  };

  static defaultProps = {
    onDismissed: () => {},
    isDismissAllowed: false,
    isEntering: false,
    isExiting: false,
  }

  constructor() {
    super();
    this.state = {
      hasAnimatedIn: false,
    };
  }

  componentDidUpdate() {
    // eslint-disable-next-line
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
        className={classNames({
          [styles.root]: true,
          [styles.entering]: (
            !this.state.hasAnimatedIn &&
            !this.props.isExiting &&
            this.props.isEntering
          ),
          [styles.exiting]: this.props.isExiting,
        })}
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
                  <CancelIcon label="Close flag" />
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
