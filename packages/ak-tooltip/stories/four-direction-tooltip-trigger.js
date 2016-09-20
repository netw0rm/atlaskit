import reactify from 'akutil-react';
import TooltipTriggerWC from '../src/index.tooltip-trigger';
import React, { Component } from 'react';

const TooltipTrigger = reactify(TooltipTriggerWC);

const buttonStyles = {
  backgroundColor: 'orange',
  padding: '5px',
};

class FourDirectionTooltipTrigger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: props.direction || 'bottom',
    };

    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const directions = ['top', 'right', 'bottom', 'left'];
    const curIdx = directions.indexOf(this.state.direction);
    const newIdx = (curIdx + 1) % directions.length;
    this.setState({ direction: directions[newIdx] });
  }

  render() {
    const description = this.props.description || 'This is a tooltip!';
    return (
      <div>
        <TooltipTrigger position={this.state.direction} description={description}>
          <span
            style={buttonStyles}
            aria-describedby="ak-tooltip"
            onClick={this.handleClick}
          >
            Click me ({this.state.direction})
          </span>
        </TooltipTrigger>
      </div>
    );
  }
}

FourDirectionTooltipTrigger.propTypes = {
  direction: React.PropTypes.string,
  description: React.PropTypes.string,
};

export default FourDirectionTooltipTrigger;
