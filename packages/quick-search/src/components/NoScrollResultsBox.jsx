import React, { PropTypes, PureComponent } from 'react';

import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const GRID_UNITS_PER_ITEM = 4.5;
export default class NoScrollResultsBox extends PureComponent {
  static propTypes = {
    minItems: PropTypes.number,
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  }

  static defaultProps = {
    minItems: 3,
  }

  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    this.resizeToFillContainer();
    window.addEventListener('resize', this.resizeToFillContainer);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeToFillContainer);
  }

  getNoScrollHeight = () => {
    const cmpntY = this.ref && this.ref.getBoundingClientRect().top;
    return window.innerHeight - cmpntY;
  }

  getMaxItemsForHeight = () => {
    const availableGridUnits = parseInt(this.state.height / akGridSizeUnitless, 10);
    return parseInt(availableGridUnits / GRID_UNITS_PER_ITEM, 10);
  }

  resizeToFillContainer = () => {
    this.setState({
      height: this.getNoScrollHeight(),
    });
  }

  render = () => {
    let { children } = this.props;
    if (Array.isArray(children)) {
      children = children
        .slice(
          0,
          Math.max(this.props.minItems, this.getMaxItemsForHeight())
        );
    }
    return <div ref={(div) => { this.ref = div; }}>{children}</div>;
  }
}
