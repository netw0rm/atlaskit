import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!../less/FlagGroup.less';
import FlagAnimationWrapper from './FlagAnimationWrapper';

export default class FlagGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onDismissed: PropTypes.func,
  };

  static defaultProps = {
    onDismissed: () => {},
  }

  state = {
    isAnimatingOut: false,
  }

  onFlagDismissRequested = () => {
    this.setState({ isAnimatingOut: true });
  }

  onFlagDismissFinished = (dismissedFlagId) => {
    this.setState({ isAnimatingOut: false });
    this.props.onDismissed(dismissedFlagId);
  }

  render() {
    return (
      <section
        className={styles.root}
      >
        <h1 className={styles.assistive}>Flag notifications</h1>
        <div className={styles.groupInner}>
          {
            this.props.children.map((childFlag, flagIndex) => (
              <FlagAnimationWrapper
                flagId={childFlag.props.id}
                key={childFlag.props.id}
                isEntering={flagIndex === 0}
                isExiting={flagIndex === 0 && this.state.isAnimatingOut}
                isMovingToPrimary={flagIndex === 1 && this.state.isAnimatingOut}
                onAnimationFinished={this.onFlagDismissFinished}
              >
                {
                  React.cloneElement(childFlag, {
                    onDismissed: this.onFlagDismissRequested,
                    isDismissAllowed: flagIndex === 0,
                  })
                }
              </FlagAnimationWrapper>
            ))
          }
        </div>
      </section>
    );
  }
}
