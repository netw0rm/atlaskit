import React, { PureComponent, PropTypes } from 'react';
import StatelessTooltip from './Tooltip';

/* eslint-disable react/no-unused-prop-types */
/* export the smart (useful) component by default. Class name doesnt matter as user's will name it
   at import time */
export default class Tooltip extends PureComponent {
  static propTypes = {
    description: PropTypes.string,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    children: PropTypes.node,
  }

  static defaultProps = {
    description: '',
    position: 'bottom',
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  hideTooltip = () => {
    this.setState({ visible: false });
  }

  showTooltip = () => {
    this.setState({ visible: true });
  }

  render() {
    const props = this.props;

    return (<StatelessTooltip
      visible={this.state.visible}
      description={props.description}
      position={props.position}
      onMouseOver={this.showTooltip}
      onMouseOut={this.hideTooltip}
    >
      {props.children}
    </StatelessTooltip>);
  }
}

export { StatelessTooltip };

/* eslint-enable react/no-unused-prop-types */

