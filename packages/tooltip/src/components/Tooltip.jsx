import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipStateless from './TooltipStateless';

export default class Tooltip extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  }

  static defaultProps = { position: 'bottom' }

  state = { isVisible: false }

  hideTooltip = () => this.setState({ isVisible: false });
  showTooltip = () => this.setState({ isVisible: true });

  render() {
    const { children, description, position } = this.props;
    const { isVisible } = this.state;

    return (
      <TooltipStateless
        description={description}
        isVisible={isVisible}
        onMouseLeave={this.hideTooltip}
        onMouseEnter={this.showTooltip}
        position={position}
      >
        {children}
      </TooltipStateless>
    );
  }
}
