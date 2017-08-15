import React, { PureComponent } from 'react';
import { TooltipStateless as Tooltip } from '@atlaskit/tooltip';
import Button, { ButtonGroup } from '@atlaskit/button';

export default class StatelessExample extends PureComponent {
  state = { clickIsVisible: false, hoverIsVisible: false }

  toggleClickTooltip = () => this.setState(state => ({
    clickIsVisible: !state.clickIsVisible,
  }))
  toggleHoverTooltip = () => this.setState(state => ({
    hoverIsVisible: !state.hoverIsVisible,
  }))

  render() {
    const { clickIsVisible, hoverIsVisible } = this.state;

    return (
      <ButtonGroup>
        <Tooltip
          description="Toggle on Click"
          isVisible={clickIsVisible}
          position="right"
        >
          <Button onClick={this.toggleClickTooltip}>
            Click to Toggle
          </Button>
        </Tooltip>
        <Tooltip
          description="Toggle on Hover"
          isVisible={hoverIsVisible}
          onMouseOver={this.toggleHoverTooltip}
          onMouseOut={this.toggleHoverTooltip}
          position="right"
        >
          <Button>
            Hover to Toggle
          </Button>
        </Tooltip>
      </ButtonGroup>
    );
  }
}
