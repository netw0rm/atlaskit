import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/FlagGroup.less';
// import FlagAnimationWrapper from './FlagAnimationWrapper';

/**
 * @description Return React FlagGroup component.
 * @class FlagGroup
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class FlagGroup extends PureComponent {
  static propTypes = {
    /**
     * @description The Flag components to display inside the FlagGroup.
     * @memberof FlagGroup
     * @instance
     * @type {element}
     */
    children: PropTypes.node,
    /**
     * @description Function to be called when the flag is dismissed by the user
     * @memberof Flag
     * @instance
     * @type {function}
     */
    onDismissed: PropTypes.func,
  };

  static defaultProps = {
    onDismissed: () => {},
  }

  constructor() {
    super();
    this.childFlagHeights = {};
    this.state = {
      isAnimatingOut: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children.length < this.props.children.length) {
      // this.childFlagHeights = this.childFlagHeights.slice(1);
      this.setState({
        isAnimatingOut: false,
      });
    }
  }

  onFlagDismissed = () => {
    // need this to trigger render
    this.setState({ isAnimatingOut: true });
    setTimeout(() => {
      this.setState({ isAnimatingOut: false });
      this.props.onDismissed();
    }, 250);
  }

  render() {
    return (
      <div
        className={classNames([
          styles.root,
          {
            [styles.multipleFlags]: this.props.children.length > 1,
          },
        ])}
      >
        <div className={styles.groupInner}>
          {
            this.props.children.map((childFlag, flagIndex) => (
              React.cloneElement(childFlag, {
                onDismissed: this.onFlagDismissed,
                isDismissAllowed: flagIndex === 0,
                isEntering: flagIndex === 0,
                isExiting: flagIndex === 0 && this.state.isAnimatingOut,
              })
            ))
          }
        </div>
      </div>
    );
  }
}
