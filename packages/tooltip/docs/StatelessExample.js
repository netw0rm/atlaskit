import React, { PureComponent } from 'react';
import { TooltipStateless as Tooltip } from '@atlaskit/tooltip';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';

export default class FourWayTooltip extends PureComponent {
  state = { tooltipIsVisible: false }

  toggleTooltip = () => this.setState(state => ({ tooltipIsVisible: !state.tooltipIsVisible }))

  render() {
    const { tooltipIsVisible } = this.state;

    console.log('tooltipIsVisible', tooltipIsVisible);

    return (
      <ButtonGroup>
        <Tooltip
          description="Toggling Tooltip on click"
          onMouseOut={() => console.log('Mouse left button')}
          onMouseOver={() => console.log('Mouse entered button')}
          position="right"
        >
          <Button>I have mouseover handlers</Button>
        </Tooltip>
        <Tooltip
          description="Toggling Tooltip on click"
          isVisible={tooltipIsVisible}
          position="right"
        >
          <Button onClick={this.toggleTooltip}>Click to toggle tooltip</Button>
        </Tooltip>
      </ButtonGroup>
    );
  }
}
