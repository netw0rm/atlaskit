import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipStateless from './TooltipStateless';

export default class Tooltip extends PureComponent {
  static propTypes = {
    /** The content the tooltip will be displayed around. */
    children: PropTypes.node,
    /** The text to be displayed in the tooltip. */
    description: PropTypes.string,
    /** Where the tooltip should appear relative to its children. */
    position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
    /**
      Component to be rendered around the child. Can be used to adjust the size
      and shape of the child.
    */
    target: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
  }

  static defaultProps = { position: 'bottom' }

  state = { isVisible: false }

  hideTooltip = () => this.setState({ isVisible: false });
  showTooltip = () => this.setState({ isVisible: true });

  render() {
    const { children, description, position, target } = this.props;
    const { isVisible } = this.state;

    return (
      <TooltipStateless
        description={description}
        isVisible={isVisible}
        onMouseLeave={this.hideTooltip}
        onMouseEnter={this.showTooltip}
        position={position}
        target={target}
      >
        {children}
      </TooltipStateless>
    );
  }
}
