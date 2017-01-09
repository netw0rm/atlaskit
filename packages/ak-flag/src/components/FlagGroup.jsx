import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/FlagGroup.less';
import FlagAnimationWrapper from './FlagAnimationWrapper';

// eslint-disable-next-line react/prefer-stateless-function
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
        className={classNames([
          styles.root,
          {
            [styles.multipleFlags]: this.props.children.length > 1,
          },
        ])}
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
