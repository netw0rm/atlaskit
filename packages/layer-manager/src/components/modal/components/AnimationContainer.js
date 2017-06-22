import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Dialog } from '../styled/Modal';

function getInitialState() {
  return {
    animationName: null,
    isBackground: false,
  };
}

export default class AnimationContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    dialogOnClick: PropTypes.func.isRequired,
    dialogRef: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    onOpenComplete: PropTypes.func,
    onStackChange: PropTypes.func,
    overlayOnClick: PropTypes.func.isRequired,
    stackIndex: PropTypes.number.isRequired,
  }
  static defaultProps = {
    stackIndex: 0,
  }

  state = getInitialState()
  componentWillReceiveProps(nextProps) {
    const { onStackChange, stackIndex } = this.props;

    // stack index has changed
    if (nextProps.stackIndex !== stackIndex) {
      if (onStackChange) onStackChange(nextProps.stackIndex);
    }
  }
  componentWillEnter(done) {
    this.setState({ animationName: 'enter' }, done);
  }
  componentDidEnter() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillLeave(done) {
    this.setState({
      animationEndCallback: done,
      animationName: 'leave',
    });
  }
  componentDidLeave() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleAnimationEnd = () => {
    const { onOpenComplete } = this.props;
    const { animationName, animationEndCallback } = this.state;

    if (animationName === 'enter' && onOpenComplete) onOpenComplete();
    if (animationEndCallback) animationEndCallback();

    this.setState(getInitialState);
  }
  handleKeyDown = (event) => {
    const { stackIndex, onKeyDown } = this.props;
    if (stackIndex === 0) onKeyDown(event);
  }
  render() {
    const { children, dialogRef, dialogOnClick, overlayOnClick, stackIndex } = this.props;
    const { animationName } = this.state;

    const isBackground = stackIndex > 0;

    return (
      <Overlay
        animation={animationName}
        aria-hidden={isBackground}
        onClick={overlayOnClick}
      >
        <Dialog
          animation={animationName}
          innerRef={dialogRef}
          isBackground={isBackground}
          stackIndex={stackIndex}
          onAnimationEnd={this.handleAnimationEnd}
          onClick={dialogOnClick}
          role="dialog"
          tabIndex="-1"
        >
          {children}
        </Dialog>
      </Overlay>
    );
  }
}
