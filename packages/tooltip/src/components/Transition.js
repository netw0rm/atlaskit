import React, { PureComponent } from 'react';
import { withRenderTarget } from '@atlaskit/layer-manager';
import { Tooltip } from '../styled/Tooltip';
import { Slide } from './Animation';
import type { PlacementType } from '../types';

type Props = {|
  children: string,
  immediatelyHide: boolean,
  immediatelyShow: boolean,
  placement: PlacementType,
  // eslint-disable-next-line react/no-unused-prop-types
  position: { left: number, top: number },
|};

class Tip extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  render() {
    // NOTE: `in` is NOT public API
    const {
      in: transitionIn, // eslint-disable-line react/prop-types
      children, immediatelyHide, immediatelyShow, placement, position,
    } = this.props;

    return (
      <Slide
        component={Tooltip}
        immediatelyHide={immediatelyHide}
        immediatelyShow={immediatelyShow}
        in={transitionIn}
        placement={placement}
        style={position}
      >
        {children}
      </Slide>
    );
  }
}

export default withRenderTarget({
  target: 'tooltip',
  wrapWithTransitionGroup: true,
}, Tip);
