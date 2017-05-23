import * as React from 'react';

import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const GRID_UNITS_PER_ITEM = 5;

export interface Props {
  minItems: number;
}

export interface State {
  height: number;
}

/**
 * Omit items that overflow (vertically) from the container.
 *
 * This is different from CSS's overflow:hidden, in that the *entire* item is omitted, rather than
 * being partially clipped.
 */
export class OmitOverflowItems extends React.PureComponent<Props, State> {
  private ref: HTMLDivElement;

  state: State = {
    height: 0
  };

  componentDidMount() {
    this.resizeToFillContainer();
    window.addEventListener('resize', this.resizeToFillContainer);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeToFillContainer);
  }

  private getNoScrollHeight = () => {
    const cmpntY = this.ref && this.ref.getBoundingClientRect().top;
    return window.innerHeight - cmpntY;
  }

  private getMaxItemsForHeight = () => {
    const availableGridUnits = Math.round(this.state.height / akGridSizeUnitless);
    return Math.round(availableGridUnits / GRID_UNITS_PER_ITEM);
  }

  private resizeToFillContainer = () => {
    this.setState({
      height: this.getNoScrollHeight(),
    });
  }

  render() {
    let { children } = this.props;
    if (Array.isArray(children)) {
      children = children
        .slice(
          0,
          Math.max(this.props.minItems, this.getMaxItemsForHeight())
        );
    }
    return <div ref={this.handleRef}>{children}</div>;
  }

  private handleRef = (div: HTMLDivElement) => {
    this.ref = div;
  }
}
