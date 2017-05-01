import React, { PropTypes, PureComponent } from 'react';

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

  resizeToFillContainer = () => {
    this.setState({
      height: this.getNoScrollHeight(),
    });
  }

  itemsTheresSpaceFor = () => {
    const availableGridUnits = parseInt(this.state.height / 8, 10);
    const gridUnitsPerItem = 4.5;
    return parseInt(availableGridUnits / gridUnitsPerItem, 10);
  }

  render = () => {
    let { children } = this.props;
    if (Array.isArray(children)) {
      children = children
        .slice(
          0,
          Math.max(this.props.minItems, this.itemsTheresSpaceFor())
        );
    }
    return <div ref={(div) => { this.ref = div; }}>{children}</div>;
  }
}
