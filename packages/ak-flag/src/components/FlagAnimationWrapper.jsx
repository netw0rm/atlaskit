import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!../less/FlagAnimationWrapper.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class FlagAnimationWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    /**
     * @description Internal function used by FlagGroup to coordinate height/placement of flags
     * @memberof Flag
     * @instance
     * @type {function}
     */
    onHeightDetected: PropTypes.func,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    verticalOffset: PropTypes.number,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    onHeightDetected: () => {},
    hasDetectedHeight: false,
    verticalOffset: 0,
  }

  // Called after first render, we detect height and pass back up to FlagGroup
  componentDidMount() {
    this.props.onHeightDetected(
      this.props.id,
      this.rootContainer.clientHeight
    );
  }

  render() {
    return (
      <div
        className={styles.root}
        style={{
          transform: `translate(${this.props.isVisible ? 0 : -600}px,${this.props.verticalOffset}px)`,
        }}
        ref={(rootContainer) => {
          this.rootContainer = rootContainer;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
