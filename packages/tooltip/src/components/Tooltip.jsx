import React, { PureComponent, PropTypes } from 'react';
import StatelessTooltip from './StatelessTooltip';

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
      <StatelessTooltip
        description={description}
        isVisible={isVisible}
        onMouseOut={this.hideTooltip}
        onMouseOver={this.showTooltip}
        position={position}
      >
        {children}
      </StatelessTooltip>
    );
  }
}
