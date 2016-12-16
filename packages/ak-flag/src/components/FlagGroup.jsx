import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/FlagGroup.less';
import FlagAnimationWrapper from './FlagAnimationWrapper';

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
      detectedCount: 0,
      isAnimatingOut: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children.length < this.props.children.length) {
      // this.childFlagHeights = this.childFlagHeights.slice(1);
      this.setState({
        isAnimatingOut: false,
        detectedCount: this.state.detectedCount - 1,
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

  topOffsetHeights = () => {
    if (this.props.children.length > 0) {
      const effectiveFirstFlagIndex = this.state.isAnimatingOut ? 1 : 0;
      const firstOffset = 0;
      const offsetHeights = [];
      this.props.children.reduce((accumulator, flag, i) => {
        const loopOffset = accumulator + (
          i <= effectiveFirstFlagIndex ? 0 : this.detectedHeightForFlagId(flag.props.id)
        );
        offsetHeights.push(loopOffset);
        return loopOffset;
      }, firstOffset);
      return offsetHeights;
    }
    return [];
  }

  detectedHeightForFlagId = (wantedId) => {
    const { childFlagHeights } = this;
    if (wantedId in childFlagHeights) {
      return childFlagHeights[wantedId];
    }
    return 0;
  }

  heightDetected = (childFlagId, height) => {
    this.childFlagHeights[childFlagId] = height;

    // need this to trigger render
    this.setState({ detectedCount: this.state.detectedCount + 1 });
  }

  render() {
    const topOffsetHeights = this.topOffsetHeights();

    const effectiveFlagCount = this.props.children.length - (this.state.isAnimatingOut ? 1 : 0);

    return (
      <div
        className={classNames([
          styles.root,
          {
            [styles.multipleFlags]: effectiveFlagCount > 1,
          },
        ])}
      >
        {
          this.props.children.map((childFlag, flagIndex) => (
            <FlagAnimationWrapper
              id={childFlag.props.id}
              key={childFlag.props.id}
              onHeightDetected={this.heightDetected}
              isVisible={
                flagIndex === 0 ? (
                  !this.state.isAnimatingOut &&
                  this.detectedHeightForFlagId(childFlag.props.id) !== 0
                ) : true
              }
              verticalOffset={topOffsetHeights[flagIndex]}
            >
              {
                React.cloneElement(childFlag, {
                  onDismissed: this.onFlagDismissed,
                  isDismissAllowed: flagIndex === 0,
                })
              }
            </FlagAnimationWrapper>
          ))
        }
      </div>
    );
  }
}
