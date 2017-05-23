import * as React from 'react';
import AkSpinner from '@atlaskit/spinner';
import { CrossIcon } from '@atlaskit/icon';

const DEFAULT_DELAY = 500;

export interface Props {
  shouldSpin: boolean;
  delay?: number;
}

export interface State {
  isSpinning: boolean;
  isUnderMouse: boolean;
}

export class SpinningClearIcon extends React.PureComponent<Props, State> {
  private delayTimeoutId?: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      isSpinning: props.shouldSpin || false,
      isUnderMouse: false,
    };
  }

  componentDidMount() {
    this.handleDelayedSpinner();
  }

  componentDidUpdate() {
    this.handleDelayedSpinner();
  }

  componentWillUnmount() {
    this.clearDelayedSpinner();
  }

  private setupDelayedSpinner() {
    const delay = this.props.delay || DEFAULT_DELAY;

    this.delayTimeoutId = setTimeout(() => {
      this.setState({ isSpinning: true });
    }, delay);
  }

  private clearDelayedSpinner() {
    if (typeof this.delayTimeoutId !== 'undefined') {
      clearTimeout(this.delayTimeoutId);
      this.delayTimeoutId = undefined;
    }
  }

  private handleDelayedSpinner() {
    if (!this.state.isSpinning && this.props.shouldSpin) {
      this.setupDelayedSpinner();
    } else if (!this.props.shouldSpin) {
      this.clearDelayedSpinner();
      this.setState({ isSpinning: false });
    }
  }

  private handleMouseEnter = () => {
    this.setState({ isUnderMouse: true });
  }

  private handleMouseLeave = () => {
    this.setState({ isUnderMouse: false });
  }

  render() {
    return (
      <div
        style={{ display: 'inherit' }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {
          (this.state.isSpinning && !this.state.isUnderMouse)
            ? <AkSpinner />
            : <CrossIcon label="Clear search" />
        }
      </div>
    );
  }
}
